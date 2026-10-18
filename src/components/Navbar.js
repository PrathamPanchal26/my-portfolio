import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          Pratham<span>.dev</span>
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
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-search-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("open-site-search"))}
            title="Search all website (Ctrl + K)"
            aria-label="Search all website"
          >
            <span className="nav-search-icon" aria-hidden="true">🔍</span>
            <span className="nav-search-text">Search</span>
            <kbd className="nav-search-kbd">Ctrl+K</kbd>
          </button>

          <button
            type="button"
            className="nav-resume-btn"
            onClick={() => {
              closeMenu();
              window.dispatchEvent(new CustomEvent("open-resume-modal"));
            }}
            title="View Pratham's Professional Resume"
            aria-label="View Resume"
          >
            <span className="nav-resume-icon" aria-hidden="true">📄</span>
            <span className="nav-resume-text">Resume</span>
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
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

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
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
