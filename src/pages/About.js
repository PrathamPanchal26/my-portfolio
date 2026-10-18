import React from "react";
import { Link } from "react-router-dom";

const EXPERIENCE = [
  {
    role: "Freelance Frontend Developer & React Specialist",
    company: "Self-Employed · Client Solutions",
    period: "2023 — Present",
    location: "Ahmedabad, India (Remote & Hybrid)",
    description:
      "Architected, developed, and launched modern responsive web applications and portals for diverse commercial clients. Built end-to-end solutions including Kanha Construction studio, restricted admin CMS systems, and custom UI components.",
    achievements: [
      "Engineered turnkey web presence for Kanha Construction, including categorized project showcases and lead inquiry channels.",
      "Developed security-guarded Admin CMS dashboard featuring role validation, real-time telemetry, and CMS publisher.",
      "Achieved 95+ Google Lighthouse scores across performance, accessibility, best practices, and SEO.",
      "Ensured zero-dependency fluid responsiveness across iOS Safari, Android Chrome, and modern desktop browsers.",
    ],
  },
  {
    role: "Frontend Web Developer & UI Engineer",
    company: "Independent Projects & Open-Source",
    period: "2022 — 2023",
    location: "Ahmedabad, India",
    description:
      "Focused on mastering modern JavaScript (ES6+), React component lifecycles, state management, Web Audio API synthesis, and RESTful web applications.",
    achievements: [
      "Built Spotify Bollywood web player leveraging browser Web Audio API for synthetic melody reproduction.",
      "Developed enterprise cloth inventory management system with simulated laser barcode scanning.",
      "Created reusable UI component libraries using modern CSS design tokens and dark/light mode switching.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Diploma in Information Technology / Computer Engineering",
    institution: "Ahmedabad Technical Education Board",
    period: "2021 — 2024",
    location: "Ahmedabad, Gujarat, India",
    details:
      "Core coursework in Data Structures, Object-Oriented Programming, Web Technologies, Database Management, and Software Engineering methodologies.",
  },
  {
    degree: "Advanced Frontend Engineering & React Specialization",
    institution: "Independent Professional Curriculum & Certifications",
    period: "2022 — 2023",
    location: "Online / Self-Paced",
    details:
      "Comprehensive mastery of React 18/19, JavaScript (ES6+), Responsive Web Design, REST APIs, and modern CSS architecture.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Pratham delivered an outstanding website for Kanha Construction. His understanding of design aesthetics and structural presentation exceeded our expectations. Our clients frequently praise how clean and responsive the site is.",
    author: "Kanha Construction & Interior",
    designation: "Client · Nikol, Ahmedabad",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    quote:
      "Working with Pratham was seamless. Fast turnaround, proactive communication, and pixel-perfect execution. He takes ownership of every detail and ensures smooth performance across all devices.",
    author: "Freelance Client Collaboration",
    designation: "Web Application Project",
    rating: "⭐⭐⭐⭐⭐",
  },
];

const VALUES = [
  {
    icon: "⚡",
    title: "High Performance First",
    desc: "Speed is a core feature. I engineer clean, bloat-free frontends optimized for sub-second loads and smooth 60fps animations.",
  },
  {
    icon: "🎯",
    title: "Pixel-Perfect Precision",
    desc: "Every border, margin, font hierarchy, and color contrast is considered to deliver a polished, high-trust experience.",
  },
  {
    icon: "📱",
    title: "Mobile-First Responsiveness",
    desc: "Interfaces designed to perform flawlessly across every viewport — from budget smartphones to 4K desktop displays.",
  },
  {
    icon: "🤝",
    title: "Clear Communication",
    desc: "Consistent progress updates, honest timelines, and proactive problem solving from concept through deployment.",
  },
];

function About() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Who I Am</div>
        <h2>About Me</h2>
        <p>A frontend developer with a designer’s eye for detail and an engineer’s commitment to quality.</p>
        <div className="divider"></div>
      </div>

      {/* Main Bio Grid */}
      <div className="about-grid">
        <div className="about-image-wrapper">
          <div className="about-avatar">PP</div>
        </div>

        <div className="about-content">
          <h2>
            I’m <span className="highlight">Pratham Panchal</span>, a Frontend Developer &amp; React Specialist
          </h2>

          <p>
            I’m a passionate frontend developer and web designer based in
            Ahmedabad, Gujarat, India. I specialize in turning complex problems into
            clean, elegant, and high-performance digital products. My core focus is
            React.js, modern JavaScript (ES6+), and responsive CSS engineering.
          </p>

          <p>
            Whether developing turnkey corporate platforms like Kanha Construction,
            building secure admin portals, or prototyping creative streaming applications,
            I balance aesthetic excellence with robust architectural principles.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">9+</span>
              <span className="stat-label">Live Apps</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">&lt;24h</span>
              <span className="stat-label">Response Time</span>
            </div>
          </div>

          <div className="about-tags">
            <span className="tag">Pratham Panchal</span>
            <span className="tag">React Specialist</span>
            <span className="tag">Frontend Developer</span>
            <span className="tag">Ahmedabad, India</span>
            <span className="tag">JavaScript ES6+</span>
            <span className="tag">Tailwind CSS</span>
            <span className="tag">UI/UX Engineering</span>
            <span className="tag">REST APIs</span>
            <span className="tag">Vercel Deployment</span>
          </div>
        </div>
      </div>

      {/* Core Values / Approach */}
      <div className="about-section-block">
        <div className="section-header-compact">
          <span className="section-tag-sm">My Philosophy</span>
          <h3>How I Work</h3>
        </div>

        <div className="values-grid">
          {VALUES.map((val) => (
            <div className="value-card" key={val.title}>
              <span className="value-icon">{val.icon}</span>
              <h4>{val.title}</h4>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience & Education Timelines */}
      <div className="about-section-block">
        <div className="timeline-two-col">
          {/* Work Experience */}
          <div className="timeline-pane">
            <div className="section-header-compact">
              <span className="section-tag-sm">Career Track</span>
              <h3>Work Experience</h3>
            </div>

            <div className="timeline-list">
              {EXPERIENCE.map((exp) => (
                <div className="timeline-item" key={exp.role}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-title">{exp.role}</h4>
                    <p className="timeline-company">{exp.company} · {exp.location}</p>
                    <p className="timeline-desc">{exp.description}</p>
                    <ul className="timeline-bullets">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="timeline-pane">
            <div className="section-header-compact">
              <span className="section-tag-sm">Academic Background</span>
              <h3>Education &amp; Credentials</h3>
            </div>

            <div className="timeline-list">
              {EDUCATION.map((edu) => (
                <div className="timeline-item" key={edu.degree}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-period">{edu.period}</span>
                    <h4 className="timeline-title">{edu.degree}</h4>
                    <p className="timeline-company">{edu.institution} · {edu.location}</p>
                    <p className="timeline-desc">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="about-section-block">
        <div className="section-header-compact">
          <span className="section-tag-sm">Social Proof</span>
          <h3>Client Feedback &amp; Testimonials</h3>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-rating">{t.rating}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <strong>{t.author}</strong>
                <span>{t.designation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="about-cta-banner">
        <div className="cta-banner-content">
          <h3>Ready to start your next web project?</h3>
          <p>Let's collaborate to build something fast, beautiful, and tailored to your goals.</p>
        </div>
        <div className="cta-banner-actions">
          <Link to="/contact" className="btn btn-primary">
            Get in Touch →
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
          >
            📄 View Full Resume
          </button>
          <Link to="/projects" className="btn btn-secondary">
            Explore Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
