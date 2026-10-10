import React, { useState } from "react";

// Use the CRA proxy in development (see package.json "proxy")
const API_URL = "/api/contact";
const INBOX_EMAIL = "prathampanchal1515@gmail.com";

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
      const mailResponse = await fetch(
        `https://formsubmit.co/ajax/${INBOX_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
            _subject: `New portfolio message from ${formData.name}: ${formData.subject}`,
            _captcha: "false",
            _template: "box",
          }),
        }
      );

      const mailData = await mailResponse.json().catch(() => ({}));
      const mailOk = mailResponse.ok && String(mailData.success) !== "false";

      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});

      if (mailOk) {
        setSubmitted(true);
      } else {
        setError(
          mailData.message ||
            "Could not send email. If this is your first submission, please check prathampanchal1515@gmail.com (including Spam/Junk) to activate FormSubmit."
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        "Failed to send message. Please check your network connection or email directly at prathampanchal1515@gmail.com"
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
          <h3>Let's talk about your project</h3>
          <p>
            I'm currently available for freelance work and open to full-time
            opportunities. Feel free to reach out — I'd love to hear from you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-item-icon">@</div>
              <div>
                <strong>Email</strong>
                prathampanchal1515@gmail.com
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">#</div>
              <div>
                <strong>Phone</strong>
                +91 9638561264
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">◌</div>
              <div>
                <strong>Location</strong>
                India
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">⏱</div>
              <div>
                <strong>Response Time</strong>
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
              <span className="success-icon">✓</span>
              <h3>Message Sent!</h3>
              <p>
                Thanks for reaching out, <strong>{formData.name}</strong>!
                I'll get back to you within 24 hours.
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
                <div className="form-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
