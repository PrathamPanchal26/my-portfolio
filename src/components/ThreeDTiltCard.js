import React, { useRef, useEffect } from "react";

export default function ThreeDTiltCard({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);
  const isFinePointer = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      isFinePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!isFinePointer.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transition = "transform 0.08s ease-out";
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`;
        glareRef.current.style.opacity = "0.18";
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;

    cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`three-d-tilt-card ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="three-d-card-content" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {glare && (
        <div
          ref={glareRef}
          className="three-d-glare-overlay"
          style={{
            opacity: 0,
            transition: "opacity 0.25s ease-out",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
