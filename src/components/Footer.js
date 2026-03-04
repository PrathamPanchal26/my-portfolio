import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Pratham.dev</div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-copy">
          © {year} Pratham. Crafted with ❤️ using React.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
