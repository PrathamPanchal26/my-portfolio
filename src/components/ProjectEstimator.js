import React, { useState } from "react";

const PROJECT_TYPES = [
  { id: "landing", label: "Landing Page / Portfolio", baseDays: 3, baseInr: 8000, baseUsd: 120 },
  { id: "business", label: "Business / Studio Website", baseDays: 6, baseInr: 18000, baseUsd: 260 },
  { id: "webapp", label: "Custom React Web Application", baseDays: 12, baseInr: 35000, baseUsd: 480 },
  { id: "ecommerce", label: "E-Commerce / Catalog Platform", baseDays: 14, baseInr: 42000, baseUsd: 580 },
  { id: "admin", label: "Admin CMS & Security Portal", baseDays: 10, baseInr: 28000, baseUsd: 380 }
];

const SCOPE_OPTIONS = [
  { id: "small", label: "1 — 3 Screens", mult: 1.0 },
  { id: "medium", label: "4 — 7 Screens", mult: 1.4 },
  { id: "large", label: "8+ Screens / Multi-page", mult: 1.9 }
];

const ADDONS = [
  { id: "seo", label: "Advanced SEO & Rich Snippets", inr: 4000, usd: 60, days: 1 },
  { id: "darkmode", label: "Theme Switcher (Dark/Light)", inr: 3000, usd: 40, days: 1 },
  { id: "cms", label: "CMS / Dynamic Content Engine", inr: 6000, usd: 85, days: 2 },
  { id: "fast", label: "Express Delivery (Priority Sprint)", inr: 5000, usd: 70, days: -2 }
];

function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
  const [selectedScope, setSelectedScope] = useState("small");
  const [selectedAddons, setSelectedAddons] = useState(["seo"]);
  const [currency, setCurrency] = useState("INR");

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const currentScope = SCOPE_OPTIONS.find((s) => s.id === selectedScope) || SCOPE_OPTIONS[0];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const baseCost = currency === "INR" ? currentType.baseInr : currentType.baseUsd;
  const scopeCost = baseCost * currentScope.mult;

  const addonsCost = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    if (!addon) return acc;
    return acc + (currency === "INR" ? addon.inr : addon.usd);
  }, 0);

  const totalCost = Math.round(scopeCost + addonsCost);

  let totalDays = Math.max(
    2,
    Math.round(
      currentType.baseDays * currentScope.mult +
        selectedAddons.reduce((acc, addonId) => {
          const addon = ADDONS.find((a) => a.id === addonId);
          return acc + (addon ? addon.days : 0);
        }, 0)
    )
  );

  const shareText = `Hi Pratham, I used your portfolio project estimator:
• Project: ${currentType.label}
• Scope: ${currentScope.label}
• Add-ons: ${selectedAddons.join(", ") || "None"}
• Estimated Budget: ${currency === "INR" ? "₹" : "$"}${totalCost.toLocaleString()}
• Estimated Timeline: ~${totalDays} days
I would love to discuss starting this project with you!`;

  const whatsappUrl = `https://wa.me/919638561264?text=${encodeURIComponent(shareText)}`;
  const emailUrl = `mailto:prathampanchal1515@gmail.com?subject=Project Inquiry - ${encodeURIComponent(currentType.label)}&body=${encodeURIComponent(shareText)}`;

  return (
    <section className="estimator-section" id="estimator">
      <div className="section-header-compact">
        <span className="section-tag-sm">Interactive Cost & Timeline Calculator</span>
        <h3>Estimate Your Project in 30 Seconds</h3>
        <p className="estimator-subtitle">
          Transparent, realistic estimates tailored for your custom website, web app, or frontend portal.
        </p>
      </div>

      <div className="estimator-container">
        <div className="estimator-controls">
          {/* Currency Toggle */}
          <div className="estimator-group">
            <div className="estimator-label-row">
              <label>Select Currency</label>
              <div className="currency-pill-toggle">
                <button
                  type="button"
                  className={currency === "INR" ? "active" : ""}
                  onClick={() => setCurrency("INR")}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  className={currency === "USD" ? "active" : ""}
                  onClick={() => setCurrency("USD")}
                >
                  $ USD
                </button>
              </div>
            </div>
          </div>

          {/* Project Type */}
          <div className="estimator-group">
            <label>1. Project Type</label>
            <div className="option-chips-grid">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`chip-btn ${selectedType === type.id ? "active" : ""}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="estimator-group">
            <label>2. Number of Pages / Complexity</label>
            <div className="scope-pills-row">
              {SCOPE_OPTIONS.map((scope) => (
                <button
                  key={scope.id}
                  type="button"
                  className={`scope-btn ${selectedScope === scope.id ? "active" : ""}`}
                  onClick={() => setSelectedScope(scope.id)}
                >
                  {scope.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="estimator-group">
            <label>3. Add-on Features & Enhancements</label>
            <div className="addons-grid">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    className={`addon-btn ${isSelected ? "active" : ""}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <span className="checkbox-indicator">{isSelected ? "✓" : "+"}</span>
                    <span className="addon-name">{addon.label}</span>
                    <span className="addon-price">
                      +{currency === "INR" ? "₹" : "$"}{currency === "INR" ? addon.inr : addon.usd}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Estimation Summary Box */}
        <div className="estimator-summary-card">
          <div className="summary-header">
            <h4>Estimated Investment</h4>
            <span className="estimate-badge">Instant Calculation</span>
          </div>

          <div className="price-display">
            <span className="currency-symbol">{currency === "INR" ? "₹" : "$"}</span>
            <span className="cost-number">{totalCost.toLocaleString()}</span>
            <span className="cost-suffix">estimated range</span>
          </div>

          <div className="summary-meta-list">
            <div className="meta-row">
              <span>⏱️ Estimated Delivery:</span>
              <strong>~{totalDays} business days</strong>
            </div>
            <div className="meta-row">
              <span>📱 Responsiveness:</span>
              <strong>100% Mobile & Desktop Ready</strong>
            </div>
            <div className="meta-row">
              <span>⚡ Performance Guarantee:</span>
              <strong>95+ Lighthouse Score</strong>
            </div>
            <div className="meta-row">
              <span>🛠️ Tech Stack:</span>
              <strong>React 19 / Modern JavaScript</strong>
            </div>
          </div>

          <div className="summary-cta-group">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp-quote"
            >
              💬 Inquire via WhatsApp
            </a>
            <a
              href={emailUrl}
              className="btn btn-email-quote"
            >
              ✉️ Email This Quote
            </a>
          </div>

          <p className="summary-footnote">
            *Final quote provided after detailed specification review. 100% code ownership included.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectEstimator;
