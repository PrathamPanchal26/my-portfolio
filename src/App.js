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
import "./App.css";

const ROUTE_TITLES = {
  "/": "Pratham Panchal — Frontend Developer & React Specialist | Official Portfolio",
  "/about": "About Pratham Panchal | Frontend Developer & Web Designer",
  "/skills": "Skills & Technologies — Pratham Panchal | React & Frontend Stack",
  "/projects": "Projects & Portfolio Work — Pratham Panchal | React Applications",
  "/contact": "Contact Pratham Panchal | Hire Frontend Developer & Web Designer",
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
      document.title =
        ROUTE_TITLES[location.pathname] ||
        "Pratham Panchal — Frontend Developer & React Specialist";
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
