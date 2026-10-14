import React, { useState, useMemo } from "react";

const projects = [
  {
    emoji: "📝",
    title: "TaskMaster Pro",
    categoryGroup: "Full Stack",
    category: "Full-Stack & Productivity",
    description:
      "A complete task & project management application inspired by MERN architecture with local persistence, category taxonomies, priority queues, search filtering, and sprint analytics.",
    tags: ["React", "Full Stack", "State Management", "LocalStorage", "Productivity"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/taskmaster-pro",
    featured: true,
    highlights: [
      "Real-time task addition, status toggle, inline editing, and deletion",
      "Dynamic filtering by status (All, Active, Completed, Urgent) and category",
      "Persistent client-side storage with zero loss on refresh",
      "Real-time productivity gauge and completion rate calculator",
    ],
    architecture: "React Hooks (useState, useMemo, useEffect) · LocalStorage API · Modular Component Hierarchy",
  },
  {
    emoji: "🏛️",
    title: "Kanha Construction",
    categoryGroup: "Creative & Media",
    category: "Architecture",
    description:
      "Premium architectural design, structural engineering, and turnkey interior solutions studio based in Nikol, Ahmedabad. Features full project galleries, categorization, and inquiry consultation.",
    tags: ["React", "Turnkey Construction", "Architecture", "Interior Design"],
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
    live: "/demos/kanha-portfolio",
    featured: true,
    highlights: [
      "Turnkey structural civil engineering and 3D interior design galleries",
      "Direct project estimation and inquiry consultation modal",
      "Interactive category filtering for Residential, Commercial & Industrial",
      "Designed for high-trust client acquisition with high visual polish",
    ],
    architecture: "React SPA · Component-driven UI · Mobile-first fluid CSS grid system",
  },
  {
    emoji: "🔐",
    title: "Kanha Admin Portal",
    categoryGroup: "Admin & Dashboards",
    category: "Admin & Security",
    description:
      "Restricted administrator dashboard for Kanha Construction & Interior. Features security PIN authentication (admin / 1234), project CMS publisher, leads tracker, and profile telemetry.",
    tags: ["React", "Admin CMS", "Dashboard", "Security"],
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
    live: "/demos/kanha-admin",
    featured: true,
    highlights: [
      "Role-based security PIN lock screen with automated session validation",
      "Project content management system with instant preview publishing",
      "Live inquiry lead pipeline tracker with status tags",
      "Telemetry stat widgets for views, conversions, and inquiries",
    ],
    architecture: "State-driven auth guard · Dynamic dashboard routing · Real-time CRUD state",
  },
  {
    emoji: "🎵",
    title: "Spotify Bollywood",
    categoryGroup: "Creative & Media",
    category: "Audio Streaming",
    description:
      "A Spotify-inspired Bollywood web player with real audio synthesis, trending Hindi tracks (Arijit Singh, Jubin Nautiyal), synchronized lyrics, playlists, and seekbar.",
    tags: ["React", "Web Audio API", "Spotify UI", "Bollywood"],
    github: "https://github.com/PrathamPanchal26/music-",
    live: "/demos/spotify-bollywood",
    featured: true,
    highlights: [
      "Browser Web Audio API harmonic synthesis generating real melodic musical tones",
      "Interactive playback controls: play, pause, seek, volume, next/previous tracks",
      "Synchronized real-time lyric highlights that track musical progression",
      "Faithful dark-mode Spotify UI with sidebar navigation and playlists",
    ],
    architecture: "Web Audio API Oscillators & Gain Nodes · React audio lifecycle · Responsive media bar",
  },
  {
    emoji: "📦",
    title: "Inventory System",
    categoryGroup: "Admin & Dashboards",
    category: "Enterprise",
    description:
      "A barcode-based cloth inventory management app that tracks warehouse stock, simulates barcode gun scanning, generates reports, and streamlines dispatch.",
    tags: ["React", "JavaScript", "CSS", "Enterprise"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/inventory-system",
    highlights: [
      "Simulated laser barcode gun audio feedback and automatic SKU lookup",
      "Inventory batch tracking, quantity thresholds, and low-stock alerts",
      "Automated dispatch reporting and stock adjustment log",
    ],
    architecture: "In-memory inventory index · Barcode SKU parser · Real-time ledger updates",
  },
  {
    emoji: "🛒",
    title: "E-Commerce UI",
    categoryGroup: "Fintech & Retail",
    category: "Retail",
    description:
      "A fully responsive e-commerce storefront with product catalog, category filters, interactive shopping cart drawer, promo code discounts, and checkout flow.",
    tags: ["React", "Tailwind CSS", "JavaScript", "E-Commerce"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/ecommerce-ui",
    highlights: [
      "Slide-out interactive cart drawer with real-time tax and shipping calculation",
      "Discount promo code engine with validation feedback",
      "Product filtering by price, category, and availability rating",
    ],
    architecture: "Cart context state · Dynamic subtotal calculation · Modern checkout UX",
  },
  {
    emoji: "🌦️",
    title: "Weather Dashboard",
    categoryGroup: "Fintech & Retail",
    category: "Data Viz",
    description:
      "A real-time meteorological dashboard showing current weather, multi-city tracking (Mumbai, London, NY, Tokyo), 24-hr hourly timeline, and 5-day forecasts.",
    tags: ["React", "API", "Chart.js", "Weather"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/weather-dashboard",
    highlights: [
      "Multi-city atmospheric telemetry tracking with temperature toggle (°C / °F)",
      "Interactive 24-hour hourly trend visualizer with weather condition icons",
      "Detailed metrics: Humidity, UV Index, Wind Speed, Visibility and Air Quality",
    ],
    architecture: "REST Weather data simulation · Dynamic SVG telemetry charts · Geo-presets",
  },
  {
    emoji: "💱",
    title: "Currency Converter",
    categoryGroup: "Fintech & Retail",
    category: "Fintech",
    description:
      "A real-time currency conversion app with live exchange rates for 150+ currencies, swap functionality, quick conversion chips, and popular rate comparison.",
    tags: ["React", "API", "JavaScript", "Fintech"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/currency-converter",
    highlights: [
      "Instant dual-direction currency exchange calculator with 1-click swap button",
      "Pre-configured popular conversion quick-chips (USD/INR, EUR/INR, GBP/USD)",
      "High-precision floating math with financial formatting",
    ],
    architecture: "Real-time rate ratio matrix · Debounced input math · Mobile keypad friendly",
  },
  {
    emoji: "✈️",
    title: "Travel Website",
    categoryGroup: "Creative & Media",
    category: "Hospitality",
    description:
      "A modern travel booking UI with destination cards, search filters, travelers calculator, and clean responsive layout for seamless holiday planning.",
    tags: ["HTML", "CSS", "JavaScript", "Travel"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/travel-website",
    highlights: [
      "Curated travel package explorer with ratings, pricing, and duration tags",
      "Destination search filter by budget and travel group size",
      "Hero booking banner with destination and travel date selector",
    ],
    architecture: "Modular UI components · Fluid CSS grid · Semantic responsive layout",
  },
];

const CATEGORIES = [
  "All",
  "Featured",
  "Full Stack",
  "Admin & Dashboards",
  "Creative & Media",
  "Fintech & Retail",
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (activeCategory === "Featured" && !project.featured) return false;
      if (
        activeCategory !== "All" &&
        activeCategory !== "Featured" &&
        project.categoryGroup !== activeCategory
      ) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inDesc = project.description.toLowerCase().includes(query);
        const inTags = project.tags.some((t) => t.toLowerCase().includes(query));
        const inCategory = project.category.toLowerCase().includes(query);
        if (!inTitle && !inDesc && !inTags && !inCategory) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Interactive Portfolio</div>
        <h2>Projects &amp; Live Demos</h2>
        <p>
          Every project below is a functional, interactive web application. Click{" "}
          <strong>Live Demo ↗</strong> to launch directly in your browser.
        </p>
        <div className="divider"></div>
      </div>

      {/* Projects Showcase Metrics */}
      <div className="projects-metrics-bar">
        <div className="metric-pill">
          <span className="metric-num">{projects.length}</span>
          <span className="metric-label">Total Applications</span>
        </div>
        <div className="metric-pill">
          <span className="metric-num">100%</span>
          <span className="metric-label">Live In-Browser</span>
        </div>
        <div className="metric-pill">
          <span className="metric-num">React 19</span>
          <span className="metric-label">Core Tech Stack</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="projects-toolbar">
        {/* Search Input */}
        <div className="projects-search-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="projects-search-input"
            placeholder="Search projects by name, technology (e.g. React, Audio, API)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="projects-filter-bar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : cat === "Featured"
                ? projects.filter((p) => p.featured).length
                : projects.filter((p) => p.categoryGroup === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`projects-filter-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
              >
                {cat === "Featured" ? "⭐ " : ""}
                {cat} <span className="cat-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="projects-empty-state">
          <div className="empty-emoji">🔍</div>
          <h3>No matching projects found</h3>
          <p>
            No projects matched "<strong>{searchQuery}</strong>" in the selected category.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={project.title}>
              <div className="project-card-top">
                <div className="project-emoji">{project.emoji}</div>
                <div className="project-card-badges">
                  {project.featured && (
                    <span className="badge-featured">⭐ FEATURED</span>
                  )}
                  <span className="project-index">0{index + 1}</span>
                </div>
              </div>

              <h3>{project.title}</h3>

              <p className="project-category-sub">{project.category}</p>
              <p className="project-desc-text">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-card-footer">
                <button
                  type="button"
                  className="project-quickview-btn"
                  onClick={() => setSelectedModalProject(project)}
                >
                  Quick Overview ℹ️
                </button>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                    title="View Source on GitHub"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link project-link-live"
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Overview Modal */}
      {selectedModalProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedModalProject(null)}
        >
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedModalProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-emoji">{selectedModalProject.emoji}</span>
              <div>
                <span className="modal-category">{selectedModalProject.category}</span>
                <h3 id="modal-title">{selectedModalProject.title}</h3>
              </div>
            </div>

            <p className="modal-description">{selectedModalProject.description}</p>

            {selectedModalProject.highlights && (
              <div className="modal-section">
                <h4>Key Features &amp; Capabilities</h4>
                <ul className="modal-features-list">
                  {selectedModalProject.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedModalProject.architecture && (
              <div className="modal-section">
                <h4>Technical Architecture</h4>
                <p className="modal-architecture-text">
                  {selectedModalProject.architecture}
                </p>
              </div>
            )}

            <div className="modal-section">
              <h4>Technologies</h4>
              <div className="project-tags">
                {selectedModalProject.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={selectedModalProject.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Launch Live Demo ↗
              </a>
              <a
                href={selectedModalProject.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View GitHub Code ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
