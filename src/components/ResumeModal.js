import React, { useState, useEffect } from "react";
import { trackResumeDownload } from "../utils/analytics";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume-modal", handleOpen);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("resume-modal-open");
    } else {
      document.body.classList.remove("resume-modal-open");
    }
  }, [isOpen]);

  const handleCopyContact = () => {
    const contactText = `Pratham Panchal — Frontend Developer & React Specialist
Location: Ahmedabad, Gujarat, India
Email: prathampanchal1515@gmail.com
Phone/WhatsApp: +91 9638561264
GitHub: https://github.com/PrathamPanchal26
Portfolio: https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/`;
    navigator.clipboard.writeText(contactText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    trackResumeDownload();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Pratham Panchal Professional Resume"
    >
      <div
        className="resume-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="resume-modal-toolbar">
          <div className="toolbar-left">
            <span className="resume-badge-status">
              <span className="pulse-dot-green"></span> Available for Hire
            </span>
            <span className="resume-doc-title">Pratham_Panchal_Resume.pdf</span>
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className="resume-btn resume-btn-outline"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              🖨️ Print / PDF
            </button>
            <a
              href="/Resum.JPG"
              download="Pratham_Panchal_Resume.jpg"
              className="resume-btn resume-btn-primary"
              title="Download original resume file"
              onClick={trackResumeDownload}
            >
              💾 Download Original
            </a>
            <button
              type="button"
              className="resume-btn-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close resume modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable & Interactive ATS Resume Sheet */}
        <div className="resume-sheet">
          {/* Header */}
          <header className="resume-header">
            <div className="resume-header-main">
              <h1 className="resume-name">PRATHAM PANCHAL</h1>
              <p className="resume-job-title">
                Frontend Developer &amp; React Specialist | Web Designer
              </p>
              <p className="resume-location">
                📍 Ahmedabad, Gujarat, India · Open to Remote &amp; On-Site
              </p>
            </div>
            <div className="resume-contact-block">
              <div>
                <strong>Email:</strong>{" "}
                <a href="mailto:prathampanchal1515@gmail.com">
                  prathampanchal1515@gmail.com
                </a>
              </div>
              <div>
                <strong>Phone / WhatsApp:</strong>{" "}
                <a href="tel:+919638561264">+91 9638561264</a>
              </div>
              <div>
                <strong>Portfolio:</strong>{" "}
                <a
                  href="https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  my-portfolio-one-cyan.vercel.app
                </a>
              </div>
              <div>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/PrathamPanchal26"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/PrathamPanchal26
                </a>
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="resume-section">
            <h2 className="resume-section-title">PROFESSIONAL SUMMARY</h2>
            <p className="resume-summary-text">
              Dedicated and performance-oriented <strong>Frontend Developer</strong> with deep expertise in{" "}
              <strong>React.js</strong>, <strong>JavaScript (ES6+)</strong>, and modern responsive web engineering based in{" "}
              <strong>Ahmedabad, India</strong>. Proven track record of delivering commercial turnkey web platforms,
              restricted administrative CMS portals, and interactive web applications with sub-second performance,
              intuitive UI/UX design, and 95+ Lighthouse scores.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-section-title">TECHNICAL COMPETENCIES</h2>
            <div className="resume-skills-grid">
              <div className="resume-skill-group">
                <strong>Core Languages &amp; Frameworks:</strong>
                <p>React.js (18/19), JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap 5</p>
              </div>
              <div className="resume-skill-group">
                <strong>Web Technologies &amp; Architecture:</strong>
                <p>RESTful APIs, Web Audio API, LocalStorage persistence, Responsive Fluid Grids, Core Web Vitals</p>
              </div>
              <div className="resume-skill-group">
                <strong>Tools &amp; Workflow:</strong>
                <p>Git, GitHub, Vercel, npm, VS Code, Chrome DevTools, Figma, WordPress</p>
              </div>
              <div className="resume-skill-group">
                <strong>Specializations:</strong>
                <p>Single Page Applications (SPA), UI/UX Design, Search Engine Optimization (SEO), Accessible Frontend</p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="resume-section">
            <h2 className="resume-section-title">PROFESSIONAL WORK EXPERIENCE</h2>

            <div className="resume-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-role">Freelance Frontend Developer &amp; React Specialist</h3>
                  <span className="resume-item-company">Client Engagements &amp; Commercial Solutions</span>
                </div>
                <div className="resume-item-date">2023 — Present | Ahmedabad, India</div>
              </div>
              <ul className="resume-item-bullets">
                <li>
                  Architected and deployed full turnkey digital studio platform for <strong>Kanha Construction &amp; Interior</strong> (Nikol, Ahmedabad), increasing customer inquiry rate and digital credibility.
                </li>
                <li>
                  Engineered role-protected <strong>Kanha Admin Portal CMS</strong> equipped with session authentication, interactive lead pipeline, and real-time project publishing.
                </li>
                <li>
                  Delivered 9+ fully responsive in-browser applications achieving 95+ Lighthouse scores across performance, SEO, and accessibility.
                </li>
                <li>
                  Partnered with local and regional business owners to establish high-converting web identities and streamline customer consultation workflows.
                </li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-role">Frontend Web Developer &amp; UI Designer</h3>
                  <span className="resume-item-company">Independent Software Projects &amp; Open Source</span>
                </div>
                <div className="resume-item-date">2022 — 2023 | Ahmedabad, India</div>
              </div>
              <ul className="resume-item-bullets">
                <li>
                  Built <strong>Spotify Bollywood</strong> audio web application with harmonic synthesizer using the browser Web Audio API, interactive playback controls, and synchronized lyrics.
                </li>
                <li>
                  Developed an enterprise barcode-driven <strong>Cloth Inventory System</strong> simulating hardware barcode laser scanning and batch stock allocation.
                </li>
                <li>
                  Constructed cross-device responsive UI components leveraging CSS variables, dark/light theme switching, and smooth 60fps micro-animations.
                </li>
              </ul>
            </div>
          </section>

          {/* Key Featured Projects */}
          <section className="resume-section">
            <h2 className="resume-section-title">KEY FEATURED PROJECTS</h2>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <span className="resume-project-name">Kanha Construction &amp; Interior Platform</span>
                <span className="resume-project-stack">React · Responsive CSS · Inquiries CMS</span>
              </div>
              <p>Commercial platform for civil engineering &amp; interior studio in Ahmedabad with categorized portfolio galleries, estimate calculators, and direct WhatsApp lead generation.</p>
            </div>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <span className="resume-project-name">TaskMaster Pro Productivity Suite</span>
                <span className="resume-project-stack">React · State Management · LocalStorage</span>
              </div>
              <p>MERN-inspired project planner with priority queues, category taxonomies, sprint productivity metrics, and persistent storage.</p>
            </div>

            <div className="resume-project-item">
              <div className="resume-item-header">
                <span className="resume-project-name">Spotify Bollywood Audio Player</span>
                <span className="resume-project-stack">React · Web Audio API · Audio Synthesis</span>
              </div>
              <p>Music streaming simulator with synthesized Hindi audio playback, synced lyrics, and faithful dark-mode Spotify UI.</p>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-section-title">EDUCATION &amp; CERTIFICATIONS</h2>
            <div className="resume-item">
              <div className="resume-item-header">
                <div>
                  <h3 className="resume-item-role">Diploma in Information Technology / Computer Engineering</h3>
                  <span className="resume-item-company">Ahmedabad Technical Education Board · Ahmedabad, Gujarat</span>
                </div>
                <div className="resume-item-date">2021 — 2024</div>
              </div>
              <p className="resume-edu-text">
                Core coursework: Data Structures, Web Development, Software Engineering, Database Systems, Object-Oriented Programming.
              </p>
            </div>
          </section>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="resume-modal-footer">
          <button
            type="button"
            className="resume-footer-btn"
            onClick={handleCopyContact}
          >
            {copied ? "✅ Copied to Clipboard!" : "📋 Copy Contact Info"}
          </button>
          <a
            href="https://wa.me/919638561264?text=Hi%20Pratham,%20I%20reviewed%20your%20resume%20and%20would%20like%20to%20discuss%20an%20opportunity!"
            target="_blank"
            rel="noreferrer"
            className="resume-footer-btn resume-whatsapp-btn"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
