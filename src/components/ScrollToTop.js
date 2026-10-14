import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
      setVisible(scrollTop > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title={`Back to top (${scrollProgress}%)`}
    >
      <svg className="scroll-progress-ring" width="44" height="44" viewBox="0 0 44 44">
        <circle
          className="scroll-ring-bg"
          cx="22"
          cy="22"
          r="18"
          fill="none"
          strokeWidth="3"
        />
        <circle
          className="scroll-ring-fill"
          cx="22"
          cy="22"
          r="18"
          fill="none"
          strokeWidth="3"
          strokeDasharray={113}
          strokeDashoffset={113 - (113 * scrollProgress) / 100}
        />
      </svg>
      <span className="scroll-arrow" aria-hidden="true">↑</span>
    </button>
  );
}
