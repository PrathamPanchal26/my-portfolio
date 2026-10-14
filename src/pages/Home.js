import React from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: "⚛️",
    title: "Custom React Applications",
    desc: "Single-page applications engineered with React 19, modern hooks, robust state management, and reusable component libraries.",
  },
  {
    icon: "🏛️",
    title: "Turnkey Client Websites",
    desc: "Full-cycle digital web presence for businesses, studios, and enterprises — inspired by the real Kanha Construction platform.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design & Prototyping",
    desc: "Aesthetic, clean, and modern user interfaces crafted with tailored color systems, fluid typography, and dark/light themes.",
  },
  {
    icon: "🚀",
    title: "Performance & SEO Optimization",
    desc: "Sub-second load times, Core Web Vitals optimization, semantic HTML5 structure, and search-ranking metadata.",
  },
];

const FEATURED_HIGHLIGHTS = [
  {
    emoji: "📝",
    title: "TaskMaster Pro",
    tag: "Full-Stack Task Suite",
    desc: "MERN-inspired project planner with priority queues, categories, sprint analytics, and real-time persistence.",
    link: "/demos/taskmaster-pro",
  },
  {
    emoji: "🏛️",
    title: "Kanha Construction",
    tag: "Turnkey Studio",
    desc: "Architectural civil design and interior showcase studio with inquiry estimation and project galleries.",
    link: "/demos/kanha-portfolio",
  },
  {
    emoji: "🔐",
    title: "Kanha Admin Portal",
    tag: "Security CMS",
    desc: "Restricted PIN-authenticated dashboard with project CMS publisher and real-time leads tracker.",
    link: "/demos/kanha-admin",
  },
  {
    emoji: "🎵",
    title: "Spotify Bollywood",
    tag: "Audio Streaming",
    desc: "Web Audio API synthesizer with trending Bollywood tracks, synchronized lyrics, and seekbar.",
    link: "/demos/spotify-bollywood",
  },
];

function Home() {
  return (
    <div className="page hero-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse-dot-green"></span> Available for freelance work &amp; full-time roles
          </div>

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
            <a
              href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp-hero"
              title="Chat directly on WhatsApp"
            >
              <span>💬</span> WhatsApp
            </a>
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
              <li>React 19 &amp; modern CSS architectures</li>
              <li>Responsive, accessible, zero-glitch layouts</li>
              <li>Interactive live demos directly in-browser</li>
              <li>Client web platforms &amp; admin dashboards</li>
            </ul>
            <Link to="/projects" className="hero-panel-link">
              View all 9 live applications →
            </Link>
          </div>
        </aside>
      </div>

      {/* Services / What I Do Section */}
      <section className="home-services-section">
        <div className="section-header-compact">
          <span className="section-tag-sm">Core Capabilities</span>
          <h3>What I Bring to Your Team</h3>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Interactive Applications Strip */}
      <section className="home-featured-section">
        <div className="home-featured-header">
          <div>
            <span className="section-tag-sm">Live Work</span>
            <h3>Featured In-Browser Applications</h3>
          </div>
          <Link to="/projects" className="link-view-all">
            Browse all 9 demos →
          </Link>
        </div>

        <div className="featured-cards-grid">
          {FEATURED_HIGHLIGHTS.map((item) => (
            <div className="featured-preview-card" key={item.title}>
              <div className="preview-top">
                <span className="preview-emoji">{item.emoji}</span>
                <span className="preview-tag">{item.tag}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="preview-demo-link"
              >
                Launch Demo ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="home-metrics-strip">
        <div className="metric-box">
          <span className="metric-digit">9+</span>
          <span className="metric-caption">Interactive Live Demos</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">100%</span>
          <span className="metric-caption">Responsive Tested</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">&lt;24h</span>
          <span className="metric-caption">Response Time</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">95+</span>
          <span className="metric-caption">Lighthouse Score Target</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
