const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// ===== EMAIL TRANSPORTER =====
const emailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

const INBOX_EMAIL =
  process.env.RECIPIENT_EMAIL || "prathampanchal1515@gmail.com";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const sendViaFormSubmit = async (name, email, subject, message) => {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(INBOX_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
        Referer: "http://localhost:3000/contact",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _replyto: email,
        _subject: `New portfolio message from ${name}: ${subject}`,
        _captcha: "false",
        _template: "box",
      }),
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === "false") {
    throw new Error(data.message || `FormSubmit failed with ${response.status}`);
  }
  console.log("✅ Inbox email sent to:", INBOX_EMAIL);
  return true;
};

const sendConfirmationEmail = async (name, email, subject, message) => {
  if (!transporter) {
    return false;
  }
  try {
    await transporter.sendMail({
      from: `"Pratham's Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out! - Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Thank you, ${escapeHtml(name)}! 👋</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            I've received your message and will get back to you within 24 hours.
          </p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p style="margin: 10px 0 0 0;"><strong>Message:</strong> ${escapeHtml(message)}</p>
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

const sendNotificationEmail = async (name, email, subject, message) => {
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
        to: INBOX_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">📬 New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 10px 0 0 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin: 10px 0 0 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
              <p style="margin: 10px 0 0 0;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
        `,
      });
      console.log("✅ Notification email sent to:", INBOX_EMAIL);
      return true;
    } catch (error) {
      console.error("❌ SMTP notification failed, trying inbox fallback:", error.message);
    }
  }

  try {
    return await sendViaFormSubmit(name, email, subject, message);
  } catch (error) {
    console.error("❌ Error sending inbox email:", error.message);
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

  db.run(
    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
    [name, email, subject, message],
    async function (err) {
      if (err) {
        console.error("❌ Error saving contact:", err.message);
        return res.status(500).json({
          success: false,
          error: "Failed to send message. Please try again later.",
        });
      }

      console.log(`📬 New contact form submission from ${name} (${email})`);

      try {
        await sendConfirmationEmail(name, email, subject, message);
        const notificationOk = await sendNotificationEmail(name, email, subject, message);

        if (!notificationOk) {
          console.warn("⚠️ Message saved, but the inbox email did not send.");
        }
      } catch (emailErr) {
        console.error("❌ Email sending crashed:", emailErr.message);
      }

      return res.status(200).json({
        success: true,
        message:
          "Message received! I'll get back to you within 24 hours (email confirmation may be delayed).",
      });
    }
  );
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
