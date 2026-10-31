import React, { useState, useEffect, useRef } from "react";
import { soundFX } from "../utils/soundEffects";
import { useTheme } from "../context/ThemeContext";

// Geometry 1: 3D Icosahedron (12 vertices, 30 edges)
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
].map(([x, y, z]) => {
  const len = Math.sqrt(x * x + y * y + z * z);
  return [x / len * 110, y / len * 110, z / len * 110];
});

const ICO_EDGES = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9], [10, 11]
];

// Geometry 2: 3D Cube
const CUBE_VERTICES = [
  [-70, -70, -70], [70, -70, -70], [70, 70, -70], [-70, 70, -70],
  [-70, -70, 70], [70, -70, 70], [70, 70, 70], [-70, 70, 70],
  // Inner diamond core
  [0, -45, 0], [0, 45, 0], [-45, 0, 0], [45, 0, 0], [0, 0, -45], [0, 0, 45]
];

const CUBE_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
  [8, 10], [8, 11], [8, 12], [8, 13],
  [9, 10], [9, 11], [9, 12], [9, 13],
  [10, 12], [12, 11], [11, 13], [13, 10]
];

// Geometry 3: 3D Torus parametric points
function createTorusData() {
  const vertices = [];
  const edges = [];
  const R = 85;
  const r = 32;
  const segsU = 16;
  const segsV = 8;

  for (let u = 0; u < segsU; u++) {
    const theta = (u / segsU) * Math.PI * 2;
    for (let v = 0; v < segsV; v++) {
      const phi = (v / segsV) * Math.PI * 2;
      const x = (R + r * Math.cos(phi)) * Math.cos(theta);
      const y = (R + r * Math.cos(phi)) * Math.sin(theta);
      const z = r * Math.sin(phi);
      vertices.push([x, y, z]);

      const curIdx = u * segsV + v;
      const nextV = (v + 1) % segsV;
      edges.push([curIdx, u * segsV + nextV]);
      const nextU = (u + 1) % segsU;
      edges.push([curIdx, nextU * segsV + v]);
    }
  }
  return { vertices, edges };
}

const TORUS_DATA = createTorusData();

const COLOR_PRESETS = {
  amber: {
    primary: "#e07a3d",
    secondary: "#f0a36a",
    rgb: "224, 122, 61",
    label: "Amber Gold",
  },
  cyan: {
    primary: "#00f2fe",
    secondary: "#4facfe",
    rgb: "0, 242, 254",
    label: "Cyber Cyan",
  },
  violet: {
    primary: "#a855f7",
    secondary: "#ec4899",
    rgb: "168, 85, 247",
    label: "Neon Violet",
  },
};

