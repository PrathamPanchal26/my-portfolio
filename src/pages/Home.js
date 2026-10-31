import React from "react";
import { Link } from "react-router-dom";
import ProjectEstimator from "../components/ProjectEstimator";
import FAQSection from "../components/FAQSection";
import DevCreatorHub, { YOUTUBE_URL, INSTAGRAM_URL } from "../components/DevCreatorHub";
import InteractivePlayground from "../components/InteractivePlayground";
import GithubActivityPulse from "../components/GithubActivityPulse";
import LiveClockStatus from "../components/LiveClockStatus";
import ThreeDHeroCanvas from "../components/ThreeDHeroCanvas";
import ThreeDTiltCard from "../components/ThreeDTiltCard";
import ThreeDTechCube from "../components/ThreeDTechCube";
import { INSIGHTS } from "../data/insightsData";
import { soundFX } from "../utils/soundEffects";
import { downloadVCard } from "../utils/vcard";
import {
  trackResumeView,
  trackWhatsAppClick,
  trackDemoLaunch,
} from "../utils/analytics";

const SERVICES = [
  {
    icon: "⚛️",
    badge: "Engineering",
    title: "Custom React Applications",
    desc: "Single-page applications engineered with React 19, modern hooks, robust state management, and modular reusable component architecture.",
  },
  {
    icon: "🏛️",
    badge: "Full-Cycle",
    title: "Turnkey Client Platforms",
    desc: "High-trust digital web presence for businesses, studios, and enterprises — inspired by the real Kanha Construction platform.",
  },
  {
    icon: "🎨",
    badge: "UI / UX",
    title: "Modern UI/UX & Prototyping",
    desc: "Bento grid architectures, glassmorphism, fluid typography, dark/light design systems, and silky 60fps micro-interactions.",
  },
  {
    icon: "🚀",
    badge: "Core Vitals",
    title: "Performance & SEO Optimization",
    desc: "Sub-second load times, 95+ Core Web Vitals, rich Schema.org structured data, and dominant regional Google search ranking.",
  },
];

