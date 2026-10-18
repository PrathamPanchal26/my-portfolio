import React from "react";

const skillCategories = [
  {
    category: "Frontend & React Ecosystem",
    skills: [
      { name: "React.js (18 & 19)", icon: "⚛️" },
      { name: "JavaScript (ES6+)", icon: "⚡" },
      { name: "HTML5 Semantic", icon: "🌐" },
      { name: "CSS3 & Custom Properties", icon: "🎨" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "Bootstrap 5", icon: "🅱️" },
      { name: "Single Page Apps (SPA)", icon: "📄" },
      { name: "Custom React Hooks", icon: "🪝" },
    ],
  },
  {
    category: "Web APIs & Architecture",
    skills: [
      { name: "RESTful APIs & Fetch", icon: "🔌" },
      { name: "Web Audio API", icon: "🎵" },
      { name: "LocalStorage API", icon: "💾" },
      { name: "Core Web Vitals Optimization", icon: "🚀" },
      { name: "Responsive Fluid Design", icon: "📱" },
      { name: "Cross-Browser Compatibility", icon: "🌐" },
    ],
  },
  {
    category: "Developer Tools & Cloud Deployment",
    skills: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "Vercel Cloud Hosting", icon: "▲" },
      { name: "VS Code & Debugging", icon: "💻" },
      { name: "npm / package ecosystem", icon: "📦" },
      { name: "WordPress CMS", icon: "📝" },
      { name: "Chrome DevTools", icon: "🛠️" },
    ],
  },
  {
    category: "UI/UX & Creative Design",
    skills: [
      { name: "UI/UX Engineering", icon: "🎯" },
      { name: "Figma Prototyping", icon: "🖼️" },
      { name: "Graphic Design", icon: "✏️" },
      { name: "Adobe Photoshop", icon: "🖌️" },
      { name: "Canva Design Suite", icon: "🟦" },
      { name: "Technical SEO & Schema", icon: "🔍" },
    ],
  },
];

function Skills() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">Technical Competencies</div>
        <h2>Frontend &amp; Engineering Skills</h2>
        <p>
          Technologies, frameworks, and modern tools engineered by <strong>Pratham Panchal</strong> in Ahmedabad, India.
        </p>
        <div className="divider"></div>
      </div>

      {/* Quick Search Skills Trigger */}
      <div className="skills-search-strip">
        <button
          type="button"
          className="skills-search-trigger"
          onClick={() => window.dispatchEvent(new CustomEvent("open-site-search"))}
        >
          <span>🔍</span> Search across all technologies &amp; project implementations... <kbd>Ctrl+K</kbd>
        </button>
      </div>

      <div className="skills-container">
        {skillCategories.map((cat) => (
          <div className="skills-category" key={cat.category}>
            <h3>{cat.category}</h3>
            <div className="skills-grid">
              {cat.skills.map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
