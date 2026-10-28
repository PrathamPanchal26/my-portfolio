import React from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_URL, INSTAGRAM_URL } from "./DevCreatorHub";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          Pratham<span>.dev</span>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div className="footer-socials" aria-label="Creator and Social Channels">
          <a
            href="https://github.com/PrathamPanchal26"
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-gh"
            title="GitHub: PrathamPanchal26"
          >
            <span>🐙</span> GitHub
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-yt"
            title="YouTube: @prathamcodingworld"
          >
            <span>▶</span> YouTube (@prathamcodingworld)
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-ig"
            title="Instagram: @devbypratham"
          >
            <span>📸</span> Instagram (@devbypratham)
          </a>
          <a
            href="https://linkedin.com/in/pratham"
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-li"
            title="LinkedIn"
          >
            <span>💼</span> LinkedIn
          </a>
        </div>

        <p className="footer-copy">
          © {year} Pratham Panchal — Frontend Developer &amp; Tech Content Creator · Ahmedabad, India.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
