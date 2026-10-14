import React from "react";

function About() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Who I Am</div>
        <h2>About Me</h2>
        <p>A frontend developer with a designer’s eye for detail.</p>
        <div className="divider"></div>
      </div>

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
            Ahmedabad, Gujarat, India, with a strong eye for design and a love
            for building clean, modern, and high-performance web applications. I
            specialize in React.js, JavaScript (ES6+), and responsive UI engineering.
          </p>

          <p>
            When I’m not writing clean code, I’m exploring modern UI/UX trends,
            architecting intuitive interfaces, or collaborating on client
            projects like Kanha Construction &amp; turnkey web platforms.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">8+</span>
              <span className="stat-label">Live Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Open</span>
              <span className="stat-label">For Work</span>
            </div>
          </div>

          <div className="about-tags">
            <span className="tag">Pratham Panchal</span>
            <span className="tag">React Specialist</span>
            <span className="tag">Frontend Developer</span>
            <span className="tag">Ahmedabad, India</span>
            <span className="tag">UI/UX Designer</span>
            <span className="tag">JavaScript</span>
            <span className="tag">Tailwind CSS</span>
            <span className="tag">WordPress</span>
            <span className="tag">Responsive Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
