import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-site-search"));
  };

  return (
    <div className="page not-found-page">
      <div className="not-found-container">
        <div className="not-found-badge">
          <span className="pulse-dot-orange"></span> HTTP 404 · Route Not Found
        </div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Lost in Cyberspace?</h2>
        <p className="not-found-desc">
          The requested path <code className="not-found-path">{location.pathname}</code> does
          not exist or has been relocated in Pratham's portfolio.
        </p>

        <div className="not-found-terminal">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">bash — router-diagnostics</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-line"><span className="term-prompt">$</span> curl -I https://prathampanchal.dev{location.pathname}</p>
            <p className="terminal-line err-line"><span className="term-status">HTTP/2 404 NOT FOUND</span></p>
            <p className="terminal-line"><span className="term-prompt">$</span> Suggestion: return home or search all 9 live applications.</p>
          </div>
        </div>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            🏠 Back to Home
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            💼 Browse 9 Projects
          </Link>
          <button
            type="button"
            className="btn btn-search-hero"
            onClick={handleOpenSearch}
            title="Search entire site (Ctrl + K)"
          >
            <span>🔍</span> Search Site <kbd>Ctrl+K</kbd>
          </button>
          <Link to="/contact" className="btn btn-outline-contact">
            📬 Contact Pratham
          </Link>
        </div>

        <div className="not-found-quick-links">
          <span className="quick-links-label">Popular Destinations:</span>
          <div className="quick-links-chips">
            <Link to="/about">About &amp; Experience</Link>
            <Link to="/skills">Technical Skills</Link>
            <Link to="/insights">Architecture Case Studies</Link>
            <Link to="/demos/kanha-portfolio">Kanha Construction Demo</Link>
            <Link to="/demos/spotify-bollywood">Spotify Bollywood Demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
