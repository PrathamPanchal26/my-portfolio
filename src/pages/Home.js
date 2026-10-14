import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page hero-page">
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-badge">Available for freelance work</div>

          <h1>
            Hi, I'm <span className="name-highlight">Pratham Panchal</span>
          </h1>

          <p className="hero-subtitle">
            <span className="role">Frontend Developer</span>
            <span className="dot">·</span>
            React Specialist
            <span className="dot">·</span>
            Web Designer
            <span className="dot">·</span>
            Ahmedabad, India
          </p>

          <p className="hero-description">
            Welcome to the official portfolio of Pratham Panchal. I craft clean,
            responsive, and high-performance web experiences — pairing thoughtful UI
            design with modern React engineering. Let's turn an idea into a site
            that feels considered, fast, and distinctive.
          </p>

          <div className="hero-buttons">
            <a
              href="/Resum.JPG"
              download="Resum.JPG"
              className="btn btn-primary"
            >
              Download Resume
            </a>
            <Link to="/contact" className="btn btn-secondary">
              Let's Talk
            </Link>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/PrathamPanchal26"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="GitHub"
            >
              GH
            </a>
            <a
              href="https://linkedin.com/in/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="LinkedIn"
            >
              in
            </a>
            <a
              href="https://twitter.com/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="Twitter"
            >
              X
            </a>
            <a
              href="mailto:prathampanchal1515@gmail.com"
              className="social-link"
              title="Email"
            >
              @
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-panel-card">
            <p className="hero-panel-kicker">Currently</p>
            <h2>Building interfaces people actually enjoy using.</h2>
            <ul>
              <li>React &amp; modern CSS</li>
              <li>Responsive, accessible layouts</li>
              <li>UI design &amp; visual polish</li>
            </ul>
            <Link to="/projects" className="hero-panel-link">
              View selected work →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
