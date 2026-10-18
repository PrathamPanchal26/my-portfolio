import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

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
          "  contact      - Direct WhatsApp, email, and location info",
          "  quote        - Jump to project cost & timeline estimator",
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
          "📫 Get In Touch:",
          "  • Email: prathampanchal1515@gmail.com",
          "  • Phone/WhatsApp: +91 9638561264",
          "  • GitHub: https://github.com/PrathamPanchal26",
          "  • Location: Ahmedabad, Gujarat, India (Remote & Hybrid)"
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
