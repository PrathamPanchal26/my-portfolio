import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialKanhaProjects = [
  {
    id: "proj_1",
    title: "Rajdeep Villa Residential",
    category: "residential",
    categoryLabel: "Residential",
    location: "Nikol, Ahmedabad",
    area: "5,000 SQ. FT.",
    projectType: "Turnkey Project",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Premium contemporary duplex villa with cantilevered balcony, Italian marble flooring, landscaped courtyard, and custom architectural louvers.",
    gallery: [
      { section: "elevation", title: "Modern Facade & Lighting", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
      { section: "interior", title: "Double-Height Living Hall", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
      { section: "construction", title: "Reinforced Column Shell", image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
  {
    id: "proj_2",
    title: "S.P. Ring Road Commercial Hub",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "S.P. Ring Road, Ahmedabad",
    area: "24,000 SQ. FT.",
    projectType: "Turnkey Project",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-story corporate building featuring curtain wall glazing, structural steel framework, open-plan office plates, and automated elevator lobby.",
    gallery: [
      { section: "elevation", title: "Glazed Commercial Elevation", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
      { section: "interior", title: "Executive Boardroom & Reception", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
      { section: "construction", title: "Post-Tensioned Slab Work", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
  {
    id: "proj_3",
    title: "Naroda Industrial Warehouse",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Naroda GIDC, Ahmedabad",
    area: "15,000 SQ. FT.",
    projectType: "Structural Engineering",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    description: "Heavy-duty industrial shed facility with heavy crane gantry girders, seismic load compliance, and laser-screed zero-joint industrial flooring.",
    gallery: [
      { section: "construction", title: "PEB Steel Truss Erection", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" },
      { section: "elevation", title: "Exterior Loading Bay", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
  {
    id: "proj_4",
    title: "Lifecare Hospital Interior Suite",
    category: "hospital",
    categoryLabel: "Hospital",
    location: "Naroda, Ahmedabad",
    area: "8,500 SQ. FT.",
    projectType: "Interior Project",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Specialized hospital interior execution meeting strict medical airflow, anti-bacterial surfaces, ergonomic patient bays, and reception lounge.",
    gallery: [
      { section: "interior", title: "Medical Reception & Waiting Lounge", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80" },
      { section: "interior", title: "Modular ICU Bay Partition", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
  {
    id: "proj_5",
    title: "Luxury Living & Kitchen Suite",
    category: "interior",
    categoryLabel: "Interior",
    location: "Nikol, Ahmedabad",
    area: "1,800 SQ. FT.",
    projectType: "Interior Project",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description: "High-end bespoke interior featuring Italian marble accent walls, warm LED cove lighting, floating TV credenza, and acrylic island modular kitchen.",
    gallery: [
      { section: "interior", title: "Italian Marble Wall & Cove Lighting", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" },
      { section: "interior", title: "Modular Island Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
  {
    id: "proj_6",
    title: "Master Suite & Vanity Lounge",
    category: "interior",
    categoryLabel: "Interior",
    location: "Ahmedabad",
    area: "1,200 SQ. FT.",
    projectType: "Interior Project",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description: "Sophisticated master bedroom interior with arched vanity mirror, upholstered headboard paneling, walk-in glass wardrobes, and ambient mood profiles.",
    gallery: [
      { section: "interior", title: "Upholstered Headboard & Vanity", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80" },
      { section: "interior", title: "Glass Wardrobes & LED Profiling", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80" },
    ],
  },
];

export default function KanhaPortfolioDemo() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState("all");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "Architectural Design", message: "" });

  const filteredProjects = activeCategory === "all"
    ? initialKanhaProjects
    : initialKanhaProjects.filter(p => p.category === activeCategory);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: "", phone: "", service: "Architectural Design", message: "" });
    }, 4000);
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="kanha-eta-site">
      {/* Top Banner / Navbar */}
      <header className="kanha-eta-navbar">
        <div className="kanha-eta-container nav-inner">
          <a href="#home" className="kanha-eta-brand" onClick={closeMobileNav}>
            <div className="kanha-eta-logo-icon">K</div>
            <div className="kanha-eta-logo-text">
              <span className="kanha-eta-logo-name">KANHA</span>
              <span className="kanha-eta-logo-sub">CONSTRUCTION &amp; INTERIOR</span>
            </div>
          </a>

          <button
            type="button"
            className="kanha-eta-hamburger"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>

          <nav className={`kanha-eta-nav-menu ${mobileNavOpen ? "open" : ""}`}>
            <a href="#home" onClick={closeMobileNav}>Home</a>
            <a href="#about" onClick={closeMobileNav}>About Us</a>
            <a href="#services" onClick={closeMobileNav}>Services</a>
            <a href="#projects" onClick={closeMobileNav}>Our Projects</a>
            <a href="#contact" onClick={closeMobileNav}>Contact</a>
            <Link to="/demos/kanha-admin" className="kanha-eta-admin-pill" title="Access Administrator Portal" onClick={closeMobileNav}>
              🔐 Admin Portal
            </Link>
            <div className="kanha-eta-nav-actions-mobile">
              <a href="tel:+919898749575" className="kanha-eta-call-btn" onClick={closeMobileNav}>
                📞 +91 9898749575
              </a>
              <a
                href="https://wa.me/919898749575?text=Hello%20Kanha%20Team,%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noreferrer"
                className="kanha-eta-wa-btn"
                onClick={closeMobileNav}
              >
                💬 WhatsApp
              </a>
            </div>
          </nav>

          <div className="kanha-eta-nav-actions">
            <a href="tel:+919898749575" className="kanha-eta-call-btn">
              📞 +91 9898749575
            </a>
            <a
              href="https://wa.me/919898749575?text=Hello%20Kanha%20Team,%20I%20am%20interested%20in%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="kanha-eta-wa-btn"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="kanha-eta-hero">
        <div className="kanha-eta-hero-glow"></div>
        <div className="kanha-eta-container kanha-eta-hero-grid">
          <div className="kanha-eta-hero-content">
            <div className="kanha-eta-badge-est">
              🏆 Established Since 2021 • Nikol, Ahmedabad, Gujarat, India
            </div>
            <h1 className="kanha-eta-hero-title">
              KANHA <span>CONSTRUCTION</span> &amp; INTERIOR
            </h1>
            <div className="kanha-eta-tagline">
              ✨ Realising Your Dreams
            </div>
            <p className="kanha-eta-hero-desc">
              Delivering quality-driven architectural, structural, and interior projects with a commitment to excellence, innovation, and reliability across residential, industrial, commercial, and healthcare spaces.
            </p>

            <div className="kanha-eta-hero-actions">
              <a href="#projects" className="btn-eta-primary">
                Explore Portfolio ➔
              </a>
              <a href="#contact" className="btn-eta-secondary">
                Get In Touch
              </a>
              <a
                href="https://www.instagram.com/kanha_construction_interiors?igsh=aGZ2YzN1anE4Z3N3"
                target="_blank"
                rel="noreferrer"
                className="btn-eta-instagram"
              >
                📸 Instagram
              </a>
              <Link to="/demos/kanha-admin" className="btn-eta-admin">
                🔐 Manage via Admin CMS
              </Link>
            </div>
          </div>

          <div className="kanha-eta-hero-visual">
            <div className="kanha-eta-img-frame">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Kanha Architecture Facade"
              />
            </div>
            <div className="kanha-eta-floating-card">
              <span className="float-icon">🏢</span>
              <div>
                <h4>Turnkey Excellence</h4>
                <p>End-to-End Execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="kanha-eta-stats-ribbon">
        <div className="kanha-eta-container kanha-eta-stats-grid">
          <div className="stat-card">
            <h3>50+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-card">
            <h3>15K+</h3>
            <p>Largest Sq. Ft. Facility</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>On-Time Execution</p>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <p>Core Specializations</p>
          </div>
        </div>
      </section>

      {/* About Company Preview */}
      <section id="about" className="kanha-eta-section">
        <div className="kanha-eta-container">
          <div className="kanha-eta-sec-header">
            <span className="sec-sub">Who We Are</span>
            <h2>About Our Company</h2>
            <p>Kanha Construction and Interior is a trusted name in the field of construction and interior solutions.</p>
          </div>

          <div className="kanha-eta-about-card">
            <div>
              <h3>Combining Functionality, Aesthetics, and Durability</h3>
              <p>
                We specialize in residential, commercial, and interior works, offering end-to-end turnkey solutions that bring visionary architecture into reality. Our team combines structural safety with bespoke aesthetic detailing.
              </p>
              <ul className="kanha-eta-check-list">
                <li>✓ Quality-Driven Project Engineering</li>
                <li>✓ Turnkey Architectural &amp; Interior Execution</li>
                <li>✓ Transparent Timeline &amp; Safety Compliance</li>
              </ul>
              <a href="#contact" className="btn-eta-primary">Request Consultation ➔</a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                alt="Kanha Project Preview"
                className="about-preview-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section id="services" className="kanha-eta-section kanha-eta-dark-bg">
        <div className="kanha-eta-container">
          <div className="kanha-eta-sec-header">
            <span className="sec-sub">What We Offer</span>
            <h2>Our Specialized Services</h2>
            <p>Comprehensive architectural, structural, and interior design expertise</p>
          </div>

          <div className="kanha-eta-services-grid">
            <div className="srv-card">
              <span className="srv-icon">🏙️</span>
              <h3>Architectural Design</h3>
              <p>Conceptualizing modern, functional, and aesthetically striking elevations and 2D/3D floor layouts.</p>
            </div>
            <div className="srv-card">
              <span className="srv-icon">🧱</span>
              <h3>Structural Design</h3>
              <p>Rigorous structural engineering ensuring long-term load safety, seismic resilience, and material efficiency.</p>
            </div>
            <div className="srv-card">
              <span className="srv-icon">🛋️</span>
              <h3>Interior Design</h3>
              <p>Bespoke residential, office, and hospital interior transformations with customized lighting and finishes.</p>
            </div>
            <div className="srv-card">
              <span className="srv-icon">🔑</span>
              <h3>Turnkey Projects</h3>
              <p>End-to-end hassle-free execution from initial blueprint design to final key handover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section id="projects" className="kanha-eta-section">
        <div className="kanha-eta-container">
          <div className="kanha-eta-sec-header">
            <span className="sec-sub">Our Work</span>
            <h2>Featured Projects</h2>
            <p>Preview our recent industrial, residential, and interior project handovers.</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="kanha-eta-cat-pills">
            <button
              className={`cat-pill ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Projects ({initialKanhaProjects.length})
            </button>
            <button
              className={`cat-pill ${activeCategory === "residential" ? "active" : ""}`}
              onClick={() => setActiveCategory("residential")}
            >
              Residential
            </button>
            <button
              className={`cat-pill ${activeCategory === "commercial" ? "active" : ""}`}
              onClick={() => setActiveCategory("commercial")}
            >
              Commercial
            </button>
            <button
              className={`cat-pill ${activeCategory === "industrial" ? "active" : ""}`}
              onClick={() => setActiveCategory("industrial")}
            >
              Industrial
            </button>
            <button
              className={`cat-pill ${activeCategory === "hospital" ? "active" : ""}`}
              onClick={() => setActiveCategory("hospital")}
            >
              Hospital
            </button>
            <button
              className={`cat-pill ${activeCategory === "interior" ? "active" : ""}`}
              onClick={() => setActiveCategory("interior")}
            >
              Interior
            </button>
          </div>

          {/* Grid */}
          <div className="kanha-eta-projects-grid">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="kanha-eta-proj-card"
                onClick={() => setSelectedProject(p)}
              >
                <div className="proj-media">
                  <img src={p.image} alt={p.title} />
                  <span className="cat-badge">{p.categoryLabel}</span>
                </div>
                <div className="proj-info">
                  <div className="proj-meta">
                    <span>📍 {p.location}</span>
                    <span>📐 {p.area}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="proj-card-foot">
                    <span className="proj-type">{p.projectType}</span>
                    <button className="proj-view-btn">View Gallery Photos ➔</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="kanha-eta-section kanha-eta-dark-bg">
        <div className="kanha-eta-container kanha-eta-contact-wrapper">
          <div className="contact-info-col">
            <span className="sec-sub">Get In Touch</span>
            <h2>Have a Project in Mind?</h2>
            <p>Talk to our lead architects &amp; structural engineers today for Nikol &amp; Ahmedabad developments.</p>
            <div className="contact-meta-cards">
              <div className="meta-card">
                <span>📍</span>
                <div>
                  <strong>Head Office Address</strong>
                  <p>Nikol, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
              <div className="meta-card">
                <span>📞</span>
                <div>
                  <strong>Direct Calling</strong>
                  <p>+91 9898749575 (Mon - Sat: 9 AM - 7 PM)</p>
                </div>
              </div>
              <div className="meta-card">
                <span>✉️</span>
                <div>
                  <strong>Email Inquiry</strong>
                  <p>kanha.consinterio@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            <form onSubmit={handleContactSubmit} className="kanha-eta-form">
              <h3>Send Project Inquiry</h3>
              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hardik Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98980 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Interested Service</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option>Architectural Design</option>
                  <option>Structural Design</option>
                  <option>Turnkey Construction Project</option>
                  <option>Interior Design &amp; Fitout</option>
                  <option>Industrial Shed Development</option>
                  <option>Hospital Facility Fitout</option>
                </select>
              </div>
              <div className="form-group">
                <label>Brief Message / Plot Size</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your plot location and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn-eta-primary w-100">
                Submit Consultation Request
              </button>
              {contactSubmitted && (
                <div className="kanha-eta-toast">
                  ✅ Inquiry sent successfully! Our team will contact you at {formData.phone || "your number"}.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedProject && (
        <div className="kanha-eta-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="kanha-eta-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-x" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="modal-top">
              <span className="cat-badge">{selectedProject.categoryLabel}</span>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="modal-meta-row">
                <span>📍 {selectedProject.location}</span>
                <span>📐 {selectedProject.area}</span>
                <span>🏢 {selectedProject.projectType}</span>
              </div>
            </div>

            <div className="modal-gallery-tabs">
              <button
                className={`tab-btn ${selectedGalleryTab === "all" ? "active" : ""}`}
                onClick={() => setSelectedGalleryTab("all")}
              >
                All Photos ({selectedProject.gallery.length})
              </button>
              <button
                className={`tab-btn ${selectedGalleryTab === "interior" ? "active" : ""}`}
                onClick={() => setSelectedGalleryTab("interior")}
              >
                Interior Section
              </button>
              <button
                className={`tab-btn ${selectedGalleryTab === "construction" ? "active" : ""}`}
                onClick={() => setSelectedGalleryTab("construction")}
              >
                Construction &amp; Structure
              </button>
            </div>

            <div className="modal-photos-grid">
              {selectedProject.gallery
                .filter(g => selectedGalleryTab === "all" || g.section === selectedGalleryTab)
                .map((g, idx) => (
                  <div key={idx} className="photo-card">
                    <img src={g.image} alt={g.title} />
                    <div className="photo-caption">{g.title}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="kanha-eta-footer">
        <div className="kanha-eta-container footer-flex">
          <div className="kanha-eta-brand">
            <div className="kanha-eta-logo-icon">K</div>
            <div className="kanha-eta-logo-text">
              <span className="kanha-eta-logo-name">KANHA</span>
              <span className="kanha-eta-logo-sub">CONSTRUCTION &amp; INTERIOR</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="https://www.instagram.com/kanha_construction_interiors?igsh=aGZ2YzN1anE4Z3N3" target="_blank" rel="noreferrer">
              Follow @kanha_construction_interiors
            </a>
            <Link to="/demos/kanha-admin" className="admin-link">
              🔐 Admin Site Access
            </Link>
          </div>
          <p className="copyright">
            &copy; 2026 KANHA Construction &amp; Interior. All rights reserved. • Nikol, Ahmedabad, Gujarat, India
          </p>
        </div>
      </footer>
    </div>
  );
}
