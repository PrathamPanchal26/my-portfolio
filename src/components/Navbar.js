import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { soundFX } from "../utils/soundEffects";
import { downloadVCard } from "../utils/vcard";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(() => soundFX.isEnabled());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => {
    soundFX.playClick();
    setMenuOpen(false);
  };

  const handleToggleSound = () => {
    const nextState = soundFX.toggleSound();
    setSoundActive(nextState);
  };

  const handleToggleTheme = () => {
    soundFX.playThemeToggle();
    toggleTheme();
  };

  const handleDownloadCard = () => {
    soundFX.playSuccess();
    downloadVCard();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <span className="logo-symbol">✦</span> Pratham<span>.dev</span>
        </NavLink>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/skills" onClick={closeMenu}>
            Skills
          </NavLink>
          <NavLink to="/projects" onClick={closeMenu}>
            Projects
          </NavLink>
          <NavLink to="/insights" onClick={closeMenu}>
            Insights
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          {/* Mobile drawer quick actions */}
          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-buttons">
              <button
                type="button"
                className="mobile-vcard-btn"
                onClick={() => {
                  closeMenu();
                  handleDownloadCard();
                }}
              >
                📇 Save Contact Card
              </button>
              <button
                type="button"
                className="mobile-sound-btn"
                onClick={handleToggleSound}
              >
                {soundActive ? "🔊 Sound On" : "🔇 Sound Off"}
              </button>
            </div>
            <div className="mobile-drawer-socials">
              <a
                href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio!"
                target="_blank"
                rel="noreferrer"
                className="drawer-social-wa"
              >
                💬 WhatsApp
              </a>
              <a
                href="https://github.com/PrathamPanchal26"
                target="_blank"
                rel="noreferrer"
                className="drawer-social-gh"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {/* Sound FX Toggle */}
          <button
            type="button"
            className={`nav-icon-btn ${soundActive ? "sound-active" : ""}`}
            onClick={handleToggleSound}
            title={soundActive ? "Mute interactive UI audio" : "Enable interactive UI audio effects"}
            aria-label={soundActive ? "Mute sound" : "Enable sound"}
          >
            <span aria-hidden="true">{soundActive ? "🔊" : "🔇"}</span>
          </button>

          {/* Quick vCard Download */}
          <button
            type="button"
            className="nav-icon-btn nav-vcard-btn"
            onClick={handleDownloadCard}
            title="Download Pratham's vCard Contact for your phone"
            aria-label="Save Contact"
          >
            <span aria-hidden="true">📇</span>
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            className="nav-search-btn"
            onClick={() => {
              soundFX.playClick();
              window.dispatchEvent(new CustomEvent("open-site-search"));
            }}
            title="Search all website (Ctrl + K)"
            aria-label="Search all website"
          >
            <span className="nav-search-icon" aria-hidden="true">🔍</span>
            <span className="nav-search-text">Search</span>
            <kbd className="nav-search-kbd">Ctrl+K</kbd>
          </button>

          {/* Resume Trigger */}
          <button
            type="button"
            className="nav-resume-btn"
            onClick={() => {
              soundFX.playPop();
              closeMenu();
              window.dispatchEvent(new CustomEvent("open-resume-modal"));
            }}
            title="View Pratham's Professional Resume"
            aria-label="View Resume"
          >
            <span className="nav-resume-icon" aria-hidden="true">📄</span>
            <span className="nav-resume-text">Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
            <span className="theme-toggle-label">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => {
              soundFX.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
