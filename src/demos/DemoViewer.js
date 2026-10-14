import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import KanhaPortfolioDemo from "./KanhaPortfolioDemo";
import KanhaAdminDemo from "./KanhaAdminDemo";
import SpotifyBollywoodDemo from "./SpotifyBollywoodDemo";
import InventorySystemDemo from "./InventorySystemDemo";
import TravelWebsiteDemo from "./TravelWebsiteDemo";
import CurrencyConverterDemo from "./CurrencyConverterDemo";
import EcommerceUiDemo from "./EcommerceUiDemo";
import WeatherDashboardDemo from "./WeatherDashboardDemo";
import TaskMasterDemo from "./TaskMasterDemo";
import "./demos.css";

const demoDirectory = {
  "taskmaster-pro": {
    title: "TaskMaster Pro Productivity Suite",
    category: "Full-Stack & Productivity",
    emoji: "📝",
    component: TaskMasterDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
  "kanha-portfolio": {
    title: "Kanha Construction & Interior",
    category: "Architecture & Construction",
    emoji: "🏛️",
    component: KanhaPortfolioDemo,
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
  },
  "kanha-admin": {
    title: "Kanha Admin Restricted Portal",
    category: "Admin CMS & Security",
    emoji: "🔐",
    component: KanhaAdminDemo,
    github: "https://github.com/PrathamPanchal26/kanha-constructions",
  },
  "spotify-bollywood": {
    title: "Spotify Bollywood Music Player",
    category: "Audio Streaming & Music",
    emoji: "🎵",
    component: SpotifyBollywoodDemo,
    github: "https://github.com/PrathamPanchal26/music-",
  },
  "inventory-system": {
    title: "Cloth Inventory & Barcode System",
    category: "Enterprise Inventory",
    emoji: "📦",
    component: InventorySystemDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
  "travel-website": {
    title: "WanderLuxe Travel Expeditions",
    category: "Travel & Hospitality",
    emoji: "✈️",
    component: TravelWebsiteDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
  "currency-converter": {
    title: "Universal Currency Exchange",
    category: "Fintech & API",
    emoji: "💱",
    component: CurrencyConverterDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
  "ecommerce-ui": {
    title: "Aurora Studio E-Commerce Store",
    category: "Retail & E-Commerce",
    emoji: "🛒",
    component: EcommerceUiDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
  "weather-dashboard": {
    title: "SkyPulse Real-Time Weather",
    category: "Meteorology & Data Viz",
    emoji: "🌦️",
    component: WeatherDashboardDemo,
    github: "https://github.com/PrathamPanchal26/my-portfolio",
  },
};

export default function DemoViewer() {
  const { demoId } = useParams();
  const navigate = useNavigate();

  const currentKey = demoDirectory[demoId] ? demoId : "kanha-portfolio";
  const demoMeta = demoDirectory[currentKey];
  const DemoComponent = demoMeta.component;

  const handleSwitchDemo = (e) => {
    navigate(`/demos/${e.target.value}`);
  };

  return (
    <div className="demo-viewer-root">
      {/* Floating Demo Top Toolbar */}
      <header className="demo-top-toolbar">
        <div className="demo-toolbar-left">
          <Link to="/projects" className="demo-back-btn">
            ← Back to Portfolio
          </Link>
          <span className="demo-live-badge">
            <span className="demo-pulse-dot"></span> LIVE DEMO
          </span>
          <div className="demo-title-info">
            <span className="demo-active-title">
              {demoMeta.emoji} {demoMeta.title}
            </span>
          </div>
        </div>

        <div className="demo-toolbar-right">
          <label htmlFor="demo-select" className="demo-switch-label">
            Switch Demo:
          </label>
          <select
            id="demo-select"
            className="demo-switch-select"
            value={currentKey}
            onChange={handleSwitchDemo}
          >
            <option value="taskmaster-pro">📝 TaskMaster Pro</option>
            <option value="kanha-portfolio">🏛️ Kanha Construction</option>
            <option value="kanha-admin">🔐 Kanha Admin Portal</option>
            <option value="spotify-bollywood">🎵 Spotify Bollywood</option>
            <option value="inventory-system">📦 Inventory System</option>
            <option value="ecommerce-ui">🛒 E-Commerce UI</option>
            <option value="weather-dashboard">🌦️ Weather Dashboard</option>
            <option value="currency-converter">💱 Currency Converter</option>
            <option value="travel-website">✈️ Travel Website</option>
          </select>

          <a
            href={demoMeta.github}
            target="_blank"
            rel="noreferrer"
            className="demo-source-btn"
          >
            GitHub Code ↗
          </a>
        </div>
      </header>

      {/* Main Demo Content */}
      <div className="demo-viewer-stage">
        <DemoComponent />
      </div>
    </div>
  );
}