const FEATURED_HIGHLIGHTS = [
  {
    emoji: "📝",
    title: "TaskMaster Pro",
    tag: "Full-Stack Task Suite",
    desc: "MERN-inspired project planner with priority queues, categories, sprint analytics, and real-time persistence.",
    link: "/demos/taskmaster-pro",
    stack: ["React", "LocalStorage", "Analytics"],
  },
  {
    emoji: "🏛️",
    title: "Kanha Construction",
    tag: "Turnkey Studio",
    desc: "Architectural civil design and interior showcase studio with inquiry estimation and project galleries.",
    link: "/demos/kanha-portfolio",
    stack: ["React SPA", "Architecture", "Estimation"],
  },
  {
    emoji: "🔐",
    title: "Kanha Admin Portal",
    tag: "Security CMS",
    desc: "Restricted PIN-authenticated dashboard with project CMS publisher and real-time leads tracker.",
    link: "/demos/kanha-admin",
    stack: ["PIN Auth", "CMS Studio", "Leads Telemetry"],
  },
  {
    emoji: "🎵",
    title: "Spotify Bollywood",
    tag: "Audio Streaming",
    desc: "Web Audio API synthesizer with trending Bollywood tracks, synchronized lyrics, and seekbar.",
    link: "/demos/spotify-bollywood",
    stack: ["Web Audio API", "Lyrics Sync", "Playback"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Pratham built our official Kanha Construction & Interior platform and restricted Admin CMS. The design elegance, lightning performance, and intuitive leads management gave our studio immense authority in Ahmedabad.",
    author: "Kanha Construction & Interior",
    role: "Architecture & Turnkey Studio",
    location: "Nikol, Ahmedabad, India",
    stars: "★★★★★",
    tag: "Commercial Turnkey Platform",
  },
  {
    quote:
      "Exceptional frontend engineer. Pratham turns complex ideas into clean React components with remarkable speed. His code structure is clean, responsive across every screen, and Google SEO-friendly.",
    author: "Client Collaboration",
    role: "Web Application Project Lead",
    location: "Remote / Hybrid",
    stars: "★★★★★",
    tag: "React Web Application",
  },
  {
    quote:
      "Pratham engineered an interactive audio streaming experience using Web Audio API that blew us away. His attention to detail, smooth UI micro-animations, and dark mode are top notch.",
    author: "Creative Media Client",
    role: "Spotify Bollywood Interactive Project",
    location: "Gujarat, India",
    stars: "★★★★★",
    tag: "Web Audio & UI Design",
  },
];

const SEO_TOPICS = [
  "Pratham Panchal",
  "Pratham Panchal Portfolio",
  "Pratham Panchal Website",
  "Best Frontend Developer Ahmedabad",
  "Top React Developer Ahmedabad",
  "React JS Developer Ahmedabad",
  "Frontend Developer Nikol Ahmedabad",
  "Web Developer Ahmedabad",
  "Web Designer Ahmedabad",
  "Website Designer Nikol Ahmedabad",
  "Hire React Developer Ahmedabad",
  "Hire Frontend Developer Ahmedabad",
  "Freelance Web Developer Gujarat",
  "Pratham Panchal GitHub",
  "Pratham Panchal Resume",
  "PrathamPanchal26",
  "Pratham Coding World",
  "Pratham Coding World YouTube",
  "@devbypratham Instagram",
  "Kanha Construction Website",
  "Kanha Admin Portal CMS",
  "Spotify Bollywood React",
  "TaskMaster Pro Productivity",
  "Cloth Inventory System React",
  "React 19 Developer India",
  "Modern 3D Portfolio Website",
  "Turnkey Web Solutions Ahmedabad",
  "Modern UI/UX Design Ahmedabad",
  "Sub-Second Core Web Vitals",
  "Technical SEO React Developer",
  "JavaScript ES6+ Specialist",
  "Tailwind CSS Developer Ahmedabad",
  "Responsive Web Designer Nikol",
  "Single Page Applications SPA",
  "Commercial Admin Portals",
  "Lighthouse 100 Performance",
  "Coding Tutorials Ahmedabad",
  "Full Stack Developer Ahmedabad",
  "Web Development Services Gujarat",
];

function Home() {
  const scrollToPlayground = () => {
    soundFX.playPop();
    const el = document.getElementById("playground");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCard = () => {
    soundFX.playSuccess();
    downloadVCard();
  };

  return (
    <div className="page hero-page">
      {/* Trending Bento Hero Section */}
      <div className="bento-hero-wrapper">
        <div className="bento-hero-main">
          {/* Live Clock & Working Status Pill */}
          <div className="hero-top-row">
            <LiveClockStatus />
            <div className="hero-mini-pill">
              <span className="sparkle-icon">✨</span> Trending UI/UX 2026
            </div>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="name-highlight">Pratham Panchal</span>
          </h1>

          <p className="hero-subtitle">
            <span className="role-tag">Frontend Developer</span>
            <span className="dot-sep">·</span>
            <span className="role-tag">React Specialist</span>
            <span className="dot-sep">·</span>
            <span className="role-tag">UI/UX Designer</span>
            <span className="dot-sep">·</span>
            <span className="loc-tag">Ahmedabad, India</span>
          </p>

          <p className="hero-description">
            Crafting high-impact web applications that merge thoughtful UI/UX aesthetics with modern React engineering. Sub-second performance, responsive layouts across every phone and desktop, and zero compromises on code quality.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                soundFX.playClick();
                trackResumeView("hero_button");
                window.dispatchEvent(new CustomEvent("open-resume-modal"));
              }}
              title="View & Download Pratham's Resume"
            >
              📄 View Resume
            </button>

            <Link
              to="/projects"
              className="btn btn-secondary"
              onClick={() => soundFX.playClick()}
            >
              💼 Explore Work
            </Link>

            <button
              type="button"
              className="btn btn-tertiary"
              onClick={scrollToPlayground}
              title="Jump to Interactive UI Lab"
            >
              ⚡ Interactive Lab
            </button>

            <a
              href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp-hero"
              title="Chat directly on WhatsApp"
              onClick={() => {
                soundFX.playClick();
                trackWhatsAppClick("hero_button");
              }}
            >
              <span>💬</span> WhatsApp
            </a>

            <button
              type="button"
              className="btn btn-vcard-hero"
              onClick={handleDownloadCard}
              title="Save Contact to Phone"
            >
              <span>📇</span> Save vCard
            </button>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/PrathamPanchal26"
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-gh"
              title="GitHub Profile"
              onClick={() => soundFX.playClick()}
            >
              GitHub
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-yt"
              title="YouTube Channel: @prathamcodingworld"
              onClick={() => soundFX.playClick()}
            >
              YouTube
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="social-link social-link-ig"
              title="Instagram: @devbypratham"
              onClick={() => soundFX.playClick()}
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/pratham"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              title="LinkedIn"
              onClick={() => soundFX.playClick()}
            >
              LinkedIn
            </a>
            <a
              href="mailto:prathampanchal1515@gmail.com"
              className="social-link"
              title="Email"
              onClick={() => soundFX.playClick()}
            >
              Email
            </a>
          </div>
        </div>

        {/* Hero Aside 3D Bento Card */}
        <aside className="bento-hero-side">
          <ThreeDTiltCard className="bento-glass-card three-d-hero-glass-card" maxTilt={8} glare={true}>
            <div className="bento-card-top">
              <span className="bento-pulse-beacon"></span>
              <span className="bento-status-text">Interactive 3D Workspace</span>
            </div>

            {/* Hardware-Accelerated 3D Holographic Canvas */}
            <ThreeDHeroCanvas />

            <div className="bento-metrics-mini">
              <div className="mini-metric">
                <strong>9+</strong>
                <span>Live Apps</span>
              </div>
              <div className="mini-metric">
                <strong>60 FPS</strong>
                <span>3D Canvas</span>
              </div>
              <div className="mini-metric">
                <strong>95+</strong>
                <span>Lighthouse</span>
              </div>
            </div>

            <Link
              to="/projects"
              className="bento-card-cta"
              onClick={() => soundFX.playClick()}
            >
              Explore All Projects →
            </Link>
          </ThreeDTiltCard>
        </aside>
      </div>

      {/* Services / What I Do Section */}
      <section className="home-services-section">
        <div className="section-header-compact">
          <span className="section-tag-sm">Core Capabilities</span>
          <h3>What I Bring to Your Next Project</h3>
          <p className="section-header-sub">
            Bridging pixel-perfect UI design with battle-tested frontend engineering.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <ThreeDTiltCard
              key={s.title}
              className="service-card bento-glass-surface three-d-card-interactive"
              maxTilt={10}
            >
              <div className="service-card-top">
                <div className="service-icon">{s.icon}</div>
                <span className="service-badge">{s.badge}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </ThreeDTiltCard>
          ))}
        </div>
      </section>

      {/* Featured Interactive Applications Strip */}
      <section className="home-featured-section">
        <div className="home-featured-header">
          <div>
            <span className="section-tag-sm">Live Applications</span>
            <h3>Featured In-Browser Demos</h3>
            <p className="featured-sub">
              Full functional apps engineered with state persistence, Web Audio, and responsive UI.
            </p>
          </div>
          <Link
            to="/projects"
            className="link-view-all"
            onClick={() => soundFX.playClick()}
          >
            Browse all 9 applications →
          </Link>
        </div>

        <div className="featured-cards-grid">
          {FEATURED_HIGHLIGHTS.map((item) => (
            <ThreeDTiltCard
              key={item.title}
              className="featured-preview-card bento-glass-surface three-d-card-interactive"
              maxTilt={12}
            >
              <div className="preview-top">
                <span className="preview-emoji">{item.emoji}</span>
                <span className="preview-tag">{item.tag}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <div className="card-stack-pills">
                {item.stack.map((st) => (
                  <span className="stack-pill-sm" key={st}>
                    {st}
                  </span>
                ))}
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="preview-demo-link"
                onClick={() => {
                  soundFX.playClick();
                  trackDemoLaunch(item.title, item.link);
                }}
              >
                Launch Demo ↗
              </a>
            </ThreeDTiltCard>
          ))}
        </div>
      </section>

      {/* NEW FEATURE: Interactive UI & Micro-Interaction Playground */}
      <InteractivePlayground />

      {/* NEW 3D FEATURE: Interactive 3D Tech Cube */}
      <section className="home-3d-cube-wrapper">
        <ThreeDTechCube />
      </section>

      {/* Quick Stats Strip */}
      <section className="home-metrics-strip bento-glass-surface">
        <div className="metric-box">
          <span className="metric-digit">9+</span>
          <span className="metric-caption">Interactive Live Demos</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">100%</span>
          <span className="metric-caption">Mobile Responsive</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">&lt;24h</span>
          <span className="metric-caption">Response Time</span>
        </div>
        <div className="metric-box">
          <span className="metric-digit">95+</span>
          <span className="metric-caption">Lighthouse Score</span>
        </div>
      </section>

      {/* NEW FEATURE: GitHub Activity Pulse & Engineering Momentum */}
      <section className="home-github-pulse-section">
        <GithubActivityPulse />
      </section>

      {/* Featured Engineering Case Studies & Architecture Deep Dives */}
      <section className="home-case-studies-section">
        <div className="home-featured-header">
          <div>
            <span className="section-tag-sm">Technical Authority</span>
            <h3>Engineering Case Studies &amp; Architecture Deep Dives</h3>
          </div>
          <Link
            to="/insights"
            className="link-view-all"
            onClick={() => soundFX.playClick()}
          >
            Read all case studies →
          </Link>
        </div>

        <div className="home-insights-grid">
          {INSIGHTS.slice(0, 3).map((item) => (
            <div className="home-insight-card bento-glass-surface" key={item.id}>
              <div className="insight-card-meta">
                <span className="insight-cat-badge">{item.category}</span>
                <span className="insight-read-time">{item.readTime}</span>
              </div>
              <h4>
                <Link to="/insights" onClick={() => soundFX.playClick()}>
                  {item.title}
                </Link>
              </h4>
              <p>{item.subtitle}</p>
              <div className="home-insight-metrics">
                {item.metrics.slice(0, 2).map((m, idx) => (
                  <span className="mini-metric-pill" key={idx}>
                    <strong>{m.value}</strong> {m.label}
                  </span>
                ))}
              </div>
              <Link
                to="/insights"
                className="home-insight-link"
                onClick={() => soundFX.playClick()}
              >
                Read Breakdown →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Search Website Omnibox Strip */}
      <section className="home-search-banner bento-glass-surface">
        <div className="search-banner-inner">
          <div className="search-banner-text">
            <span className="section-tag-sm">Omnibar Search</span>
            <h3>Looking for a specific skill, demo, or question?</h3>
            <p>
              Search all 9 applications, React architecture, pricing estimates, resume, and contact details instantly.
            </p>
          </div>
          <button
            type="button"
            className="search-banner-trigger-btn"
            onClick={() => {
              soundFX.playClick();
              window.dispatchEvent(new CustomEvent("open-site-search"));
            }}
            title="Open Site Search"
          >
            <span className="banner-btn-icon">🔍</span>
            <span className="banner-btn-text">Search all website...</span>
            <kbd className="banner-kbd">Ctrl + K</kbd>
          </button>
        </div>
      </section>

      {/* Dev Creator Hub — YouTube & Instagram Tutorials Showcase */}
      <DevCreatorHub />

      {/* Client Recommendations & Social Proof Section */}
      <section className="home-testimonials-section">
        <div className="section-header-compact">
          <span className="section-tag-sm">Social Proof &amp; Reviews</span>
          <h3>Client Recommendations &amp; Proven Track Record</h3>
          <p className="testimonials-subtitle">
            Rated <strong>5.0 / 5.0</strong> by client collaborators and businesses in Ahmedabad, India.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, index) => (
            <div className="home-testimonial-card bento-glass-surface" key={index}>
              <div className="testimonial-top">
                <span className="testimonial-stars" aria-label="5 out of 5 stars">{t.stars}</span>
                <span className="testimonial-tag">{t.tag}</span>
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author-block">
                <div className="author-avatar">{t.author.charAt(0)}</div>
                <div>
                  <h4 className="author-name">{t.author}</h4>
                  <p className="author-role">{t.role}</p>
                  <span className="author-loc">📍 {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Cost & Timeline Calculator */}
      <ProjectEstimator />

      {/* Interactive FAQ Knowledge Section */}
      <FAQSection />

      {/* SEO Regional & Core Keyword Authority Section */}
      <section className="home-seo-keywords-strip bento-glass-surface">
        <div className="seo-strip-header">
          <span className="pulse-dot-green"></span>
          <h4>Popular Search Keywords &amp; Regional Specializations</h4>
        </div>
        <p className="seo-strip-desc">
          Official engineering portfolio of <strong>Pratham Panchal</strong>, Frontend Developer and React Specialist based in <strong>Ahmedabad, Gujarat, India</strong>. Specialized in turnkey platforms, custom React web apps, modern UI/UX design, and SEO-optimized architecture.
        </p>
        <div className="seo-keywords-cloud">
          {SEO_TOPICS.map((topic, i) => (
            <button
              key={i}
              type="button"
              className="seo-keyword-tag"
              onClick={() => {
                soundFX.playPop();
                window.dispatchEvent(new CustomEvent("open-site-search"));
              }}
              title={`Search for "${topic}" in site`}
            >
              #{topic}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
