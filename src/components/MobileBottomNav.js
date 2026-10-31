import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { soundFX } from "../utils/soundEffects";
import { trackResumeView, trackWhatsAppClick } from "../utils/analytics";

const WHATSAPP_URL =
  "https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!";

export default function MobileBottomNav() {
  const location = useLocation();

  // Hide on demo viewer pages so it doesn't obstruct interactive demo interfaces
  if (location.pathname.startsWith("/demos")) {
    return null;
  }

  const handleResumeClick = () => {
    soundFX.playPop();
    trackResumeView("mobile_bottom_nav");
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  };

  const handleNavClick = () => {
    soundFX.playClick();
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-inner">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
          onClick={handleNavClick}
          aria-label="Home"
        >
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-text">Home</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
          onClick={handleNavClick}
          aria-label="Projects"
        >
          <span className="bottom-nav-icon">💼</span>
          <span className="bottom-nav-text">Projects</span>
        </NavLink>

        <button
          type="button"
          className="bottom-nav-item bottom-nav-highlight"
          onClick={handleResumeClick}
          aria-label="View Resume"
        >
          <div className="bottom-nav-resume-badge">
            <span className="bottom-nav-icon">📄</span>
          </div>
          <span className="bottom-nav-text">Resume</span>
        </button>

        <NavLink
          to="/skills"
          className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
          onClick={handleNavClick}
          aria-label="Skills"
        >
          <span className="bottom-nav-icon">⚡</span>
          <span className="bottom-nav-text">Skills</span>
        </NavLink>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="bottom-nav-item"
          onClick={() => {
            soundFX.playClick();
            trackWhatsAppClick("mobile_bottom_nav");
          }}
          aria-label="Chat on WhatsApp"
        >
          <span className="bottom-nav-icon">💬</span>
          <span className="bottom-nav-text">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}

