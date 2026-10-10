import React from "react";

const projects = [
  {
    emoji: "📦",
    title: "Inventory System",
    description:
      "A barcode-based cloth inventory management app that tracks stock, generates reports, and streamlines warehouse operations.",
    tags: ["React", "JavaScript", "CSS"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/src",
    live: "#",
  },
  {
    emoji: "✈️",
    title: "Travel Website",
    description:
      "A modern travel booking UI with destination cards, search filters, and a clean responsive layout for seamless browsing.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/src",
    live: "#",
  },
  {
    emoji: "💱",
    title: "Currency Converter",
    description:
      "A real-time currency conversion app using live exchange rate APIs with support for 150+ currencies and a clean UI.",
    tags: ["React", "API", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/src",
    live: "#",
  },
  {
    emoji: "🛒",
    title: "E-Commerce UI",
    description:
      "A fully responsive e-commerce frontend with product listings, cart functionality, and smooth checkout flow.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/src",
    live: "#",
  },
  {
    emoji: "🌦️",
    title: "Weather Dashboard",
    description:
      "A weather dashboard that shows real-time forecasts, temperature trends, and location-based weather data using OpenWeather API.",
    tags: ["React", "API", "Chart.js"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/src",
    live: "#",
  },
  {
    emoji: "👤",
    title: "Personal Portfolio",
    description:
      "A clean and modern personal portfolio template built with HTML5 and CSS3. Fully responsive with smooth animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/PrathamPanchal26/my-portfolio/tree/master/projects/html-personal-portfolio",
    live: "#",
  },
];

function Projects() {
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-tag">My Work</div>
        <h2>Projects</h2>
        <p>A selection of projects I've built with passion and purpose.</p>
        <div className="divider"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={project.title}>
            <div className="project-card-top">
              <div className="project-emoji">{project.emoji}</div>
              <span className="project-index">0{index + 1}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
