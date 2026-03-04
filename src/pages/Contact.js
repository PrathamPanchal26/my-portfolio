import React, { useState } from "react";

// Backend API URL
const API_URL = "http://localhost:5000/api/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        "Failed to send message. Please try again later or contact directly at pratham.panchal0626@gmail.com"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Get In Touch</div>
        <h2>Contact Me</h2>
        <p>Have a project in mind? Let's work together and build something great.</p>
        <div className="divider"></div>
      </div>

      <div className="contact-wrapper">
        {/* Left: Info */}
        <div className="contact-info">
          <h3>Let's talk about your project 🚀</h3>
          <p>
            I'm currently available for freelance work and open to full-time
            opportunities. Feel free to reach out — I'd love to hear from you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-item-icon">📧</div>
              <div>
                <strong style={{ color: "#f1f5f9", display: "block", marginBottom: "2px" }}>Email</strong>
                pratham@email.com
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📱</div>
              <div>
                <strong style={{ color: "#f1f5f9", display: "block", marginBottom: "2px" }}>Phone</strong>
                +91 XXXXX XXXXX
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <strong style={{ color: "#f1f5f9", display: "block", marginBottom: "2px" }}>Location</strong>
                India
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">⏰</div>
              <div>
                <strong style={{ color: "#f1f5f9", display: "block", marginBottom: "2px" }}>Response Time</strong>
                Within 24 hours
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <a
              href="https://github.com/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="GitHub"
            >
              🐙
            </a>
            <a
              href="https://linkedin.com/in/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="LinkedIn"
            >
              💼
            </a>
            <a
              href="https://twitter.com/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="Twitter"
            >
              🐦
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form">
          {submitted ? (
            <div className="form-success">
              <span className="success-icon">✅</span>
              <h3>Message Sent!</h3>
              <p>
                Thanks for reaching out, <strong>{formData.name}</strong>!
                I'll get back to you within 24 hours. Check your inbox for a
                confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry / Freelance Work"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    marginBottom: "16px",
                    color: "#fca5a5",
                    fontSize: "0.88rem",
                    lineHeight: "1.5",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Sending... ⏳" : "Send Message 🚀"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
