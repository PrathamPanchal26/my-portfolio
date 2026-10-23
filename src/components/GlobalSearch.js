import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SEARCH_DATABASE = [
  // --- Pages ---
  {
    id: "page-home",
    type: "Pages",
    icon: "🏠",
    title: "Home — Pratham Panchal Portfolio",
    description: "Welcome page with hero introduction, services, featured apps, project cost estimator, and client testimonials.",
    path: "/",
    keywords: ["home", "main", "intro", "hero", "overview", "pratham panchal", "frontend developer"],
  },
  {
    id: "page-about",
    type: "Pages",
    icon: "👤",
    title: "About Pratham Panchal",
    description: "Background, professional experience, IT diploma education, design philosophy, and client testimonials in Ahmedabad.",
    path: "/about",
    keywords: ["about", "bio", "experience", "education", "background", "ahmedabad", "gujarat", "diploma"],
  },
  {
    id: "page-skills",
    type: "Pages",
    icon: "⚡",
    title: "Skills & Technical Stack",
    description: "Comprehensive list of frontend skills: React, JavaScript ES6+, Tailwind CSS, Bootstrap, Git, Vercel, and UI/UX.",
    path: "/skills",
    keywords: ["skills", "technologies", "tech stack", "languages", "tools", "react", "javascript", "css"],
  },
  {
    id: "page-projects",
    type: "Pages",
    icon: "💼",
    title: "Projects & Live Applications",
    description: "Explore 9 in-browser interactive applications including Kanha Construction, TaskMaster Pro, and Spotify Bollywood.",
    path: "/projects",
    keywords: ["projects", "work", "portfolio", "demos", "applications", "apps", "code", "showcase"],
  },
  {
    id: "page-contact",
    type: "Pages",
    icon: "📬",
    title: "Contact & Hire Pratham",
    description: "Direct contact form, phone +91 9638561264, WhatsApp link, and email prathampanchal1515@gmail.com.",
    path: "/contact",
    keywords: ["contact", "hire", "email", "phone", "whatsapp", "reach", "freelance", "message", "call", "schedule"],
  },
  {
    id: "page-insights",
    type: "Pages",
    icon: "📖",
    title: "Engineering Insights & Case Studies",
    description: "Deep dive technical case studies on Kanha Construction 99 Lighthouse score, Web Audio API synthesis, React state, and Google SEO.",
    path: "/insights",
    keywords: ["insights", "articles", "case studies", "blogs", "architecture", "lighthouse", "web audio", "seo", "technical"],
  },

  // --- Projects & Live Demos ---
  {
    id: "proj-kanha",
    type: "Projects",
    icon: "🏛️",
    title: "Kanha Construction & Interior",
    description: "Commercial architectural civil design and interior solutions studio website in Nikol, Ahmedabad.",
    path: "/demos/kanha-portfolio",
    isExternalOrDemo: true,
    keywords: ["kanha", "construction", "interior", "architecture", "nikol", "civil", "studio", "real estate"],
  },
  {
    id: "proj-kanha-admin",
    type: "Projects",
    icon: "🔐",
    title: "Kanha Admin Portal CMS",
    description: "Security PIN authenticated management dashboard (PIN: admin / 1234) for publishing projects and tracking leads.",
    path: "/demos/kanha-admin",
    isExternalOrDemo: true,
    keywords: ["admin", "kanha admin", "cms", "portal", "pin", "auth", "dashboard", "leads"],
  },
  {
    id: "proj-taskmaster",
    type: "Projects",
    icon: "📝",
    title: "TaskMaster Pro Productivity Suite",
    description: "MERN-style project management app with priority queues, category taxonomies, and persistent sprint analytics.",
    path: "/demos/taskmaster-pro",
    isExternalOrDemo: true,
    keywords: ["taskmaster", "tasks", "todo", "kanban", "productivity", "management", "sprint", "planner"],
  },
  {
    id: "proj-spotify",
    type: "Projects",
    icon: "🎵",
    title: "Spotify Bollywood Music Player",
    description: "Audio streaming simulator with browser Web Audio API melodic synthesizer, Bollywood tracks, and synchronized lyrics.",
    path: "/demos/spotify-bollywood",
    isExternalOrDemo: true,
    keywords: ["spotify", "bollywood", "music", "audio", "songs", "sound", "player", "web audio"],
  },
  {
    id: "proj-inventory",
    type: "Projects",
    icon: "📦",
    title: "Cloth Inventory Management System",
    description: "Barcode-based warehouse inventory application with simulated laser scanner and stock replenishment tracking.",
    path: "/demos/inventory-system",
    isExternalOrDemo: true,
    keywords: ["inventory", "warehouse", "barcode", "cloth", "scanner", "stock", "dispatch"],
  },
  {
    id: "proj-ecommerce",
    type: "Projects",
    icon: "🛒",
    title: "E-Commerce UI Platform",
    description: "Responsive shopping storefront with product filtering, slide-out cart drawer, and interactive checkout flow.",
    path: "/demos/ecommerce-ui",
    isExternalOrDemo: true,
    keywords: ["ecommerce", "store", "shop", "cart", "checkout", "retail", "products"],
  },
  {
    id: "proj-weather",
    type: "Projects",
    icon: "🌦️",
    title: "Real-Time Weather Dashboard",
    description: "Meteorological telemetry tracking Mumbai, London, NY, Tokyo with 24-hr timeline and 5-day forecasts.",
    path: "/demos/weather-dashboard",
    isExternalOrDemo: true,
    keywords: ["weather", "forecast", "dashboard", "meteo", "temperature", "climate", "cities"],
  },
  {
    id: "proj-currency",
    type: "Projects",
    icon: "💱",
    title: "Global Currency Converter",
    description: "Dual-direction financial exchange rate calculator supporting 150+ international currencies with quick chips.",
    path: "/demos/currency-converter",
    isExternalOrDemo: true,
    keywords: ["currency", "exchange", "money", "converter", "rates", "usd", "inr", "eur", "forex"],
  },
  {
    id: "proj-travel",
    type: "Projects",
    icon: "✈️",
    title: "Travel Website & Booking UI",
    description: "Modern vacation package explorer with budget filtering and trip booking layout.",
    path: "/demos/travel-website",
    isExternalOrDemo: true,
    keywords: ["travel", "tourism", "vacation", "booking", "destinations", "holidays", "flights"],
  },

  // --- Skills & Stack ---
  {
    id: "skill-react",
    type: "Skills",
    icon: "⚛️",
    title: "React.js & Modern Component Architecture",
    description: "React 18 & 19, functional components, custom hooks, context state management, and reusable UI structures.",
    path: "/skills",
    keywords: ["react", "react.js", "jsx", "hooks", "components", "state", "props", "virtual dom"],
  },
  {
    id: "skill-javascript",
    type: "Skills",
    icon: "⚡",
    title: "JavaScript (ES6+) & Web APIs",
    description: "Async/await, promises, modern DOM manipulation, Web Audio API, LocalStorage, and RESTful API integrations.",
    path: "/skills",
    keywords: ["javascript", "js", "es6", "vanilla js", "async", "api", "web audio", "dom"],
  },
  {
    id: "skill-tailwind",
    type: "Skills",
    icon: "🎨",
    title: "Tailwind CSS & Modern CSS3",
    description: "Responsive layouts, Flexbox, CSS Grid, custom properties (variables), fluid typography, and dark/light themes.",
    path: "/skills",
    keywords: ["css", "css3", "tailwind", "responsive", "grid", "flexbox", "styling", "design system"],
  },
  {
    id: "skill-git",
    type: "Skills",
    icon: "🐙",
    title: "Git, GitHub & Vercel Deployment",
    description: "Version control, branching workflows, continuous deployment, and production hosting on Vercel.",
    path: "/skills",
    keywords: ["git", "github", "vercel", "deploy", "ci/cd", "version control", "hosting"],
  },

  // --- Quick Actions ---
  {
    id: "act-resume",
    type: "Quick Actions",
    icon: "📄",
    title: "Open Interactive Resume / CV",
    description: "View ATS-optimized resume online with instant print, PDF export, and download options.",
    action: "open-resume",
    keywords: ["resume", "cv", "curriculum vitae", "pdf", "download", "profile", "qualifications"],
  },
  {
    id: "act-whatsapp",
    type: "Quick Actions",
    icon: "💬",
    title: "Chat with Pratham on WhatsApp",
    description: "Instant direct WhatsApp communication (+91 9638561264) for rapid project inquiries.",
    action: "whatsapp",
    keywords: ["whatsapp", "chat", "message", "instant", "text", "talk", "fast"],
  },
  {
    id: "act-estimator",
    type: "Quick Actions",
    icon: "🧮",
    title: "Open Project Cost & Timeline Estimator",
    description: "Interactive calculator on Home page to customize web project tiers, timeline, and budget.",
    action: "scroll-estimator",
    keywords: ["estimate", "calculator", "cost", "price", "budget", "quote", "timeline", "rates"],
  },
  {
    id: "act-terminal",
    type: "Quick Actions",
    icon: "💻",
    title: "Open Interactive DevTerminal CLI",
    description: "Launch built-in developer terminal with interactive commands: help, skills, projects, contact, clear.",
    action: "open-terminal",
    keywords: ["terminal", "cli", "command", "bash", "developer", "console", "matrix", "easter egg"],
  },
  {
    id: "act-theme",
    type: "Quick Actions",
    icon: "🌗",
    title: "Toggle Dark / Light Mode Theme",
    description: "Switch website appearance between sleek dark mode and radiant light mode.",
    action: "toggle-theme",
    keywords: ["theme", "dark", "light", "mode", "color", "contrast", "appearance"],
  },

  // --- Frequently Asked Questions ---
  {
    id: "faq-who",
    type: "FAQ",
    icon: "❓",
    title: "Who is Pratham Panchal?",
    description: "Frontend Developer & React Specialist based in Ahmedabad, Gujarat, India with client delivery experience.",
    path: "/#faq",
    action: "scroll-faq",
    keywords: ["who is", "background", "ahmedabad developer", "developer in ahmedabad", "bio"],
  },
  {
    id: "faq-rates",
    type: "FAQ",
    icon: "💰",
    title: "What are Pratham's freelance rates & availability?",
    description: "Flexible per-project and milestone-based pricing with transparent turnaround times under 2-3 weeks.",
    path: "/#faq",
    action: "scroll-faq",
    keywords: ["rates", "pricing", "cost", "availability", "hire", "freelance cost"],
  },
  {
    id: "faq-kanha",
    type: "FAQ",
    icon: "🏛️",
    title: "What is Kanha Construction & Interior?",
    description: "A flagship turnkey architecture and interior studio project engineered by Pratham Panchal.",
    path: "/#faq",
    action: "scroll-faq",
    keywords: ["kanha construction", "what is kanha", "client project", "architecture site"],
  },
];

