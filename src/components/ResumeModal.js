import React, { useState, useEffect } from "react";
import { trackResumeDownload } from "../utils/analytics";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("visual"); // "visual" | "ats"

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
Location: Ahmedabad, India
Email: prathampanchal1515@gmail.com
Phone/WhatsApp: +91 9638561264
Portfolio: https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/
GitHub: https://github.com/PrathamPanchal26
Current Experience: Frontend Developer at Spalon Pro (Live SaaS Platform)
Education: Bachelor's Degree (Pursuing · Gandhinagar University) | Diploma in Computer Engineering (Completed)`;
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
            <div className="resume-view-toggle" role="group" aria-label="Resume View Mode">
              <button
                type="button"
                className={`resume-toggle-btn ${viewMode === "visual" ? "active" : ""}`}
                onClick={() => setViewMode("visual")}
                title="View graphical resume"
              >
                🖼️ Visual Resume
              </button>
              <button
                type="button"
                className={`resume-toggle-btn ${viewMode === "ats" ? "active" : ""}`}
                onClick={() => setViewMode("ats")}
                title="View ATS-optimized text sheet"
              >
                📄 ATS Text
              </button>
            </div>
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
              href="/Pratham_Panchal_Resume.jpg"
              download="Pratham_Panchal_Resume.jpg"
              className="resume-btn resume-btn-primary"
              title="Download high-resolution resume image"
              onClick={trackResumeDownload}
            >
              💾 Download Resume
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

        {/* Visual Graphic Resume View */}
        {viewMode === "visual" && (
          <div className="resume-visual-container">
            <div className="resume-visual-wrapper">
              <img
                src="/Pratham_Panchal_Resume.jpg"
                alt="Pratham Panchal — Frontend Developer Resume"
                className="resume-visual-img"
              />
            </div>
          </div>
        )}

        {/* Printable & Interactive ATS Resume Sheet */}
        {viewMode === "ats" && (
          <div className="resume-sheet">
            {/* Header */}
            <header className="resume-header">
              <div className="resume-header-main">
                <h1 className="resume-name">PRATHAM PANCHAL</h1>
                <p className="resume-job-title">
                  Frontend Developer &amp; React Specialist
                </p>
                <p className="resume-location">
                  📍 Ahmedabad, India · Pursuing Degree at Gandhinagar University
                </p>
              </div>
              <div className="resume-contact-block">
                <div>
                  <strong>Phone / WhatsApp:</strong>{" "}
                  <a href="tel:+919638561264">+91 9638561264</a>
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:prathampanchal1515@gmail.com">
                    prathampanchal1515@gmail.com
                  </a>
                </div>
                <div>
                  <strong>Portfolio:</strong>{" "}
                  <a
                    href="https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    my-portfolio-one-cyan-rlqanq9j8c.vercel.app
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

            {/* Profile */}
            <section className="resume-section">
              <h2 className="resume-section-title">PROFILE</h2>
              <p className="resume-summary-text">
                Frontend Developer with 2.5 months of professional experience at <strong>Spalon Pro</strong>, an IT company, developing responsive web interfaces using HTML, CSS, JavaScript, React and Tailwind CSS. Currently contributing to a live SaaS platform.
              </p>
            </section>

            {/* Current Experience */}
            <section className="resume-section">
              <h2 className="resume-section-title">CURRENT EXPERIENCE</h2>

              <div className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-role">Frontend Developer</h3>
                    <span className="resume-item-company">Spalon Pro · IT Company · Live SaaS Platform</span>
                  </div>
                  <div className="resume-item-date">2.5 Months Professional Experience | Ahmedabad, India</div>
                </div>
                <ul className="resume-item-bullets">
                  <li>
                    Contributing to SpalonPro, a live salon-industry SaaS platform, through responsive frontend implementation and page development.
                  </li>
                  <li>
                    Developing and optimizing clean, cross-browser responsive web interfaces using React.js, Tailwind CSS, JavaScript (ES6+), and HTML5/CSS3.
                  </li>
                  <li>
                    Refining mobile layouts, interactive components, and UX touchpoints for improved client onboarding and retention.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-role">Freelance Frontend Developer &amp; React Specialist</h3>
                    <span className="resume-item-company">Client Projects &amp; Commercial Solutions</span>
                  </div>
                  <div className="resume-item-date">2023 — Present | Ahmedabad, India</div>
                </div>
                <ul className="resume-item-bullets">
                  <li>
                    Delivered turnkey web presence and custom digital studio platform for <strong>Kanha Construction &amp; Interior</strong>.
                  </li>
                  <li>
                    Engineered 9+ live interactive React applications including TaskMaster Pro, Barcode Inventory System, and Spotify Bollywood sound synthesizer.
                  </li>
                </ul>
              </div>
            </section>

            {/* Selected Projects */}
            <section className="resume-section">
              <h2 className="resume-section-title">SELECTED PROJECTS</h2>

              <div className="resume-project-item">
                <div className="resume-item-header">
                  <span className="resume-project-name">SpalonPro — Live SaaS Project</span>
                  <span className="resume-project-stack">Frontend · Responsive Web Design · React · Tailwind CSS</span>
                </div>
                <p>Working on a live salon-industry SaaS product, improving responsive pages, mobile layouts and frontend features.</p>
              </div>

              <div className="resume-project-item">
                <div className="resume-item-header">
                  <span className="resume-project-name">Kanha Constructions Portfolio</span>
                  <span className="resume-project-stack">Website Portfolio · Frontend Development · React</span>
                </div>
                <p>Portfolio website project for Kanha Constructions, presenting the company and its construction work.</p>
              </div>

              <div className="resume-project-item">
                <div className="resume-item-header">
                  <span className="resume-project-name">Personal Developer Portfolio</span>
                  <span className="resume-project-stack">React · Frontend Development · my-portfolio-one-cyan-rlqanq9j8c.vercel.app</span>
                </div>
                <p>Created a responsive portfolio showcasing development projects, technical skills and frontend work.</p>
              </div>
            </section>

            {/* Core Skills & Strengths */}
            <section className="resume-section">
              <h2 className="resume-section-title">CORE SKILLS &amp; STRENGTHS</h2>
              <div className="resume-skills-grid">
                <div className="resume-skill-group">
                  <strong>Core Skills:</strong>
                  <p>HTML5 &amp; CSS3, JavaScript, React.js, Tailwind CSS, WordPress, Responsive Web Design, Frontend Development, Graphic Design, Basic App Development, Basic Database Knowledge</p>
                </div>
                <div className="resume-skill-group">
                  <strong>Strengths:</strong>
                  <p>Creative problem solving, Attention to visual detail, Eager to learn and improve, User-focused approach</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="resume-section">
              <h2 className="resume-section-title">EDUCATION</h2>
              <div className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-role">Bachelor's Degree</h3>
                    <span className="resume-item-company">Gandhinagar University</span>
                  </div>
                  <div className="resume-item-date">Expected 2028</div>
                </div>
                <p className="resume-edu-text">
                  Relevant coursework includes algorithms, databases and computer networks.
                </p>
              </div>

              <div className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-role">Diploma in Computer Engineering</h3>
                    <span className="resume-item-company">Ahmedabad Technical Education</span>
                  </div>
                  <div className="resume-item-date">Completed</div>
                </div>
              </div>
            </section>
          </div>
        )}

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
