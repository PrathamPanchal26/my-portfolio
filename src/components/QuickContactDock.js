import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  trackWhatsAppClick,
  trackEmailClick,
  trackResumeView,
} from "../utils/analytics";

const WHATSAPP_URL =
  "https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!";
const EMAIL_URL = "mailto:prathampanchal1515@gmail.com";

export default function QuickContactDock() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("quick_dock_collapsed") === "true";
    } catch {
      return false;
    }
  });
  const location = useLocation();

  // Hide on demo pages so it doesn't overlap with apps
  if (location.pathname.startsWith("/demos")) {
    return null;
  }

  const handleToggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("quick_dock_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const handleOpenResume = () => {
    trackResumeView("quick_dock");
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  };

  return (
    <aside
      className={`quick-contact-dock ${collapsed ? "dock-collapsed" : "dock-expanded"}`}
      aria-label="Quick Connect & Availability"
    >
      {collapsed ? (
        <button
          type="button"
          className="dock-pill-btn"
          onClick={handleToggle}
          title="Pratham is available for hire — Click to connect"
          aria-label="Open Quick Contact Dock"
        >
          <span className="dock-pulse-dot" aria-hidden="true"></span>
          <span className="dock-pill-text">Available for Hire</span>
          <span className="dock-pill-arrow" aria-hidden="true">💬</span>
        </button>
      ) : (
        <div className="dock-card">
          <div className="dock-header">
            <div className="dock-status">
              <span className="dock-pulse-dot" aria-hidden="true"></span>
              <div>
                <span className="dock-status-title">Available for Hire</span>
                <span className="dock-status-sub">Freelance &amp; Full-Time</span>
              </div>
            </div>
            <button
              type="button"
              className="dock-close-btn"
              onClick={handleToggle}
              title="Minimize Quick Dock"
              aria-label="Minimize Quick Dock"
            >
              ✕
            </button>
          </div>

          <p className="dock-desc">
            Let's build your next React web app or corporate studio. Quick responses within 24h.
          </p>

          <div className="dock-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="dock-action-btn dock-whatsapp"
              title="Chat on WhatsApp"
              onClick={() => trackWhatsAppClick("quick_dock")}
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href={EMAIL_URL}
              className="dock-action-btn dock-email"
              title="Send an Email"
              onClick={() => trackEmailClick("quick_dock")}
            >
              <span>✉️</span> Email
            </a>
            <button
              type="button"
              className="dock-action-btn dock-resume"
              onClick={handleOpenResume}
              title="View Resume"
            >
              <span>📄</span> Resume
            </button>
            <Link
              to="/contact"
              className="dock-action-btn dock-talk"
              title="Go to Contact Page"
            >
              <span>🚀</span> Talk
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
