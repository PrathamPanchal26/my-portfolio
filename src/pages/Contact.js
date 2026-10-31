import React, { useState } from "react";
import {
  trackEvent,
  trackWhatsAppClick,
  trackEmailClick,
} from "../utils/analytics";
import { YOUTUBE_URL, INSTAGRAM_URL } from "../components/DevCreatorHub";
import { soundFX } from "../utils/soundEffects";
import { downloadVCard } from "../utils/vcard";
import LiveClockStatus from "../components/LiveClockStatus";

const API_URL = "/api/contact";
const INBOX_EMAIL = "prathampanchal1515@gmail.com";
const PHONE_NUMBER = "+919638561264";
const WHATSAPP_URL = "https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!";

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
  const [copiedField, setCopiedField] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleCopy = (text, fieldName) => {
    soundFX.playSuccess();
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2200);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleQuickTemplate = (topic) => {
    soundFX.playPop();
    setFormData((prev) => ({
      ...prev,
      subject: topic,
      message: `Hi Pratham,\n\nI am reaching out regarding ${topic}. I'd love to discuss scope, timeline, and how we might work together.\n\nBest regards,`,
    }));
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
        trackEvent("generate_lead", {
          method: "Contact Form",
          lead_source: "contact_page",
          event_category: "Conversion",
          event_label: formData.subject || "General Inquiry",
        });
      } else {
        setError(
          mailData.message ||
            "Could not send email automatically. Please feel free to email directly at prathampanchal1515@gmail.com or message via WhatsApp."
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
        <p>Have a project in mind? Let's work together and build something exceptional.</p>
        <div className="divider"></div>
      </div>

      <div className="contact-wrapper">
        {/* Left: Info */}
        <div className="contact-info">
          <div className="contact-status-badge">
            <span className="pulse-dot-green"></span> Available for new client projects &amp; full-time roles
          </div>

          <h3>Let's talk about your project</h3>
          <p>
            Whether you need a high-performance React application, a turnkey client
            website, or modern UI/UX design, I’m ready to collaborate. Reach out directly
            via email, phone, or instant WhatsApp chat!
          </p>

          <div className="contact-details">
            {/* Email item with Copy */}
            <div className="contact-item">
              <div className="contact-item-icon">@</div>
              <div className="contact-item-text">
                <div className="contact-item-header">
                  <strong>Email</strong>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => handleCopy(INBOX_EMAIL, "email")}
                    title="Copy Email Address"
                  >
                    {copiedField === "email" ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
                <a
                  href={`mailto:${INBOX_EMAIL}`}
                  className="contact-val-link"
                  onClick={() => trackEmailClick("contact_page")}
                >
                  {INBOX_EMAIL}
                </a>
              </div>
            </div>

            {/* Phone item with Copy */}
            <div className="contact-item">
              <div className="contact-item-icon">#</div>
              <div className="contact-item-text">
                <div className="contact-item-header">
                  <strong>Phone / Mobile</strong>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => handleCopy("+91 9638561264", "phone")}
                    title="Copy Phone Number"
                  >
                    {copiedField === "phone" ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
                <a href={`tel:${PHONE_NUMBER}`} className="contact-val-link">
                  +91 9638561264
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">
                <strong>Location</strong>
                <span>Ahmedabad, Gujarat, India (IST / UTC+5:30)</span>
              </div>
            </div>

            {/* Response Time */}
            <div className="contact-item">
              <div className="contact-item-icon">⏱</div>
              <div className="contact-item-text">
                <strong>Response Time</strong>
                <span>Within 24 hours guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp & vCard Action Buttons */}
          <div className="whatsapp-action-box">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              onClick={() => {
                soundFX.playClick();
                trackWhatsAppClick("contact_page");
              }}
            >
              <span className="wa-icon">💬</span> Chat Directly on WhatsApp
            </a>

            <button
              type="button"
              className="btn-vcard-contact"
              onClick={() => {
                soundFX.playSuccess();
                downloadVCard();
              }}
              title="Download Pratham's vCard Contact file for your mobile contacts"
            >
              <span>📇</span> Save Contact Card (.vcf)
            </button>
          </div>

          {/* Local IST Live Time Card */}
          <div className="contact-live-clock-card">
            <LiveClockStatus />
          </div>

          {/* Quick 15-Min Discovery Call Box */}
          <div className="discovery-call-card">
            <div className="call-card-badge">
              <span className="pulse-dot-green"></span> 15-Min Discovery Call
            </div>
            <h4>Prefer a Direct Conversation?</h4>
            <p>
              Let's do a quick intro chat via Google Meet or WhatsApp to explore your project ideas, scope, timeline, and tech stack.
            </p>
            <a
              href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20would%20like%20to%20schedule%20a%2015-minute%20intro%20call%20for%20my%20project."
              target="_blank"
              rel="noreferrer"
              className="btn-call-schedule"
            >
              <span>📅</span> Book 15-Min Intro Call
            </a>
          </div>

          {/* Tech Creator & Social Channels Card */}
          <div className="creator-connect-card">
            <div className="creator-connect-badge">
              <span>🎥</span> Creator &amp; Educator
            </div>
            <h4>Follow Tutorials &amp; Daily Dev Tips</h4>
            <p>
              I share practical frontend guides, React architectures, and project builds on YouTube &amp; Instagram.
            </p>
            <div className="creator-connect-buttons">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-creator-sub yt"
                title="Watch Pratham Coding World on YouTube"
              >
                <span>▶</span> YouTube (@prathamcodingworld)
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-creator-sub ig"
                title="Follow @devbypratham on Instagram"
              >
                <span>📸</span> Instagram (@devbypratham)
              </a>
            </div>
          </div>

          <div className="contact-socials">
            <a
              href="https://github.com/PrathamPanchal26"
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-gh"
              title="GitHub Profile"
            >
              GH
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-yt"
              title="YouTube: @prathamcodingworld"
            >
              YT
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-ig"
              title="Instagram: @devbypratham"
            >
              IG
            </a>
            <a
              href="https://linkedin.com/in/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="LinkedIn Profile"
            >
              in
            </a>
            <a
              href="https://twitter.com/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="Twitter / X"
            >
              X
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form">
          {/* Quick Subject Starters */}
          <div className="form-starter-chips">
            <span className="starter-label">Quick topics:</span>
            <button
              type="button"
              className="starter-chip"
              onClick={() => handleQuickTemplate("New Website / Web App Project")}
            >
              🚀 Web App Project
            </button>
            <button
              type="button"
              className="starter-chip"
              onClick={() => handleQuickTemplate("Frontend React Contract / Freelance")}
            >
              💼 Freelance Contract
            </button>
            <button
              type="button"
              className="starter-chip"
              onClick={() => handleQuickTemplate("UI/UX Redesign & Optimization")}
            >
              🎨 UI/UX Redesign
            </button>
          </div>

          {submitted ? (
            <div className="form-success">
              <span className="success-icon">✓</span>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thanks for reaching out, <strong>{formData.name}</strong>!
                Your message has been received, and I'll get back to you within 24 hours.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: "18px" }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g. Project Inquiry / React Development"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project goals, timeline, and requirements..."
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
                {loading ? "Sending Message..." : "Send Message ✉️"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
