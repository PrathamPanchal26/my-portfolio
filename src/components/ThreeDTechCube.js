import React, { useState } from "react";
import { soundFX } from "../utils/soundEffects";

const CUBE_FACES = [
  {
    id: "front",
    name: "React 19 Specialist",
    emoji: "⚛️",
    desc: "Single-page apps, hooks lifecycle, concurrency & custom state trees.",
    metric: "95% Mastery",
  },
  {
    id: "back",
    name: "3D & UI/UX Engineering",
    emoji: "💎",
    desc: "Perspective transforms, hardware-accelerated WebGL, fluid micro-interactions.",
    metric: "60 FPS Native",
  },
  {
    id: "right",
    name: "Kanha Turnkey Studio",
    emoji: "🏛️",
    desc: "Architecture civil showcase, project galleries & high-trust lead pipelines.",
    metric: "Production Live",
  },
  {
    id: "left",
    name: "Sub-Second Performance",
    emoji: "⚡",
    desc: "95+ Google Lighthouse target, Core Web Vitals & semantic SEO ranking.",
    metric: "<0.8s LCP",
  },
  {
    id: "top",
    name: "Web Audio Synthesis",
    emoji: "🎵",
    desc: "In-browser oscillators, gain nodes, harmonic melody generator (Spotify Bollywood).",
    metric: "0kb Audio Files",
  },
  {
    id: "bottom",
    name: "Security Admin CMS",
    emoji: "🔐",
    desc: "Role-based PIN authentication, live telemetry, and publisher dashboard.",
    metric: "PIN Guarded",
  },
];

export default function ThreeDTechCube() {
  const [currentFace, setCurrentFace] = useState("front");

  const faceRotations = {
    front: "rotateX(0deg) rotateY(0deg)",
    back: "rotateX(0deg) rotateY(180deg)",
    right: "rotateX(0deg) rotateY(-90deg)",
    left: "rotateX(0deg) rotateY(90deg)",
    top: "rotateX(-90deg) rotateY(0deg)",
    bottom: "rotateX(90deg) rotateY(0deg)",
  };

  const handleSelectFace = (faceId) => {
    soundFX.playPop();
    setCurrentFace(faceId);
  };

  return (
    <div className="three-d-cube-showcase">
      <div className="cube-showcase-header">
        <span className="section-tag-sm">3D Core Dimensions</span>
        <h4>Interactive 3D Tech Cube</h4>
        <p>Spin or select any face to inspect technical competencies in 3D space.</p>
      </div>

      <div className="three-d-cube-stage">
        <div
          className="three-d-cube"
          style={{ transform: faceRotations[currentFace] || faceRotations.front }}
        >
          {CUBE_FACES.map((face) => (
            <div key={face.id} className={`cube-face cube-face-${face.id}`}>
              <div className="face-inner">
                <span className="face-emoji">{face.emoji}</span>
                <h5>{face.name}</h5>
                <p>{face.desc}</p>
                <span className="face-metric-badge">{face.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Face selectors */}
      <div className="cube-face-nav" role="tablist">
        {CUBE_FACES.map((face) => (
          <button
            key={face.id}
            type="button"
            className={`cube-face-btn ${currentFace === face.id ? "active" : ""}`}
            onClick={() => handleSelectFace(face.id)}
            role="tab"
            aria-selected={currentFace === face.id}
            title={`Rotate to ${face.name}`}
          >
            <span>{face.emoji}</span>
            <span className="btn-face-name">{face.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

