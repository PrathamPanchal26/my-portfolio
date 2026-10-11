import React, { useState } from "react";

export default function PersonalPortfolioDemo() {
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setFormData({ name: "", email: "", msg: "" });
    }, 4000);
  };

  return (
    <div className="folio-app">
      {/* Folio Navbar */}
      <nav className="folio-nav">
        <div className="folio-nav-inner">
          <div className="folio-logo">
            <span>Pratham</span>.Portfolio
          </div>
          <div className="folio-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Work</a>
            <a href="#contact" className="folio-contact-btn">Contact</a>
          </div>
        </div>
      </nav>

      {/* Folio Hero */}
      <section className="folio-hero">
        <div className="folio-hero-content">
          <span className="folio-badge">✨ Creative Web Developer &amp; UI/UX Enthusiast</span>
          <h1>Designing &amp; Engineering Modern High-Performance Web Applications</h1>
          <p>
            Hello! I'm Pratham, specialized in React.js, clean CSS architectures, and building intuitive user experiences that turn ideas into remarkable digital products.
          </p>
          <div className="folio-hero-btns">
            <a href="#projects" className="folio-btn folio-btn-primary">View Featured Works</a>
            <a href="#contact" className="folio-btn folio-btn-outline">Hire Me for Projects</a>
          </div>
        </div>
        <div className="folio-hero-avatar">
          <div className="folio-avatar-circle">👨‍💻</div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section id="skills" className="folio-section">
        <div className="folio-container">
          <h2 className="folio-sec-title">Core Competencies</h2>
          <div className="folio-skills-grid">
            <div className="folio-skill-card">
              <span className="skill-icon">⚛️</span>
              <h3>React &amp; JavaScript</h3>
              <p>Hooks, state management, context, client routing, and component lifecycles.</p>
            </div>
            <div className="folio-skill-card">
              <span className="skill-icon">🎨</span>
              <h3>Modern CSS &amp; UI</h3>
              <p>Responsive flexbox &amp; grid layouts, animations, design tokens, and accessibility.</p>
            </div>
            <div className="folio-skill-card">
              <span className="skill-icon">🛠️</span>
              <h3>Fullstack &amp; APIs</h3>
              <p>RESTful APIs, Node.js, Express, and modern database integrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="folio-section folio-contact-sec">
        <div className="folio-container">
          <div className="folio-contact-card">
            <h2>Let's Collaborate On Something Great</h2>
            <p>Looking for a dedicated developer to bring your product to life? Send a message below.</p>
            <form onSubmit={handleSubmit} className="folio-form">
              <div className="folio-form-row">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <textarea
                rows="4"
                required
                placeholder="Tell me about your project or inquiry..."
                value={formData.msg}
                onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
              ></textarea>
              <button type="submit" className="folio-btn folio-btn-primary">Send Direct Inquiry</button>
              {msgSent && (
                <div className="folio-success-toast">
                  🎉 Message received! I will get back to you promptly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