export default function ThreeDHeroCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  const [activeShape, setActiveShape] = useState("polyhedron");
  const [activeColor, setActiveColor] = useState("amber");
  const [isHovered, setIsHovered] = useState(false);

  const rotRef = useRef({
    x: 0.3,
    y: 0.5,
    z: 0.1,
    vx: 0.006,
    vy: 0.009,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    let ctx = null;
    try {
      ctx = canvas.getContext ? canvas.getContext("2d") : null;
    } catch {
      return;
    }
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let isRunning = true;

    const width = 360;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const rot = rotRef.current;
    const fov = 320;
    const cameraZ = 340;

    const render = () => {
      if (!isVisible || !isRunning) return;

      ctx.clearRect(0, 0, width, height);

      if (!rot.isDragging) {
        rot.x += rot.vx;
        rot.y += rot.vy;
      }

      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);
      const cosZ = Math.cos(rot.z);
      const sinZ = Math.sin(rot.z);

      let currentVertices = ICO_VERTICES;
      let currentEdges = ICO_EDGES;

      if (activeShape === "torus") {
        currentVertices = TORUS_DATA.vertices;
        currentEdges = TORUS_DATA.edges;
      } else if (activeShape === "cube") {
        currentVertices = CUBE_VERTICES;
        currentEdges = CUBE_EDGES;
      }

      const projected = [];
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < currentVertices.length; i++) {
        const [vx, vy, vz] = currentVertices[i];

        let rx = vx * cosY - vz * sinY;
        let rz = vx * sinY + vz * cosY;

        let ry = vy * cosX - rz * sinX;
        rz = vy * sinX + rz * cosX;

        const finalX = rx * cosZ - ry * sinZ;
        const finalY = rx * sinZ + ry * cosZ;
        const finalZ = rz;

        const depth = cameraZ + finalZ;
        const scale = fov / Math.max(20, depth);
        const px = finalX * scale + cx;
        const py = finalY * scale + cy;

        projected.push({
          x: px,
          y: py,
          z: finalZ,
          scale,
        });
      }

      const colorData = COLOR_PRESETS[activeColor] || COLOR_PRESETS.amber;
      const isDark = theme !== "light";

      // Draw Edges
      ctx.lineWidth = 1.2;
      for (let e = 0; e < currentEdges.length; e++) {
        const [idx1, idx2] = currentEdges[e];
        const p1 = projected[idx1];
        const p2 = projected[idx2];
        if (!p1 || !p2) continue;

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.min(1, Math.max(0.15, (avgZ + 120) / 240));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${colorData.rgb}, ${alpha * (isDark ? 0.85 : 0.65)})`;
        ctx.stroke();
      }

      // Draw Vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.min(1, Math.max(0.2, (p.z + 120) / 240));
        const radius = Math.max(2, 3.8 * p.scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorData.rgb}, ${alpha * 0.25})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? "#ffffff" : colorData.secondary;
        ctx.fill();
      }

      // Core pulse
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      grad.addColorStop(0, `rgba(${colorData.rgb}, 0.16)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    // Performance: IntersectionObserver pauses 3D canvas when off-screen
    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && isRunning) {
              if (animId) cancelAnimationFrame(animId);
              animId = requestAnimationFrame(render);
            } else if (!isVisible && animId) {
              cancelAnimationFrame(animId);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    } else {
      animId = requestAnimationFrame(render);
    }

    // Performance: Pause when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
      } else {
        isRunning = true;
        if (isVisible) {
          if (animId) cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Mouse / Touch Drag handlers
    const onMouseDown = (e) => {
      rot.isDragging = true;
      rot.lastX = e.clientX;
      rot.lastY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!rot.isDragging) return;
      const dx = e.clientX - rot.lastX;
      const dy = e.clientY - rot.lastY;
      rot.y += dx * 0.01;
      rot.x += dy * 0.01;
      rot.lastX = e.clientX;
      rot.lastY = e.clientY;
    };

    const onMouseUp = () => {
      rot.isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        rot.isDragging = true;
        rot.lastX = e.touches[0].clientX;
        rot.lastY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!rot.isDragging || !e.touches || !e.touches[0]) return;
      const dx = e.touches[0].clientX - rot.lastX;
      const dy = e.touches[0].clientY - rot.lastY;
      rot.y += dx * 0.012;
      rot.x += dy * 0.012;
      rot.lastX = e.touches[0].clientX;
      rot.lastY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      rot.isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeShape, activeColor, theme]);

  const handleShapeSwitch = (shape) => {
    soundFX.playPop();
    setActiveShape(shape);
  };

  const handleColorSwitch = (colorKey) => {
    soundFX.playClick();
    setActiveColor(colorKey);
  };

  return (
    <div
      ref={containerRef}
      className="three-d-hero-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="three-d-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="three-d-viewport"
          title="Drag with mouse or finger to rotate in 3D"
        />

        <div className="three-d-hint-pill">
          <span className="three-d-orbit-icon">🔄</span>
          <span>{isHovered ? "Drag to Orbit in 3D" : "Interactive 3D Mesh"}</span>
        </div>
      </div>

      {/* 3D Geometry Switcher & Color Selector Dock */}
      <div className="three-d-controls-dock">
        <div className="shape-btn-group" role="group" aria-label="Select 3D Geometry">
          <button
            type="button"
            className={`shape-pill-btn ${activeShape === "polyhedron" ? "active" : ""}`}
            onClick={() => handleShapeSwitch("polyhedron")}
            title="3D Icosahedron Hologram"
          >
            ✦ Polyhedron
          </button>
          <button
            type="button"
            className={`shape-pill-btn ${activeShape === "torus" ? "active" : ""}`}
            onClick={() => handleShapeSwitch("torus")}
            title="3D Torus Ring"
          >
            ◎ Torus
          </button>
          <button
            type="button"
            className={`shape-pill-btn ${activeShape === "cube" ? "active" : ""}`}
            onClick={() => handleShapeSwitch("cube")}
            title="3D Cyber Cube"
          >
            ⬚ Cyber Cube
          </button>
        </div>

        <div className="color-btn-group" role="group" aria-label="Select 3D Glow Color">
          {Object.entries(COLOR_PRESETS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={`color-dot-btn ${activeColor === key ? "active" : ""}`}
              style={{ backgroundColor: item.primary }}
              onClick={() => handleColorSwitch(key)}
              title={`Switch to ${item.label}`}
              aria-label={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
