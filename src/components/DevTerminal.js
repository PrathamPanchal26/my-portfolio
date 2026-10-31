import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { YOUTUBE_URL, INSTAGRAM_URL } from "./DevCreatorHub";
import { soundFX } from "../utils/soundEffects";
import { downloadVCard } from "../utils/vcard";

const INITIAL_GREETING = [
  "💻 Pratham Panchal Developer Console [v2.4.0]",
  "Type 'help' to see available commands or click on suggested tags below.",
  "--------------------------------------------------"
];

function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(INITIAL_GREETING);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Global hotkey: backtick (`) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    const newEntry = `> ${rawCmd}`;

    let responseLines = [];

    switch (cmd) {
      case "help":
        responseLines = [
          "Available Commands:",
          "  bio          - Overview of Pratham Panchal & background",
          "  skills       - Core technical stack and frameworks",
          "  projects     - List of interactive live demo applications",
          "  lab          - Scroll to the Interactive UI & Physics Sandbox",
          "  vcard        - Download Pratham's vCard contact directly",
          "  hire         - Instant WhatsApp connection for projects",
          "  youtube      - Open & view YouTube channel (@prathamcodingworld)",
          "  instagram    - Open & view Instagram reels profile (@devbypratham)",
          "  creator      - Explore Tech Content Creator Hub & stats",
          "  contact      - Direct WhatsApp, email, and social info",
          "  quote        - Jump to project cost & timeline estimator",
          "  matrix       - Enter the developer matrix simulation",
          "  theme        - Toggle between dark mode and light mode",
          "  clear        - Clear the terminal console",
          "  exit         - Close the terminal"
        ];
        break;

      case "bio":
        responseLines = [
          "👤 Pratham Panchal — Frontend Developer & React Specialist",
          "📍 Location: Ahmedabad, Gujarat, India",
          "🎯 Focus: High-performance React SPAs, turnkey client portals, modern UI/UX design.",
          "✨ Status: Available for freelance projects & full-time roles."
        ];
        break;

      case "skills":
        responseLines = [
          "⚡ Technical Arsenal:",
          "  • Frontend: React 18/19, JavaScript (ES6+), HTML5, CSS3",
          "  • Styling: Tailwind CSS, Vanilla CSS Design Systems, Responsive Layouts",
          "  • APIs & Web: RESTful APIs, Web Audio API, WebSockets",
          "  • Tooling: Git, GitHub, Vercel, npm, Node.js runtime",
          "  • Quality: 95+ Google Lighthouse target, Core Web Vitals, Schema.org SEO"
        ];
        break;

      case "projects":
        responseLines = [
          "🚀 Featured In-Browser Applications:",
          "  1. Kanha Construction & Interior  -> /demos/kanha-portfolio",
          "  2. Kanha Admin Security CMS       -> /demos/kanha-admin",
          "  3. Spotify Bollywood Player       -> /demos/spotify-bollywood",
          "  4. Cloth Inventory Barcode System -> /demos/inventory-system",
          "  5. TaskMaster Pro Suite           -> /demos/taskmaster-pro",
          "  6. Real-Time Weather Dashboard    -> /demos/weather-dashboard",
          "Type any demo link into your browser to launch immediately!"
        ];
        break;

      case "contact":
        responseLines = [
          "📫 Get In Touch & Follow Along:",
          "  • Email: prathampanchal1515@gmail.com",
          "  • Phone/WhatsApp: +91 9638561264",
          "  • YouTube: https://youtube.com/@prathamcodingworld",
          "  • Instagram: https://www.instagram.com/devbypratham",
          "  • GitHub: https://github.com/PrathamPanchal26",
          "  • Location: Ahmedabad, Gujarat, India (Remote & Hybrid)"
        ];
        break;

      case "youtube":
        responseLines = [
          "▶ Pratham Coding World — YouTube Channel",
          "  • Channel: @prathamcodingworld",
          "  • URL: https://youtube.com/@prathamcodingworld?si=xZ94QAp_jyFStvts",
          "  • Focus: React 19 Architectures, CSS Micro-Animations, Web Audio API, Full Builds",
          "  • Status: Opening channel in a new tab..."
        ];
        window.open(YOUTUBE_URL, "_blank");
        break;

      case "instagram":
        responseLines = [
          "📸 Dev By Pratham — Instagram Creator",
          "  • Handle: @devbypratham",
          "  • URL: https://www.instagram.com/devbypratham?vrfl=MTV2cmMzeGN3czV1eQ==",
          "  • Focus: Daily 60s Dev Reels, Frontend Hacks, Clean Code, UI/UX breakdowns",
          "  • Status: Opening Instagram profile in a new tab..."
        ];
        window.open(INSTAGRAM_URL, "_blank");
        break;

      case "creator":
        responseLines = [
          "🌟 Tech Content Creator & Educator Hub:",
          "  1. YouTube: Pratham Coding World (@prathamcodingworld)",
          "     Step-by-step masterclasses, React 19 apps, CSS animations.",
          "  2. Instagram: @devbypratham",
          "     Daily 60s dev reels, UI design breakdowns, frontend tips.",
          "  👉 Type 'youtube' or 'instagram' to launch immediately!"
        ];
        break;

      case "hire":
        responseLines = [
          "⚡ Initializing direct WhatsApp line to Pratham Panchal...",
          "📱 Phone: +91 9638561264",
          "💬 Opening WhatsApp chat..."
        ];
        window.open(
          "https://wa.me/919638561264?text=Hi%20Pratham,%20I%20saw%20your%20portfolio%20terminal%20and%20would%20like%20to%20hire%20you!",
          "_blank"
        );
        break;

      case "vcard":
        downloadVCard();
        responseLines = [
          "📇 Generated & downloaded Pratham_Panchal_Frontend_Developer.vcf",
          "Added phone (+91 9638561264), email, and portfolio to contact card."
        ];
        break;

      case "lab":
      case "playground":
        responseLines = [
          "⚡ Jumping to the Interactive UI & Micro-Interaction Playground..."
        ];
        setTimeout(() => {
          const el = document.getElementById("playground");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
        break;

      case "matrix":
        responseLines = [
          "01010000 01110010 01100001 01110100 01101000 01100001 01101101",
          "Wake up, Neo... The matrix has you.",
          "Follow the white rabbit. 🐇",
          "Knock, knock, Neo."
        ];
        break;

      case "quote":
        responseLines = [
          "💰 Scrolling to the interactive Project Estimator..."
        ];
        setTimeout(() => {
          const el = document.getElementById("estimator");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
        break;

      case "theme":
        toggleTheme();
        responseLines = [
          `🎨 Theme switched to ${theme === "dark" ? "light" : "dark"} mode!`
        ];
        break;

      case "clear":
        setHistory([]);
        return;

      case "exit":
        setIsOpen(false);
        return;

      case "":
        responseLines = [];
        break;

      default:
        responseLines = [
          `Command not recognized: '${cmd}'. Type 'help' to see valid commands.`
        ];
        break;
    }

    setHistory((prev) => [...prev, newEntry, ...responseLines]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() !== "") {
      soundFX.playClick();
      handleCommand(inputVal);
      setInputVal("");
    }
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      <button
        type="button"
        className="dev-terminal-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Developer Terminal (` hotkey)"
      >
        <span className="terminal-prompt-icon">&gt;_</span>
        <span className="terminal-toggle-text">Terminal</span>
      </button>

      {/* Terminal Drawer / Modal */}
      {isOpen && (
        <div className="dev-terminal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="dev-terminal-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Developer Console"
          >
            {/* Window Title Bar */}
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="dot dot-red" onClick={() => setIsOpen(false)}></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">pratham@portfolio:~ (bash)</span>
              <button
                type="button"
                className="terminal-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Quick Command Suggestion Bar */}
            <div className="terminal-shortcuts-bar">
              {["help", "bio", "skills", "projects", "contact", "theme", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className="terminal-shortcut-pill"
                  onClick={() => handleCommand(cmd)}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`terminal-line ${line.startsWith(">") ? "terminal-cmd" : ""}`}
                >
                  {line}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form className="terminal-input-form" onSubmit={onSubmit}>
              <span className="terminal-prompt-symbol">pratham$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-text-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command (e.g. 'skills', 'projects', 'contact')..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DevTerminal;
