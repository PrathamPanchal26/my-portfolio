import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThreeDSpaceBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = null;
    try {
      ctx = canvas.getContext ? canvas.getContext("2d") : null;
    } catch {
      return;
    }
    if (!ctx) return;

    let animId = null;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates in normalized space [-1, 1]
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Mobile-adaptive particle count to preserve 60fps on budget hardware
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 35 : Math.min(80, Math.floor(width / 18));
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100,
        radius: Math.random() * 1.8 + 1,
        colorSeed: Math.random(),
      });
    }

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        targetMouseX = (e.touches[0].clientX / width - 0.5) * 2;
        targetMouseY = (e.touches[0].clientY / height - 0.5) * 2;
      }
    };

    // Pause animation when tab is hidden to save 100% CPU/GPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const fov = 400;
    const MAX_LINE_DIST_SQ = 130 * 130; // Pre-calculated squared distance to avoid Math.sqrt

    const render = () => {
      if (!isRunning) return;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const isDark = theme !== "light";

      const cosY = Math.cos(mouseX * 0.35);
      const sinY = Math.sin(mouseX * 0.35);
      const cosX = Math.cos(mouseY * 0.35);
      const sinX = Math.sin(mouseY * 0.35);

      // Render 3D particles with perspective projection
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Forward movement
        p.z -= 0.5;
        if (p.z <= 20) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // 3D rotation transforms
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;

        let ry = p.y * cosX - rz * sinX;
        rz = p.y * sinX + rz * cosX;

        if (rz <= 20) continue;

        const scale = fov / rz;
        const projX = rx * scale + cx;
        const projY = ry * scale + cy;

        if (projX < -40 || projX > width + 40 || projY < -40 || projY > height + 40) {
          continue;
        }

        const alpha = Math.min(1, Math.max(0, (1 - rz / 1000) * (isDark ? 0.7 : 0.45)));
        const size = Math.max(0.6, p.radius * scale * 0.7);

        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);

        if (p.colorSeed > 0.65) {
          ctx.fillStyle = isDark
            ? `rgba(240, 163, 106, ${alpha * 1.2})`
            : `rgba(196, 92, 38, ${alpha})`;
        } else if (p.colorSeed > 0.4) {
          ctx.fillStyle = isDark
            ? `rgba(0, 242, 254, ${alpha * 0.9})`
            : `rgba(14, 165, 233, ${alpha * 0.8})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(244, 239, 230, ${alpha * 0.8})`
            : `rgba(50, 45, 40, ${alpha * 0.6})`;
        }
        ctx.fill();

        // Optimized filament connections (squared distance skips Math.sqrt unless close)
        if (i < 25 && !isMobile) {
          for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dz = p.z - p2.z;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < MAX_LINE_DIST_SQ) {
              const scale2 = fov / p2.z;
              const projX2 = p2.x * scale2 + cx;
              const projY2 = p2.y * scale2 + cy;

              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / 130) * (isDark ? 0.12 : 0.06);
              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(projX2, projY2);
              ctx.strokeStyle = isDark
                ? `rgba(224, 122, 61, ${lineAlpha})`
                : `rgba(196, 92, 38, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="three-d-space-canvas" aria-hidden="true" />;
}
