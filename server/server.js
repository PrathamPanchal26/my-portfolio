const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// ===== EMAIL TRANSPORTER =====
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send confirmation email to the sender
const sendConfirmationEmail = async (name, email, subject, message) => {
  try {
    await transporter.sendMail({
      from: `"Pratham's Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out! - Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Thank you, ${name}! 👋</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            I've received your message and will get back to you within 24 hours.
          </p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 10px 0 0 0;"><strong>Message:</strong> ${message}</p>
          </div>
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            Pratham
          </p>
        </div>
      `,
    });
    console.log("✅ Confirmation email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error.message);
    return false;
  }
};

// Function to send notification email to the portfolio owner
const sendNotificationEmail = async (name, email, subject, message) => {
  try {
    await transporter.sendMail({
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">📬 New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0 0 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0 0 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 10px 0 0 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });
    console.log("✅ Notification email sent to:", process.env.RECIPIENT_EMAIL);
    return true;
  } catch (error) {
    console.error("❌ Error sending notification email:", error.message);
    return false;
  }
};

// ===== MIDDLEWARE =====
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());

// ===== SQLITE CONNECTION =====
const dbPath = path.join(__dirname, "portfolio.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ SQLite connection error:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
    initDatabase();
  }
});

// Initialize database tables
const initDatabase = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      read INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error("❌ Error creating table:", err.message);
    } else {
      console.log("✅ SQLite database initialized");
    }
  });
};

// ===== ROUTES =====

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running 🚀" });
});

// Contact form endpoint - save to SQLite and send emails
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required.",
    });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address.",
    });
  }

  // Insert new contact into SQLite
  const stmt = db.prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
  stmt.run(name, email, subject, message, async function(err) {
    if (err) {
      console.error("❌ Error saving contact:", err.message);
      return res.status(500).json({
        success: false,
        error: "Failed to send message. Please try again later.",
      });
    }

    console.log(`📬 New contact form submission from ${name} (${email})`);

    // Send confirmation email to the sender
    await sendConfirmationEmail(name, email, subject, message);

    // Send notification email to the portfolio owner
    await sendNotificationEmail(name, email, subject, message);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you within 24 hours.",
    });
  });
  stmt.finalize();
});

// Get all contacts
app.get("/api/contacts", (req, res) => {
  db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching contacts:", err.message);
      return res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
    res.json({ success: true, contacts: rows });
  });
});

// Mark contact as read
app.patch("/api/contacts/:id/read", (req, res) => {
  db.run("UPDATE contacts SET read = 1 WHERE id = ?", [req.params.id], function(err) {
    if (err) {
      console.error("❌ Error updating contact:", err.message);
      return res.status(500).json({ success: false, error: "Failed to update contact" });
    }
    res.json({ success: true });
  });
});

// Delete a contact
app.delete("/api/contacts/:id", (req, res) => {
  db.run("DELETE FROM contacts WHERE id = ?", [req.params.id], function(err) {
    if (err) {
      console.error("❌ Error deleting contact:", err.message);
      return res.status(500).json({ success: false, error: "Failed to delete contact" });
    }
    res.json({ success: true });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
  console.log(`📬 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`📋 Contacts API: http://localhost:${PORT}/api/contacts`);
  console.log(`💾 Database: SQLite (${dbPath})`);
});