const POPULAR_SEARCHES = [
  "React",
  "Kanha Construction",
  "Resume",
  "WhatsApp",
  "Project Estimator",
  "Dev Terminal",
  "Ahmedabad",
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const inputRef = useRef(null);
  const resultsListRef = useRef(null);

  // Listen for global shortcut (Ctrl+K, Cmd+K, or '/')
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing inside an input or textarea (unless Cmd+K)
      const isInput =
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-site-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-site-search", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
      document.body.classList.add("search-modal-open");
    } else {
      document.body.classList.remove("search-modal-open");
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_DATABASE.slice(0, 8); // show initial popular items
    }
    const q = query.toLowerCase().trim();
    return SEARCH_DATABASE.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchType = item.type.toLowerCase().includes(q);
      const matchKeyword = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchType || matchKeyword;
    });
  }, [query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Handle keyboard navigation inside search modal
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsListRef.current) {
      const activeEl = resultsListRef.current.querySelector(".search-result-item.active");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleSelectItem = (item) => {
    setIsOpen(false);

    if (item.action === "open-resume") {
      window.dispatchEvent(new CustomEvent("open-resume-modal"));
    } else if (item.action === "whatsapp") {
      window.open(
        "https://wa.me/919638561264?text=Hi%20Pratham,%20I%20found%20your%20portfolio%20via%20search%20and%20would%20like%20to%20connect!",
        "_blank"
      );
    } else if (item.action === "open-terminal") {
      window.dispatchEvent(new CustomEvent("toggle-dev-terminal"));
    } else if (item.action === "toggle-theme") {
      toggleTheme();
    } else if (item.action === "scroll-estimator") {
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById("project-estimator-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.getElementById("project-estimator-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.action === "scroll-faq") {
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById("faq-knowledge-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.getElementById("faq-knowledge-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="global-search-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search all website"
    >
      <div
        className="global-search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="search-input-wrapper">
          <span className="search-symbol" aria-hidden="true">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            className="search-main-input"
            placeholder="Search pages, projects, skills, resume, actions... (or press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            aria-label="Search site input"
          />
          {query ? (
            <button
              type="button"
              className="search-reset-btn"
              onClick={() => setQuery("")}
              aria-label="Clear query"
            >
              ✕
            </button>
          ) : (
            <kbd className="search-key-badge">ESC</kbd>
          )}
        </div>

        {/* Popular chips if query is empty */}
        {!query && (
          <div className="search-popular-strip">
            <span className="popular-label">Popular searches:</span>
            <div className="popular-chips">
              {POPULAR_SEARCHES.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="search-chip"
                  onClick={() => setQuery(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        <div className="search-results-list" ref={resultsListRef}>
          {filteredResults.length === 0 ? (
            <div className="search-empty-state">
              <span className="empty-emoji">🔎</span>
              <p className="empty-title">No matching results for "{query}"</p>
              <p className="empty-hint">
                Try searching for <strong>React</strong>, <strong>Kanha</strong>, <strong>Resume</strong>, or <strong>Ahmedabad</strong>.
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`search-result-item ${isSelected ? "active" : ""}`}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="result-icon-box">{item.icon}</div>
                  <div className="result-info">
                    <div className="result-top-line">
                      <span className="result-title">{item.title}</span>
                      <span className="result-type-tag">{item.type}</span>
                    </div>
                    <p className="result-desc">{item.description}</p>
                  </div>
                  <div className="result-action-indicator">
                    <span>↵</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="search-modal-footer">
          <div className="footer-keys">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate
            </span>
            <span>
              <kbd>↵</kbd> Select
            </span>
            <span>
              <kbd>ESC</kbd> Close
            </span>
          </div>
          <span className="footer-brand">
            Pratham Panchal · <strong>Ahmedabad, India</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
