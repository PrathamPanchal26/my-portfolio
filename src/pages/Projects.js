import React, { useState } from "react";

const projects = [
  {
    emoji: "🏛️",
    title: "Kanha Construction",
    category: "Architecture",
    description:
      "Premium architectural design, structural engineering, and turnkey interior solutions studio based in Nikol, Ahmedabad. Features full project galleries, categorization, and inquiry consultation.",
    tags: ["React", "Turnkey Construction", "Architecture", "Interior Design"],
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
    live: "/demos/kanha-portfolio",
    featured: true,
  },
  {
    emoji: "🔐",
    title: "Kanha Admin Portal",
    category: "Admin & Security",
    description:
      "Restricted administrator dashboard for Kanha Construction & Interior. Features security PIN authentication (admin / 1234), project CMS publisher, leads tracker, and profile telemetry.",
    tags: ["React", "Admin CMS", "Dashboard", "Security"],
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
    live: "/demos/kanha-admin",
    featured: true,
  },
  {
    emoji: "🎵",
    title: "Spotify Bollywood",
    category: "Audio Streaming",
    description:
      "A Spotify-inspired Bollywood web player with real audio synthesis, trending Hindi tracks (Arijit Singh, Jubin Nautiyal), synchronized lyrics, playlists, and seekbar.",
    tags: ["React", "Web Audio API", "Spotify UI", "Bollywood"],
    github: "https://github.com/PrathamPanchal26/music-",
    live: "/demos/spotify-bollywood",
    featured: true,
  },
  {
    emoji: "📦",
    title: "Inventory System",
    category: "Enterprise",
    description:
      "A barcode-based cloth inventory management app that tracks warehouse stock, simulates barcode gun scanning, generates reports, and streamlines dispatch.",
    tags: ["React", "JavaScript", "CSS"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/inventory-system",
  },
  {
    emoji: "🛒",
    title: "E-Commerce UI",
    category: "Retail",
    description:
      "A fully responsive e-commerce storefront with product catalog, category filters, interactive shopping cart drawer, promo code discounts, and checkout flow.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/ecommerce-ui",
  },
  {
    emoji: "🌦️",
    title: "Weather Dashboard",
    category: "Data Viz",
    description:
      "A real-time meteorological dashboard showing current weather, multi-city tracking (Mumbai, London, NY, Tokyo), 24-hr hourly timeline, and 5-day forecasts.",
    tags: ["React", "API", "Chart.js"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/weather-dashboard",
  },
  {
    emoji: "💱",
    title: "Currency Converter",
    category: "Fintech",
    description:
      "A real-time currency conversion app with live exchange rates for 150+ currencies, swap functionality, quick conversion chips, and popular rate comparison.",
    tags: ["React", "API", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/currency-converter",
  },
  {
    emoji: "✈️",
    title: "Travel Website",
    category: "Hospitality",
    description:
      "A modern travel booking UI with destination cards, search filters, travelers calculator, and clean responsive layout for seamless holiday planning.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio",
    live: "/demos/travel-website",
  },
];

function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all"
    ? projects
    : filter === "featured"
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">My Work</div>
        <h2>Projects</h2>
        <p>A selection of projects I've built with passion and purpose. Click <strong>Live Demo</strong> to experience any live site!</p>
        <div className="divider"></div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: filter === "all" ? "var(--accent)" : "var(--bg-elevated)",
            color: filter === "all" ? "#ffffff" : "var(--text)",
            fontWeight: "600",
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setFilter("featured")}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: filter === "featured" ? "var(--accent)" : "var(--bg-elevated)",
            color: filter === "featured" ? "#ffffff" : "var(--text)",
            fontWeight: "600",
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          ⭐ New &amp; Featured ({projects.filter(p => p.featured).length})
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div className="project-card" key={project.title}>
            <div className="project-card-top">
              <div className="project-emoji">{project.emoji}</div>
              <span className="project-index">0{index + 1}</span>
            </div>
            <h3>
              {project.title}
              {project.featured && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    background: "rgba(224, 122, 61, 0.18)",
                    color: "var(--accent)",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    marginLeft: "8px",
                    verticalAlign: "middle",
                  }}
                >
                  NEW
                </span>
              )}
            </h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-link"
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                  borderColor: "var(--accent)",
                }}
              >
                Live Demo ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
