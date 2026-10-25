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
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DemoViewer from "./demos/DemoViewer";
import ScrollToTop from "./components/ScrollToTop";
import DevTerminal from "./components/DevTerminal";
import GlobalSearch from "./components/GlobalSearch";
import ResumeModal from "./components/ResumeModal";
import QuickContactDock from "./components/QuickContactDock";
import { trackPageView } from "./utils/analytics";
import "./App.css";

const ROUTE_META = {
  "/": {
    title: "Pratham Panchal — Portfolio | Frontend Developer & React Specialist Ahmedabad",
    description: "Official portfolio of Pratham Panchal — Frontend Developer & React Specialist based in Ahmedabad, Gujarat, India. Discover 9+ live interactive React applications, Kanha Construction studio, technical case studies, resume, GitHub projects, and modern UI/UX engineering."
  },
  "/about": {
    title: "About Pratham Panchal | Frontend Developer & React Engineer Ahmedabad Gujarat",
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
  "/insights": {
    title: "Technical Case Studies & Insights — Pratham Panchal | React Engineering Ahmedabad",
    description: "Explore in-depth technical case studies by Pratham Panchal: Kanha Construction 99 Lighthouse performance, Web Audio API harmonic synthesis, state persistence, and Google SEO ranking."
  },
  "/contact": {
    title: "Contact & Hire Pratham Panchal | Frontend Developer in Ahmedabad, India",
    description: "Contact Pratham Panchal for freelance contracts, React development, UI design, or full-time roles. Call/WhatsApp +91 9638561264 or email prathampanchal1515@gmail.com."
  },
  "/privacy": {
    title: "Privacy Policy | Pratham Panchal Portfolio",
    description: "Privacy policy for Pratham Panchal portfolio: detailing Google Analytics 4, cookie usage, data protection, and visitor rights."
  },
  "/terms": {
    title: "Terms of Service | Pratham Panchal Portfolio",
    description: "Terms of service for Pratham Panchal portfolio: intellectual property, project estimation guidelines, and service agreements."
  },
};

function AppContent() {
  const location = useLocation();
  const isDemoRoute = location.pathname.startsWith("/demos");

  useEffect(() => {
    let currentTitle = document.title;
    if (location.pathname.startsWith("/demos/")) {
      const demoSlug = location.pathname.replace("/demos/", "");
      const formatted = demoSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      currentTitle = `${formatted} Demo | Pratham Panchal Portfolio`;
      document.title = currentTitle;
    } else {
      const meta = ROUTE_META[location.pathname];
      if (meta) {
        currentTitle = meta.title;
        document.title = currentTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", meta.description);
      } else {
        currentTitle = "404 Page Not Found — Pratham Panchal Portfolio";
        document.title = currentTitle;
      }
    }

    // Fire Google Analytics 4 virtual page_view on every route navigation
    trackPageView(location.pathname, currentTitle);

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
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/demos/:demoId" element={<DemoViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDemoRoute && <Footer />}
      <ScrollToTop />
      {!isDemoRoute && <DevTerminal />}
      <GlobalSearch />
      <ResumeModal />
      {!isDemoRoute && <QuickContactDock />}
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
