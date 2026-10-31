import React, { useEffect, Suspense, lazy } from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import DevTerminal from "./components/DevTerminal";
import GlobalSearch from "./components/GlobalSearch";
import ResumeModal from "./components/ResumeModal";
import QuickContactDock from "./components/QuickContactDock";
import MobileBottomNav from "./components/MobileBottomNav";
import ThreeDSpaceBackground from "./components/ThreeDSpaceBackground";
import { trackPageView } from "./utils/analytics";
import "./App.css";

// Lazy-loaded Demo Suite (Splits 105KB demos.css and 9 interactive apps from initial bundle)
const DemoViewer = lazy(() => import("./demos/DemoViewer"));

const ROUTE_META = {
  "/": {
    title: "Pratham Panchal — Portfolio | Best Frontend Developer & Top React Specialist in Ahmedabad",
    description: "Official portfolio of Pratham Panchal — Best Frontend Developer & Top React Specialist in Ahmedabad, Gujarat, India. Discover 9+ live interactive React apps, 3D UI/UX design, Kanha Construction studio, resume, GitHub projects, and sub-second performance. Hire Ahmedabad's top frontend engineer."
  },
  "/about": {
    title: "About Pratham Panchal | Best Frontend Developer & React Engineer Ahmedabad Gujarat",
    description: "Professional profile of Pratham Panchal: Frontend Developer, React Specialist, and Web Designer based in Ahmedabad, Gujarat. Diploma in IT Engineering, commercial platforms like Kanha Construction, and verified client testimonials."
  },
  "/skills": {
    title: "Technical Skills — Pratham Panchal | React 19, JavaScript ES6+, Tailwind CSS Ahmedabad",
    description: "Explore technical competencies of Pratham Panchal: React 19, JavaScript (ES6+), HTML5 semantic SEO, CSS3 custom tokens, Tailwind CSS, Bootstrap 5, Web Audio API, LocalStorage persistence, Git, and Core Web Vitals."
  },
  "/projects": {
    title: "Projects & Live Demos — Pratham Panchal | React Portfolio & Web Applications Ahmedabad",
    description: "Browse 9+ interactive in-browser React web applications by Pratham Panchal: Kanha Construction & Interior, Kanha Admin Portal CMS, Spotify Bollywood Player, TaskMaster Pro Suite, and Barcode Inventory System."
  },
  "/insights": {
    title: "Technical Case Studies — Pratham Panchal | React Architecture & Google SEO Ranking",
    description: "Read engineering case studies by Pratham Panchal: Kanha Construction 99 Lighthouse performance, Web Audio API synthesis for Spotify Bollywood, resilient React state management, and Google SEO ranking architecture."
  },
  "/contact": {
    title: "Contact & Hire Pratham Panchal | Top Frontend & React Developer in Ahmedabad, India",
    description: "Hire Pratham Panchal for freelance React web development, modern frontend contracts, turnkey commercial websites, or full-time roles in Ahmedabad and remote. Call/WhatsApp +91 9638561264 or email prathampanchal1515@gmail.com."
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
      <ThreeDSpaceBackground />
      {!isDemoRoute && <Navbar />}
      <main className={`app-main ${isDemoRoute ? "demo-main" : ""}`}>
        <Suspense fallback={<div className="route-loader-skeleton" aria-hidden="true" />}>
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
        </Suspense>
      </main>
      {!isDemoRoute && <Footer />}
      <ScrollToTop />
      {!isDemoRoute && <DevTerminal />}
      <GlobalSearch />
      <ResumeModal />
      {!isDemoRoute && <QuickContactDock />}
      {!isDemoRoute && <MobileBottomNav />}
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
