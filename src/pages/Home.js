import React from "react";

function Home() {
  return (
    <div className="page" style={{ position: "relative", padding: "0 60px" }}>
      <div className="hero">
        <div className="hero-badge">✨ Available for Freelance</div>

        <h1>
          Hi, I'm <span className="name-highlight">Pratham</span>
        </h1>

        <p className="hero-subtitle">
          <span className="role">Frontend Developer</span> &nbsp;·&nbsp; React &nbsp;·&nbsp; Web Designer
        </p>

        <p className="hero-description">
          I craft beautiful, responsive web experiences with clean code and
          creative UI designs. Passionate about turning ideas into reality
          through modern web technologies.
        </p>

        <div className="hero-buttons">
          <a
            href="2026_01_24_13_34_09_IMG_1163.JPG"
            download
            className="btn btn-primary"
          >
            📄 Download Resume
          </a>
          <a href="/contact" className="btn btn-secondary">
            💬 Let's Talk
          </a>
        </div>

        <div className="social-links">
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
          <a
            href="mailto:pratham@email.com"
            className="social-link"
            title="Email"
          >
            📧
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>↓</span>
        scroll
      </div>
    </div>
  );
}

export default Home;
