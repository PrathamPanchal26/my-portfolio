import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { soundFX } from "../utils/soundEffects";

const SKILL_CATEGORIES = [
  "All Skills",
  "Frontend & React Ecosystem",
  "Web APIs & Architecture",
  "Developer Tools & Cloud",
  "UI/UX & Creative Design",
];

const SKILLS_DATA = [
  // --- Frontend & React ---
  {
    name: "React.js (18 & 19)",
    icon: "⚛️",
    category: "Frontend & React Ecosystem",
    proficiency: 95,
    level: "Expert Specialist",
    experience: "3+ Years",
    summary: "Single-page apps, custom hooks, concurrent rendering, state machines, and component architecture.",
    usedIn: [
      { name: "TaskMaster Pro", url: "/demos/taskmaster-pro" },
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
      { name: "Spotify Bollywood", url: "/demos/spotify-bollywood" },
    ],
  },
  {
    name: "JavaScript (ES6+)",
    icon: "⚡",
    category: "Frontend & React Ecosystem",
    proficiency: 94,
    level: "Advanced",
    experience: "3+ Years",
    summary: "Modern asynchronous JS, Promises, Closures, DOM optimization, Web Storage, and audio nodes.",
    usedIn: [
      { name: "Spotify Bollywood", url: "/demos/spotify-bollywood" },
      { name: "Inventory System", url: "/demos/inventory-system" },
    ],
  },
  {
    name: "HTML5 Semantic & SEO",
    icon: "🌐",
    category: "Frontend & React Ecosystem",
    proficiency: 98,
    level: "Master",
    experience: "3+ Years",
    summary: "Accessible landmark tags, Schema.org microdata, OpenGraph tags, and crawler optimization.",
    usedIn: [
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
      { name: "Official Portfolio", url: "/" },
    ],
  },
  {
    name: "CSS3 & Custom Tokens",
    icon: "🎨",
    category: "Frontend & React Ecosystem",
    proficiency: 95,
    level: "Expert",
    experience: "3+ Years",
    summary: "CSS Variables, Flexbox, Grid, fluid typography clamps, keyframe animations, and glassmorphism.",
    usedIn: [
      { name: "TaskMaster Pro", url: "/demos/taskmaster-pro" },
      { name: "Ecommerce UI", url: "/demos/ecommerce-ui" },
    ],
  },
  {
    name: "Tailwind CSS",
    icon: "💨",
    category: "Frontend & React Ecosystem",
    proficiency: 90,
    level: "Advanced",
    experience: "2+ Years",
    summary: "Utility-first rapid prototyping, responsive breakpoints, dark mode variants, and custom plugin extensions.",
    usedIn: [
      { name: "TaskMaster Pro", url: "/demos/taskmaster-pro" },
    ],
  },
  {
    name: "Bootstrap 5",
    icon: "🅱️",
    category: "Frontend & React Ecosystem",
    proficiency: 92,
    level: "Advanced",
    experience: "3+ Years",
    summary: "Grid layouts, interactive modal dialogues, dropdowns, and turnkey admin dashboard interfaces.",
    usedIn: [
      { name: "Kanha Admin Portal", url: "/demos/kanha-admin" },
    ],
  },
  {
    name: "Custom React Hooks",
    icon: "🪝",
    category: "Frontend & React Ecosystem",
    proficiency: 93,
    level: "Advanced",
    experience: "2+ Years",
    summary: "Reusable state hooks (useLocalStorage, useDebounce, useMediaQuery, useAudioSynth).",
    usedIn: [
      { name: "Spotify Bollywood", url: "/demos/spotify-bollywood" },
      { name: "TaskMaster Pro", url: "/demos/taskmaster-pro" },
    ],
  },

  // --- Web APIs & Architecture ---
  {
    name: "Web Audio API",
    icon: "🎵",
    category: "Web APIs & Architecture",
    proficiency: 90,
    level: "Specialist",
    experience: "2+ Years",
    summary: "Real-time harmonic synthesizer, OscillatorNode, GainNode envelope, and synchronized audio playback.",
    usedIn: [
      { name: "Spotify Bollywood", url: "/demos/spotify-bollywood" },
    ],
  },
  {
    name: "RESTful APIs & Fetch",
    icon: "🔌",
    category: "Web APIs & Architecture",
    proficiency: 92,
    level: "Advanced",
    experience: "2+ Years",
    summary: "JSON data consumption, async/await pipelines, error handling boundaries, and caching layers.",
    usedIn: [
      { name: "Weather Dashboard", url: "/demos/weather-dashboard" },
      { name: "Currency Converter", url: "/demos/currency-converter" },
    ],
  },
  {
    name: "LocalStorage API",
    icon: "💾",
    category: "Web APIs & Architecture",
    proficiency: 96,
    level: "Expert",
    experience: "3+ Years",
    summary: "Client-side relational persistence, schema serialization, JSON backups, and multi-tab sync.",
    usedIn: [
      { name: "TaskMaster Pro", url: "/demos/taskmaster-pro" },
      { name: "Inventory System", url: "/demos/inventory-system" },
    ],
  },
  {
    name: "Core Web Vitals & Perf",
    icon: "🚀",
    category: "Web APIs & Architecture",
    proficiency: 94,
    level: "Specialist",
    experience: "2+ Years",
    summary: "FCP/LCP/CLS tuning, preloading, asset compression, tree-shaking, and Lighthouse 95+ score delivery.",
    usedIn: [
      { name: "Official Portfolio", url: "/" },
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
    ],
  },
  {
    name: "Responsive Fluid Design",
    icon: "📱",
    category: "Web APIs & Architecture",
    proficiency: 98,
    level: "Master",
    experience: "3+ Years",
    summary: "Mobile-first layouts tested across Safari iOS, Android Chrome, tablet foldables, and ultra-wide screens.",
    usedIn: [
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
      { name: "Travel Website", url: "/demos/travel-website" },
    ],
  },

  // --- Developer Tools & Cloud ---
  {
    name: "Git & GitHub Versioning",
    icon: "🐙",
    category: "Developer Tools & Cloud",
    proficiency: 92,
    level: "Advanced",
    experience: "3+ Years",
    summary: "Branching strategies, atomic commits, pull request workflows, and repository management.",
    usedIn: [
      { name: "GitHub Repository", url: "https://github.com/PrathamPanchal26" },
    ],
  },
  {
    name: "Vercel Cloud Deployment",
    icon: "▲",
    category: "Developer Tools & Cloud",
    proficiency: 94,
    level: "Advanced",
    experience: "2+ Years",
    summary: "Continuous deployment (CI/CD), rewrite rules, cache control headers, and zero-downtime rollouts.",
    usedIn: [
      { name: "Production Deployment", url: "/" },
    ],
  },
  {
    name: "Chrome DevTools & Debugging",
    icon: "🛠️",
    category: "Developer Tools & Cloud",
    proficiency: 90,
    level: "Advanced",
    experience: "3+ Years",
    summary: "Performance profiling, memory leak tracking, network waterfall inspection, and CSS grid inspectors.",
    usedIn: [
      { name: "Portfolio & Demos", url: "/projects" },
    ],
  },
  {
    name: "Tech Content & Dev Education",
    icon: "🎥",
    category: "Developer Tools & Cloud",
    proficiency: 95,
    level: "Expert",
    experience: "Active Creator",
    summary: "Video coding tutorials, 60s dev reels, architecture breakdowns, and open-source engineering resources on YouTube & Instagram.",
    usedIn: [
      { name: "YouTube (@prathamcodingworld)", url: "https://youtube.com/@prathamcodingworld?si=xZ94QAp_jyFStvts" },
      { name: "Instagram (@devbypratham)", url: "https://www.instagram.com/devbypratham?vrfl=MTV2cmMzeGN3czV1eQ==" },
    ],
  },
  {
    name: "WordPress & Headless CMS",
    icon: "📝",
    category: "Developer Tools & Cloud",
    proficiency: 88,
    level: "Proficient",
    experience: "2+ Years",
    summary: "Custom themes, plugins, content workflows, and headless REST endpoints for corporate clients.",
    usedIn: [
      { name: "Client CMS Work", url: "/contact" },
    ],
  },

  // --- UI/UX & Creative ---
  {
    name: "UI/UX Architecture & Flow",
    icon: "🎯",
    category: "UI/UX & Creative Design",
    proficiency: 94,
    level: "Expert",
    experience: "3+ Years",
    summary: "Design systems, typography scale, micro-interactions, accessibility (WCAG), and visual hierarchy.",
    usedIn: [
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
      { name: "Portfolio Redesign", url: "/" },
    ],
  },
  {
    name: "Figma Prototyping",
    icon: "🖼️",
    category: "UI/UX & Creative Design",
    proficiency: 88,
    level: "Advanced",
    experience: "2+ Years",
    summary: "Wireframes, high-fidelity prototypes, component design variants, and client presentations.",
    usedIn: [
      { name: "Kanha Construction", url: "/demos/kanha-portfolio" },
    ],
  },
  {
    name: "Technical SEO & Schema",
    icon: "🔍",
    category: "UI/UX & Creative Design",
    proficiency: 96,
    level: "Master",
    experience: "3+ Years",
    summary: "JSON-LD structured data, Google Knowledge Graph, FAQPage rich results, sitemaps, and local Ahmedabad SEO.",
    usedIn: [
      { name: "Official Portfolio", url: "/" },
      { name: "Insights Guide", url: "/insights" },
    ],
  },
];

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchCat =
        selectedCategory === "All Skills" || skill.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.summary.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="page skills-page">
      {/* Page Header */}
      <div className="section-header">
        <div className="section-tag">Interactive Technical Competencies</div>
        <h2>Engineering Stack &amp; Skill Matrix</h2>
        <p>
          Technologies, frameworks, and modern tools engineered by <strong>Pratham Panchal</strong> in Ahmedabad, India.
          Filter by category, inspect live code snippets, and explore real implementations.
        </p>
        <div className="divider"></div>
      </div>

      {/* Stats Bar */}
      <div className="skills-overview-stats">
        <div className="skill-stat-box">
          <span className="stat-num">19+</span>
          <span className="stat-lbl">Core Competencies</span>
        </div>
        <div className="skill-stat-box">
          <span className="stat-num">95%</span>
          <span className="stat-lbl">Avg Proficiency</span>
        </div>
        <div className="skill-stat-box">
          <span className="stat-num">9+</span>
          <span className="stat-lbl">Live React Apps</span>
        </div>
        <div className="skill-stat-box">
          <span className="stat-num">100%</span>
          <span className="stat-lbl">Lighthouse Best Practices</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="skills-filter-toolbar">
        <div className="skills-cat-tabs">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`skills-tab-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-search-bar">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="skills-input-field"
            placeholder="Search skills, tools, hooks, APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter skills list"
          />
          {searchQuery && (
            <button
              type="button"
              className="skills-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear skill search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="skills-matrix-grid">
        {filteredSkills.length === 0 ? (
          <div className="skills-empty-notice">
            <span>🔍</span>
            <h4>No skills found matching "{searchQuery}"</h4>
            <p>Try searching for "React", "CSS", "Audio", "API", or select a category tab.</p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory("All Skills");
                setSearchQuery("");
              }}
            >
              View All Skills
            </button>
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <div className="skill-matrix-card" key={skill.name}>
              <div className="skill-card-top">
                <span className="skill-avatar">{skill.icon}</span>
                <div className="skill-title-block">
                  <h3 className="skill-title-name">{skill.name}</h3>
                  <span className="skill-category-tag">{skill.category}</span>
                </div>
                <div className="skill-badge-level">{skill.level}</div>
              </div>

              {/* Animated Proficiency Bar */}
              <div className="skill-progress-wrap">
                <div className="skill-progress-meta">
                  <span className="progress-label">Proficiency</span>
                  <span className="progress-percent">{skill.proficiency}%</span>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-bar"
                    style={{ width: `${skill.proficiency}%` }}
                    role="progressbar"
                    aria-valuenow={skill.proficiency}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <p className="skill-summary-text">{skill.summary}</p>

              {/* Used In Project Pills */}
              {skill.usedIn && skill.usedIn.length > 0 && (
                <div className="skill-used-in">
                  <span className="used-label">Implemented in:</span>
                  <div className="used-pills">
                    {skill.usedIn.map((proj, pIdx) => (
                      proj.url.startsWith("http") ? (
                        <a
                          key={pIdx}
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="used-project-pill"
                        >
                          {proj.name} ↗
                        </a>
                      ) : (
                        <Link
                          key={pIdx}
                          to={proj.url}
                          className="used-project-pill"
                        >
                          {proj.name} →
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom CTA for Project Discussion */}
      <section className="skills-cta-banner">
        <h3>Have a Specific Technology Requirement?</h3>
        <p>
          Pratham specializes in React 19, custom CSS architecture, responsive design, and sub-second web performance for clients across Ahmedabad and internationally.
        </p>
        <div className="skills-cta-btns">
          <Link to="/contact" className="btn btn-primary">
            Hire Pratham Panchal
          </Link>
          <Link to="/projects" className="btn btn-outline">
            Browse All 9 Live Applications
          </Link>
          <Link to="/insights" className="btn btn-secondary">
            Read Architectural Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Skills;
