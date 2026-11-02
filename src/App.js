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

const DEMO_META = {
  "taskmaster-pro": {
    title: "TaskMaster Pro Productivity Suite Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of TaskMaster Pro: MERN-inspired task planner with priority queues, categories, sprint analytics, and real-time state persistence by Pratham Panchal."
  },
  "kanha-portfolio": {
    title: "Kanha Construction & Interior Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of Kanha Construction & Interior studio website in Nikol, Ahmedabad: architectural design showcases, cost estimator, and modern responsive UI."
  },
  "kanha-admin": {
    title: "Kanha Admin Portal CMS Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of Kanha Admin Portal: PIN-authenticated security dashboard, project CMS manager, and lead telemetry system by Pratham Panchal."
  },
  "spotify-bollywood": {
    title: "Spotify Bollywood Music Player Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of Spotify Bollywood: Web Audio API harmonic sound synthesizer, synchronized lyrics, playlists, and responsive player by Pratham Panchal."
  },
  "inventory-system": {
    title: "Cloth Inventory & Barcode System Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of ClothWare: warehouse inventory management system with live barcode scanner simulation and stock tracking by Pratham Panchal."
  },
  "travel-website": {
    title: "WanderLuxe Travel Expeditions Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of WanderLuxe Travel Expeditions: destination discovery, itinerary booking, and fluid responsive travel portal by Pratham Panchal."
  },
  "currency-converter": {
    title: "Universal Currency Exchange Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of Universal Currency Exchange: real-time multi-currency conversions and financial rate charts by Pratham Panchal."
  },
  "ecommerce-ui": {
    title: "Aurora Studio E-Commerce Store Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of Aurora Studio: complete e-commerce user experience featuring product filter grids, dynamic cart, and checkout flow by Pratham Panchal."
  },
  "weather-dashboard": {
    title: "SkyPulse Real-Time Weather Demo | Pratham Panchal Portfolio",
    description: "Interactive demo of SkyPulse: weather telemetry dashboard with multi-city weather forecasts and atmospheric analytics by Pratham Panchal."
  }
};

const updateMetaTag = (selector, attr, value) => {
  try {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  } catch (e) { }
};

const updateCanonical = (url) => {
  try {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", url);
  } catch (e) { }
};

function AppContent() {
  const location = useLocation();
  const isDemoRoute = location.pathname.startsWith("/demos");

  useEffect(() => {
    let currentTitle = ROUTE_META["/"]?.title;
    let currentDesc = ROUTE_META["/"]?.description;

    if (location.pathname.startsWith("/demos/")) {
      const demoSlug = location.pathname.replace("/demos/", "");
      if (DEMO_META[demoSlug]) {
        currentTitle = DEMO_META[demoSlug].title;
        currentDesc = DEMO_META[demoSlug].description;
      } else {
        const formatted = demoSlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        currentTitle = `${formatted} Demo | Pratham Panchal Portfolio`;
        currentDesc = `Interactive live in-browser demo of ${formatted} built with React by Pratham Panchal.`;
      }
    } else if (ROUTE_META[location.pathname]) {
      currentTitle = ROUTE_META[location.pathname].title;
      currentDesc = ROUTE_META[location.pathname].description;
    } else {
      currentTitle = "404 Page Not Found — Pratham Panchal Portfolio";
      currentDesc = "The requested page could not be found. Explore Pratham Panchal's React projects, live demos, and case studies.";
    }

    // Set page title
    document.title = currentTitle;

    // Update SEO & Social OpenGraph / Twitter metadata dynamically
    updateMetaTag('meta[name="title"]', "content", currentTitle);
    updateMetaTag('meta[name="description"]', "content", currentDesc);
    updateMetaTag('meta[property="og:title"]', "content", currentTitle);
    updateMetaTag('meta[property="og:description"]', "content", currentDesc);
    updateMetaTag('meta[name="twitter:title"]', "content", currentTitle);
    updateMetaTag('meta[name="twitter:description"]', "content", currentDesc);

    const canonicalUrl = `https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app${location.pathname === "/" ? "/" : location.pathname}`;
    updateMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    updateCanonical(canonicalUrl);

    // Fire Google Analytics 4 virtual page_view on every route navigation
    trackPageView(location.pathname, currentTitle);

    try {
      window.scrollTo(0, 0);
    } catch (e) { }
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
