import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { INSIGHTS } from "../data/insightsData";

const CATEGORIES = [
  "All Insights",
  "Architecture & Case Studies",
  "Web APIs & Audio Engineering",
  "State Management & React",
  "Performance & Technical SEO",
];

function Insights() {
  const [selectedCategory, setSelectedCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredArticles = useMemo(() => {
    return INSIGHTS.filter((item) => {
      const matchesCat =
        selectedCategory === "All Insights" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return INSIGHTS.find((i) => i.featured) || INSIGHTS[0];
  }, []);

  const handleCopyArticleLink = (slug) => {
    const url = `${window.location.origin}/insights#${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="page insights-page">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag">Engineering Insights &amp; Case Studies</div>
        <h2>Technical Case Studies &amp; Architecture Deep Dives</h2>
        <p>
          In-depth architectural breakdowns, performance engineering, Web API experiments, and commercial case studies authored by <strong>Pratham Panchal</strong> in Ahmedabad, India.
        </p>
        <div className="divider"></div>
      </div>

      {/* Featured Case Study Hero Banner */}
      {featuredArticle && (
        <section className="featured-case-study-hero" aria-label="Featured Case Study">
          <div className="featured-hero-tag">★ Featured Commercial Case Study</div>
          <h3 className="featured-hero-title">{featuredArticle.title}</h3>
          <p className="featured-hero-desc">{featuredArticle.subtitle}</p>

          <div className="featured-metrics-row">
            {featuredArticle.metrics.map((m, idx) => (
              <div className="featured-metric-card" key={idx}>
                <span className="metric-val">{m.value}</span>
                <span className="metric-lbl">{m.label}</span>
                <span className="metric-tag">{m.highlight}</span>
              </div>
            ))}
          </div>

          <div className="featured-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveArticle(featuredArticle)}
            >
              📖 Read Full Case Study
            </button>
            {featuredArticle.demoUrl && (
              <Link to={featuredArticle.demoUrl} className="btn btn-secondary">
                🚀 Launch Live Demo
              </Link>
            )}
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => handleCopyArticleLink(featuredArticle.slug)}
            >
              {copiedLink ? "✓ Link Copied!" : "🔗 Share Case Study"}
            </button>
          </div>
        </section>
      )}

      {/* Controls Strip: Categories & Search */}
      <div className="insights-controls-strip">
        <div className="insights-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="insights-search-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="insights-search-input"
            placeholder="Search insights, code, topics, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search insights and case studies"
          />
          {searchQuery && (
            <button
              type="button"
              className="insights-clear-search"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="insights-grid">
        {filteredArticles.length === 0 ? (
          <div className="insights-empty-state">
            <span className="empty-icon">🔎</span>
            <h4>No articles matched your search</h4>
            <p>Try searching for terms like "React", "SEO", "Audio", "Lighthouse", or "State".</p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory("All Insights");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article className="insight-card" key={article.id}>
              <div className="insight-card-meta">
                <span className="insight-cat-badge">{article.category}</span>
                <span className="insight-read-time">{article.readTime}</span>
              </div>

              <h3 className="insight-card-title">
                <button
                  type="button"
                  className="insight-title-btn"
                  onClick={() => setActiveArticle(article)}
                >
                  {article.title}
                </button>
              </h3>

              <p className="insight-card-subtitle">{article.subtitle}</p>

              {/* Mini Metrics Pill Grid */}
              <div className="insight-mini-metrics">
                {article.metrics.slice(0, 2).map((m, idx) => (
                  <span className="mini-metric-pill" key={idx}>
                    <strong>{m.value}</strong> {m.label}
                  </span>
                ))}
              </div>

              {/* Tag Badges */}
              <div className="insight-tags-row">
                {article.tags.map((tag) => (
                  <span className="insight-tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="insight-card-footer">
                <button
                  type="button"
                  className="read-more-btn"
                  onClick={() => setActiveArticle(article)}
                >
                  Read Breakdown <span>→</span>
                </button>

                {article.demoUrl && (
                  <Link to={article.demoUrl} className="view-demo-link" title="Open live project">
                    Demo ↗
                  </Link>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* Commercial CTA Strip */}
      <section className="insights-hire-strip">
        <div className="hire-strip-content">
          <h3>Need Similar High-Performance Engineering for Your Business?</h3>
          <p>
            Whether building a commercial turnkey platform like Kanha Construction, an interactive Web API app, or ranking top in Google for Ahmedabad and global queries, let's talk.
          </p>
        </div>
        <div className="hire-strip-actions">
          <Link to="/contact" className="btn btn-primary">
            Hire Pratham Panchal
          </Link>
          <a
            href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20reviewed%20your%20technical%20case%20studies%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <span>💬</span> WhatsApp Direct
          </a>
        </div>
      </section>

      {/* In-Depth Article Reader Modal */}
      {activeArticle && (
        <div
          className="article-modal-backdrop"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div
            className="article-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="article-modal-header">
              <div className="modal-header-meta">
                <span className="insight-cat-badge">{activeArticle.category}</span>
                <span className="modal-date">Published: {activeArticle.date}</span>
                <span className="modal-author">By {activeArticle.author} · Ahmedabad, India</span>
              </div>
              <button
                type="button"
                className="article-modal-close"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            <div className="article-modal-body">
              <h2 id="article-modal-title" className="article-modal-title">
                {activeArticle.title}
              </h2>
              <p className="article-modal-subtitle">{activeArticle.subtitle}</p>

              {/* Metrics Showcase */}
              <div className="modal-metrics-grid">
                {activeArticle.metrics.map((m, idx) => (
                  <div className="modal-metric-box" key={idx}>
                    <div className="metric-val">{m.value}</div>
                    <div className="metric-lbl">{m.label}</div>
                    <div className="metric-tag">{m.highlight}</div>
                  </div>
                ))}
              </div>

              {/* Executive Summary */}
              <div className="article-section">
                <h3>Executive Summary</h3>
                <p>{activeArticle.summary}</p>
              </div>

              {/* Problem & Solution */}
              <div className="article-section-grid">
                <div className="problem-box">
                  <h4>⚠️ The Engineering Challenge</h4>
                  <p>{activeArticle.problemStatement}</p>
                </div>
                <div className="solution-box">
                  <h4>💡 The Architectural Solution</h4>
                  <p>{activeArticle.solutionOverview}</p>
                </div>
              </div>

              {/* System Architecture Points */}
              <div className="article-section">
                <h3>Core Architecture &amp; System Highlights</h3>
                <ul className="architecture-list">
                  {activeArticle.architecturePoints.map((pt, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Learnings */}
              <div className="article-section">
                <h3>Key Takeaways &amp; Best Practices</h3>
                <div className="learnings-grid">
                  {activeArticle.keyLearnings.map((learning, idx) => (
                    <div className="learning-card" key={idx}>
                      <span className="learning-num">0{idx + 1}</span>
                      <p>{learning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer / Navigation */}
              <div className="article-modal-footer">
                <div className="modal-footer-actions">
                  {activeArticle.demoUrl && (
                    <Link
                      to={activeArticle.demoUrl}
                      className="btn btn-primary"
                      onClick={() => setActiveArticle(null)}
                    >
                      🚀 Test In-Browser Demo
                    </Link>
                  )}
                  {activeArticle.adminDemoUrl && (
                    <Link
                      to={activeArticle.adminDemoUrl}
                      className="btn btn-secondary"
                      onClick={() => setActiveArticle(null)}
                    >
                      🔐 Access Admin CMS Demo
                    </Link>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleCopyArticleLink(activeArticle.slug)}
                  >
                    {copiedLink ? "✓ Link Copied!" : "🔗 Share Link"}
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveArticle(null)}
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Insights;
