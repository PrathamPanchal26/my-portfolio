import React from "react";

function About() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Who I Am</div>
        <h2>About Me</h2>
        <div className="divider"></div>
      </div>

      <div className="about-grid">
        {/* Avatar / Image */}
        <div className="about-image-wrapper">
          <div className="about-avatar">👨‍💻</div>
        </div>

        {/* Content */}
        <div className="about-content">
          <h2>
            I'm <span className="highlight">Pratham</span>, a Frontend Developer
          </h2>

          <p>
            I'm a passionate frontend developer with a strong eye for design and
            a love for building clean, modern web applications. I specialize in
            React.js and enjoy creating seamless user experiences.
          </p>

          <p>
            When I'm not coding, I'm exploring new design trends, working on
            freelance projects, or leveling up my skills in UI/UX design and
            graphic design.
          </p>

          {/* Stats */}
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">0</span>
              <span className="stat-label">Clients</span>
            </div>
          </div>

          {/* Tags */}
          <div className="about-tags">
            <span className="tag">🎓 Self-Taught</span>
            <span className="tag">⚛️ React Developer</span>
            <span className="tag">🎨 UI Designer</span>
            <span className="tag">🌐 WordPress</span>
            <span className="tag">📱 Responsive Design</span>
            <span className="tag">🚀 Freelancer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
