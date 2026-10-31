import React, { useState } from "react";
import { soundFX } from "../utils/soundEffects";

const BUTTON_STYLES = [
  {
    id: "aurora",
    name: "Aurora Beam",
    desc: "Shifting multi-color glowing gradient with soft blur",
    css: `.btn-aurora {
  background: linear-gradient(135deg, #e07a3d, #ff4d6d, #7928ca);
  background-size: 200% 200%;
  color: #fff;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(224, 122, 61, 0.35);
  animation: auroraShift 4s ease infinite;
}`,
  },
  {
    id: "glass",
    name: "Glassmorphism Pill",
    desc: "Frosted translucent glass with subtle glowing border",
    css: `.btn-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text);
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.25s ease;
}
.btn-glass:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: var(--accent);
  transform: translateY(-2px);
}`,
  },
  {
    id: "neon",
    name: "Cyber Neon Glow",
    desc: "High-contrast neon outline with radiant reactive aura",
    css: `.btn-neon {
  background: transparent;
  color: #00f2fe;
  border: 2px solid #00f2fe;
  padding: 11px 23px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.25);
  transition: all 0.2s ease;
}
.btn-neon:hover {
  background: #00f2fe;
  color: #0d1117;
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.6);
}`,
  },
  {
    id: "tactile",
    name: "Tactile Press 3D",
    desc: "Physical keyboard micro-press with 3D bottom bevel",
    css: `.btn-tactile {
  background: var(--accent);
  color: #ffffff;
  padding: 12px 26px;
  border-radius: 12px;
  border-bottom: 4px solid var(--accent-strong);
  font-weight: 700;
  transition: transform 0.1s ease, border-bottom 0.1s ease;
}
.btn-tactile:active {
  transform: translateY(3px);
  border-bottom: 1px solid var(--accent-strong);
}`,
  },
];

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState("glass"); // 'glass' | 'buttons' | 'spring'
  const [copiedCode, setCopiedCode] = useState(false);

  // Glassmorphism state
  const [blurVal, setBlurVal] = useState(16);
  const [opacityVal, setOpacityVal] = useState(12);
  const [radiusVal, setRadiusVal] = useState(18);
  const [borderAlpha, setBorderAlpha] = useState(25);

  // Buttons lab state
  const [selectedBtn, setSelectedBtn] = useState(BUTTON_STYLES[0]);
  const [clickCount, setClickCount] = useState(0);

  const glassCSS = `/* Modern Glassmorphism Token */
.glass-surface {
  background: rgba(255, 255, 255, ${(opacityVal / 100).toFixed(2)});
  backdrop-filter: blur(${blurVal}px);
  -webkit-backdrop-filter: blur(${blurVal}px);
  border-radius: ${radiusVal}px;
  border: 1px solid rgba(255, 255, 255, ${(borderAlpha / 100).toFixed(2)});
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
}`;

  const copyToClipboard = (text) => {
    soundFX.playSuccess();
    try {
      navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    }
  };

  const handleTabChange = (tab) => {
    soundFX.playPop();
    setActiveTab(tab);
  };

  return (
    <section className="playground-section" id="playground">
      <div className="playground-header">
        <div className="playground-title-group">
          <span className="section-tag-sm">⚡ Interactive Lab</span>
          <h3>Live Frontend UI &amp; Micro-Interaction Sandbox</h3>
          <p className="playground-sub">
            Test and tweak modern UI design tokens in real-time. Built by Pratham with pure React state and modern CSS.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="playground-tabs" role="tablist">
          <button
            type="button"
            className={`playground-tab ${activeTab === "glass" ? "active" : ""}`}
            onClick={() => handleTabChange("glass")}
            role="tab"
            aria-selected={activeTab === "glass"}
          >
            <span>💎 Glassmorphism Lab</span>
          </button>
          <button
            type="button"
            className={`playground-tab ${activeTab === "buttons" ? "active" : ""}`}
            onClick={() => handleTabChange("buttons")}
            role="tab"
            aria-selected={activeTab === "buttons"}
          >
            <span>✨ Button Physics</span>
          </button>
        </div>
      </div>

      <div className="playground-card-container">
        {activeTab === "glass" && (
          <div className="glass-lab-grid">
            {/* Controls */}
            <div className="glass-controls-panel">
              <h4>Customize Glass Parameters</h4>

              <div className="control-slider-group">
                <div className="slider-label-row">
                  <span>Backdrop Blur</span>
                  <strong>{blurVal}px</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={blurVal}
                  onChange={(e) => {
                    soundFX.playClick();
                    setBlurVal(Number(e.target.value));
                  }}
                  className="slider-input"
                />
              </div>

              <div className="control-slider-group">
                <div className="slider-label-row">
                  <span>Surface Opacity</span>
                  <strong>{opacityVal}%</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  value={opacityVal}
                  onChange={(e) => {
                    soundFX.playClick();
                    setOpacityVal(Number(e.target.value));
                  }}
                  className="slider-input"
                />
              </div>

              <div className="control-slider-group">
                <div className="slider-label-row">
                  <span>Corner Radius</span>
                  <strong>{radiusVal}px</strong>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={radiusVal}
                  onChange={(e) => {
                    soundFX.playClick();
                    setRadiusVal(Number(e.target.value));
                  }}
                  className="slider-input"
                />
              </div>

              <div className="control-slider-group">
                <div className="slider-label-row">
                  <span>Border Alpha</span>
                  <strong>{borderAlpha}%</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={borderAlpha}
                  onChange={(e) => {
                    soundFX.playClick();
                    setBorderAlpha(Number(e.target.value));
                  }}
                  className="slider-input"
                />
              </div>

              <button
                type="button"
                className="btn-copy-css"
                onClick={() => copyToClipboard(glassCSS)}
              >
                {copiedCode ? "✓ Copied CSS to Clipboard!" : "📋 Copy CSS Code"}
              </button>
            </div>

            {/* Live Visual Canvas */}
            <div className="glass-preview-stage">
              <div className="stage-aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
              </div>

              <div
                className="glass-sample-card"
                style={{
                  background: `rgba(255, 255, 255, ${(opacityVal / 100).toFixed(2)})`,
                  backdropFilter: `blur(${blurVal}px)`,
                  WebkitBackdropFilter: `blur(${blurVal}px)`,
                  borderRadius: `${radiusVal}px`,
                  border: `1px solid rgba(255, 255, 255, ${(borderAlpha / 100).toFixed(2)})`,
                }}
              >
                <div className="glass-sample-header">
                  <span className="glass-dot-beacon"></span>
                  <span className="glass-sample-tag">Live React Preview</span>
                </div>
                <h5>Interactive Glass Architecture</h5>
                <p>
                  Zero dependencies. Smooth 60fps hardware-accelerated rendering across modern mobile Safari and Chrome.
                </p>
                <div className="glass-sample-footer">
                  <span className="glass-metric">Blur: {blurVal}px</span>
                  <span className="glass-metric">Radius: {radiusVal}px</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "buttons" && (
          <div className="buttons-lab-grid">
            {/* Style Selector */}
            <div className="buttons-selector-list">
              <h4>Select Interaction Archetype</h4>
              {BUTTON_STYLES.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className={`btn-archetype-card ${selectedBtn.id === btn.id ? "selected" : ""}`}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedBtn(btn);
                  }}
                >
                  <div className="archetype-name">{btn.name}</div>
                  <div className="archetype-desc">{btn.desc}</div>
                </button>
              ))}
            </div>

            {/* Interactive Test Bed */}
            <div className="buttons-preview-stage">
              <div className="preview-stage-top">
                <span className="test-bed-label">Live Click Test Bed</span>
                <span className="click-counter-badge">Clicks: {clickCount}</span>
              </div>

              <div className="preview-stage-center">
                {selectedBtn.id === "aurora" && (
                  <button
                    type="button"
                    className="demo-aurora-btn"
                    onClick={() => {
                      soundFX.playClick();
                      setClickCount((c) => c + 1);
                    }}
                  >
                    <span>⚡ Launch Mission</span>
                  </button>
                )}
                {selectedBtn.id === "glass" && (
                  <button
                    type="button"
                    className="demo-glass-btn"
                    onClick={() => {
                      soundFX.playClick();
                      setClickCount((c) => c + 1);
                    }}
                  >
                    <span>💎 Frosted Action</span>
                  </button>
                )}
                {selectedBtn.id === "neon" && (
                  <button
                    type="button"
                    className="demo-neon-btn"
                    onClick={() => {
                      soundFX.playClick();
                      setClickCount((c) => c + 1);
                    }}
                  >
                    <span>🌟 Cyber Glow</span>
                  </button>
                )}
                {selectedBtn.id === "tactile" && (
                  <button
                    type="button"
                    className="demo-tactile-btn"
                    onClick={() => {
                      soundFX.playClick();
                      setClickCount((c) => c + 1);
                    }}
                  >
                    <span>⌨️ Press Key</span>
                  </button>
                )}
              </div>

              <div className="preview-stage-code">
                <div className="code-header-row">
                  <span>CSS Specification</span>
                  <button
                    type="button"
                    className="code-copy-btn"
                    onClick={() => copyToClipboard(selectedBtn.css)}
                  >
                    {copiedCode ? "✓ Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="code-display-block">
                  <code>{selectedBtn.css}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

