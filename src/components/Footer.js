import React from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_URL, INSTAGRAM_URL } from "./DevCreatorHub";
import { trackOutboundClick } from "../utils/analytics";

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
            onClick={() =>
              trackOutboundClick(
                "GitHub",
                "https://github.com/PrathamPanchal26",
                "footer"
              )
            }
          >
            <span>🐙</span> GitHub
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-yt"
            title="YouTube: @prathamcodingworld"
            onClick={() =>
              trackOutboundClick("YouTube", YOUTUBE_URL, "footer")
            }
          >
            <span>▶</span> YouTube (@prathamcodingworld)
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-ig"
            title="Instagram: @devbypratham"
            onClick={() =>
              trackOutboundClick("Instagram", INSTAGRAM_URL, "footer")
            }
          >
            <span>📸</span> Instagram (@devbypratham)
          </a>
          <a
            href="https://linkedin.com/in/pratham"
            target="_blank"
            rel="noreferrer"
            className="footer-social-pill footer-li"
            title="LinkedIn"
            onClick={() =>
              trackOutboundClick(
                "LinkedIn",
                "https://linkedin.com/in/pratham",
                "footer"
              )
            }
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
