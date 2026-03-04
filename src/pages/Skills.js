import React from "react";

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML5", icon: "🌐" },
      { name: "CSS3", icon: "🎨" },
      { name: "JavaScript", icon: "⚡" },
      { name: "React JS", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "Bootstrap", icon: "🅱️" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "VS Code", icon: "💻" },
      { name: "WordPress", icon: "📝" },
      { name: "Figma", icon: "🖼️" },
      { name: "npm", icon: "📦" },
      { name: "Vercel", icon: "▲" },
    ],
  },
  {
    category: "Design & Others",
    skills: [
      { name: "Graphic Design", icon: "✏️" },
      { name: "UI/UX Design", icon: "🎯" },
      { name: "Photoshop", icon: "🖌️" },
      { name: "Canva", icon: "🟦" },
      { name: "SEO Basics", icon: "🔍" },
      { name: "Responsive Design", icon: "📱" },
    ],
  },
];

function Skills() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">What I Know</div>
        <h2>My Skills</h2>
        <p>Technologies and tools I work with to bring ideas to life.</p>
        <div className="divider"></div>
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
