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
import GlobalSearch from "./components/GlobalSearch";
import ResumeModal from "./components/ResumeModal";
import "./App.css";

const ROUTE_META = {
  "/": {
    title: "Pratham Panchal — Frontend Developer & React Specialist | Official Portfolio Ahmedabad",
    description: "Official portfolio of Pratham Panchal, Frontend Developer & React Specialist based in Ahmedabad, Gujarat, India. Discover high-performance React web applications, modern UI/UX design, interactive demos, and client portals."
  },
  "/about": {
    title: "About Pratham Panchal | Frontend Developer & React Engineer Ahmedabad India",
    description: "Learn about Pratham Panchal: professional background, IT engineering diploma, frontend skills, client testimonials, and web engineering experience in Ahmedabad, Gujarat."
  },
  "/skills": {
    title: "Technical Skills — Pratham Panchal | React.js, JavaScript (ES6+), Tailwind CSS",
    description: "Comprehensive technical competencies of Pratham Panchal: React.js, JavaScript, Tailwind CSS, Bootstrap, Web Audio API, LocalStorage, Git, Vercel, and UI/UX design."
  },
  "/projects": {
    title: "Projects & Live Applications — Pratham Panchal | React Portfolio Ahmedabad",
    description: "Explore 9 interactive in-browser applications built by Pratham Panchal: Kanha Construction & Interior, Kanha Admin Portal, Spotify Bollywood, TaskMaster Pro, and Inventory System."
  },
  "/contact": {
    title: "Contact & Hire Pratham Panchal | Frontend Developer in Ahmedabad, India",
    description: "Contact Pratham Panchal for freelance contracts, React development, UI design, or full-time roles. Call/WhatsApp +91 9638561264 or email prathampanchal1515@gmail.com."
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
      <GlobalSearch />
      <ResumeModal />
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
