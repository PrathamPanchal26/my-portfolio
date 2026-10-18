import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import DemoViewer from "./demos/DemoViewer";
import ScrollToTop from "./components/ScrollToTop";
import DevTerminal from "./components/DevTerminal";
import "./App.css";

const ROUTE_META = {
  "/": {
    title: "Pratham Panchal — Frontend Developer & React Specialist | Official Portfolio",
    description: "Official portfolio of Pratham Panchal, Frontend Developer & React Specialist based in Ahmedabad, India. Explore high-performance React web applications, modern UI/UX design, and interactive frontend engineering."
  },
  "/about": {
    title: "About Pratham Panchal | Frontend Developer & React Engineer Ahmedabad",
    description: "Learn about Pratham Panchal, a Frontend Developer and React Specialist based in Ahmedabad, Gujarat, India with expertise in modern UI engineering and responsive design."
  },
  "/skills": {
    title: "Technical Skills — Pratham Panchal | React.js, JavaScript, Tailwind CSS",
    description: "Explore technical skills of Pratham Panchal: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Git, GitHub, Vercel, and UI/UX design."
  },
  "/projects": {
    title: "Projects & Applications — Pratham Panchal | React Portfolio Work",
    description: "Explore live projects by Pratham Panchal, including Kanha Construction studio, Kanha Admin Portal, Spotify Bollywood Player, and Inventory Management System."
  },
  "/contact": {
    title: "Contact Pratham Panchal | Hire Frontend Developer & React Specialist",
    description: "Get in touch with Pratham Panchal for freelance web development, React contracts, UI design, or full-time frontend roles. Based in Ahmedabad, Gujarat, India."
  },
};

function AppContent() {
  const location = useLocation();
  const isDemoRoute = location.pathname.startsWith("/demos");

  useEffect(() => {
    if (location.pathname.startsWith("/demos/")) {
      const demoSlug = location.pathname.replace("/demos/", "");
      const formatted = demoSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      document.title = `${formatted} Demo | Pratham Panchal Portfolio`;
    } else {
      const meta = ROUTE_META[location.pathname];
      if (meta) {
        document.title = meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", meta.description);
      } else {
        document.title = "Pratham Panchal — Frontend Developer & React Specialist";
      }
    }

    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }, [location.pathname]);

  return (
    <div className={`app-shell ${isDemoRoute ? "demo-mode" : ""}`}>
      {!isDemoRoute && <Navbar />}
      <main className={`app-main ${isDemoRoute ? "demo-main" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demos/:demoId" element={<DemoViewer />} />
        </Routes>
      </main>
      {!isDemoRoute && <Footer />}
      <ScrollToTop />
      {!isDemoRoute && <DevTerminal />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
