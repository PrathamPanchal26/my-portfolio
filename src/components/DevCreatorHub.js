import React, { useState } from "react";

export const YOUTUBE_URL = "https://youtube.com/@prathamcodingworld?si=xZ94QAp_jyFStvts";
export const INSTAGRAM_URL = "https://www.instagram.com/devbypratham?vrfl=MTV2cmMzeGN3czV1eQ==";

const YOUTUBE_VIDEOS = [
  {
    id: "yt-react19",
    title: "Building Production React Apps from Scratch: Architecture & State Management",
    category: "React.js",
    duration: "38 min",
    level: "Intermediate",
    description:
      "Deep dive into React 19 functional architecture, custom hooks, atomic state management, and avoiding unnecessary re-renders in scalable web applications.",
    topics: ["React 19 Hooks", "Component Architecture", "Performance Tuning", "Clean Code"],
    codePreview: `// Custom Hook Example from Video
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}`,
    url: YOUTUBE_URL,
  },
  {
    id: "yt-css-glass",
    title: "Modern Glassmorphism, Micro-Animations & Theme Toggling with Pure CSS",
    category: "CSS & UI/UX",
    duration: "24 min",
    level: "All Levels",
    description:
      "How to craft breathtaking frosted glass cards, fluid gradients, dark/light theme tokens, and GPU-accelerated micro-interactions without relying on heavy libraries.",
    topics: ["backdrop-filter", "CSS Variables", "Dark/Light Modes", "Micro-Interactions"],
    codePreview: `/* Modern Glassmorphic Card Spec */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}`,
    url: YOUTUBE_URL,
  },
  {
    id: "yt-webaudio",
    title: "Web Audio API Masterclass: Synthesizers & Interactive Music in the Browser",
    category: "Web APIs",
    duration: "32 min",
    level: "Advanced",
    description:
      "Step-by-step engineering of real-time audio oscillators, gain nodes, and synchronized visualizers right in JavaScript — inspired by the Spotify Bollywood app.",
    topics: ["AudioContext", "OscillatorNode", "GainNode", "Canvas Visualizer"],
    codePreview: `// Tone Generator Core
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const osc = ctx.createOscillator();
const gain = ctx.createGain();

osc.type = "sine";
osc.frequency.setValueAtTime(440, ctx.currentTime); // 440Hz Concert A
gain.gain.setValueAtTime(0.2, ctx.currentTime);

osc.connect(gain);
gain.connect(ctx.destination);
osc.start();`,
    url: YOUTUBE_URL,
  },
  {
    id: "yt-roadmap",
    title: "Frontend Developer Roadmap & Portfolio Masterclass: Zero to Client Ready",
    category: "Career & Tech",
    duration: "28 min",
    level: "Beginner to Pro",
    description:
      "The exact roadmap I used to build in-browser live applications, acquire client projects in Ahmedabad, and design high-converting developer portfolios.",
    topics: ["Portfolio Strategy", "Project Selection", "SEO & Lighthouse", "Freelancing Tips"],
    codePreview: `// 4 Pillars of a 99-Lighthouse Portfolio
1. Semantic HTML5 & accessible landmark roles
2. Fluid typography & zero layout shift (CLS < 0.05)
3. Zero heavy frameworks when vanilla CSS works best
4. Live interactive in-browser demos`,
    url: YOUTUBE_URL,
  },
];

const INSTAGRAM_REELS = [
  {
    id: "ig-hooks",
    title: "5 Essential React Custom Hooks in 60s",
    tag: "Quick Dev Tip",
    views: "4.8k+",
    likes: "680+",
    summary:
      "Stop repeating boilerplate! Learn `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useClickOutside`, and `useClipboard` in under one minute.",
    topics: ["#ReactJS", "#CustomHooks", "#WebDev", "#CleanCode"],
    codeSnippet: `// useLocalStorage in 4 lines
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initial);
  useEffect(() => localStorage.setItem(key, JSON.stringify(val)), [key, val]);
  return [val, setVal];
}`,
    url: INSTAGRAM_URL,
  },
  {
    id: "ig-grid-flex",
    title: "CSS Grid vs Flexbox: The 1-Minute Rule",
    tag: "CSS Secret",
    views: "6.2k+",
    likes: "920+",
    summary:
      "Grid is 2D (rows + columns at once). Flexbox is 1D (either row OR column). Here is the visual breakdown every frontend developer must know.",
    topics: ["#CSS3", "#CSSGrid", "#Flexbox", "#WebDesign"],
    codeSnippet: `/* 1D Navigation Row */
.navbar { display: flex; justify-content: space-between; align-items: center; }

/* 2D Responsive Gallery */
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }`,
    url: INSTAGRAM_URL,
  },
  {
    id: "ig-glass",
    title: "Ultra-Smooth Glassmorphic Navbar in 3 Lines",
    tag: "UI/UX Hack",
    views: "5.4k+",
    likes: "740+",
    summary:
      "Get that Apple-style frosted blur header without laggy repaints by using hardware-accelerated backdrop-filter and subtle semi-transparent borders.",
    topics: ["#UIUX", "#CSSAnimation", "#Glassmorphism", "#Frontend"],
    codeSnippet: `/* Apple-Style Glass Navbar */
.nav-blur {
  background: rgba(20, 18, 15, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}`,
    url: INSTAGRAM_URL,
  },
  {
    id: "ig-async",
    title: "Async / Await Error Handling Like a Senior Dev",
    tag: "JavaScript",
    views: "4.1k+",
    likes: "590+",
    summary:
      "Don't let unhandled promise rejections crash your UI. How to wrap fetch calls cleanly with tuple-style responses `[data, error]`.",
    topics: ["#JavaScript", "#AsyncAwait", "#ES6", "#WebDev"],
    codeSnippet: `// Clean Async Wrapper
const safeAsync = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};`,
    url: INSTAGRAM_URL,
  },
];

export default function DevCreatorHub() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'youtube' | 'instagram' | 'snippets'
  const [copiedId, setCopiedId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }).catch(() => {
      // Fallback
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    });
  };

  return (
    <section className="creator-hub-section" id="creator-hub" aria-label="Creator & Developer Content Hub">
      <div className="section-header-compact">
        <span className="section-tag-sm">🎥 Content Creator &amp; Educator</span>
        <h3 className="creator-hub-title">Tech Tutorials, Code Snippets &amp; Daily Dev Reels</h3>
        <p className="creator-hub-subtitle">
          I build real digital products and teach frontend engineering across <strong>YouTube</strong> (@prathamcodingworld) and <strong>Instagram</strong> (@devbypratham). Explore tutorials, bite-sized reels, and copyable code snippets below.
        </p>
      </div>

      {/* Featured Channel Spotlight Cards */}
      <div className="creator-spotlight-grid">
        {/* YouTube Card */}
        <div className="channel-card yt-channel-card">
          <div className="channel-badge yt-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>YouTube Channel</span>
          </div>
          <div className="channel-body">
            <div className="channel-avatar yt-avatar">▶</div>
            <div>
              <h4 className="channel-name">Pratham Coding World</h4>
              <p className="channel-handle">@prathamcodingworld</p>
            </div>
          </div>
          <p className="channel-desc">
            In-depth coding masterclasses covering React 19, modern CSS animations, Web Audio API, and complete in-browser applications with clean code breakdowns.
          </p>
          <div className="channel-tags">
            <span className="c-tag">#React19</span>
            <span className="c-tag">#JavaScript</span>
            <span className="c-tag">#CSS3</span>
            <span className="c-tag">#WebProjects</span>
          </div>
          <div className="channel-footer">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-channel btn-yt"
              title="Open Pratham Coding World on YouTube"
            >
              <span>▶</span> Subscribe on YouTube ↗
            </a>
          </div>
        </div>

        {/* Instagram Card */}
        <div className="channel-card ig-channel-card">
          <div className="channel-badge ig-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram Creator</span>
          </div>
          <div className="channel-body">
            <div className="channel-avatar ig-avatar">IG</div>
            <div>
              <h4 className="channel-name">Dev By Pratham</h4>
              <p className="channel-handle">@devbypratham</p>
            </div>
          </div>
          <p className="channel-desc">
            Daily rapid developer tips, 60-second coding reels, UI/UX design teardowns, modern CSS tricks, and behind-the-scenes developer setup in Ahmedabad.
          </p>
          <div className="channel-tags">
            <span className="c-tag">#CodingReels</span>
            <span className="c-tag">#FrontendTips</span>
            <span className="c-tag">#UIUX</span>
            <span className="c-tag">#DevLife</span>
          </div>
          <div className="channel-footer">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-channel btn-ig"
              title="Open @devbypratham on Instagram"
            >
              <span>📸</span> Follow @devbypratham ↗
            </a>
          </div>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="creator-tabs-bar" role="tablist" aria-label="Creator content categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={`creator-tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          🌟 All Content ({YOUTUBE_VIDEOS.length + INSTAGRAM_REELS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "youtube"}
          className={`creator-tab-btn ${activeTab === "youtube" ? "active" : ""}`}
          onClick={() => setActiveTab("youtube")}
        >
          ▶ YouTube Tutorials ({YOUTUBE_VIDEOS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "instagram"}
          className={`creator-tab-btn ${activeTab === "instagram" ? "active" : ""}`}
          onClick={() => setActiveTab("instagram")}
        >
          📸 Instagram Reels ({INSTAGRAM_REELS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "snippets"}
          className={`creator-tab-btn ${activeTab === "snippets" ? "active" : ""}`}
          onClick={() => setActiveTab("snippets")}
        >
          💻 Copyable Code Snippets
        </button>
      </div>

      {/* Content Feed */}
      <div className="creator-content-grid">
        {/* Render YouTube cards if tab is 'all' or 'youtube' */}
        {(activeTab === "all" || activeTab === "youtube") &&
          YOUTUBE_VIDEOS.map((video) => (
            <article className="creator-card yt-item-card" key={video.id}>
              <div className="creator-card-header">
                <span className="item-pill yt-pill">
                  <span>▶</span> YouTube Masterclass
                </span>
                <span className="item-duration">{video.duration}</span>
              </div>
              <h4 className="item-title">{video.title}</h4>
              <p className="item-desc">{video.description}</p>
              
              <div className="item-topics">
                {video.topics.map((t, idx) => (
                  <span className="topic-badge" key={idx}>{t}</span>
                ))}
              </div>

              {/* Code snippet expandable preview */}
              <div className="item-code-box">
                <div className="code-box-header">
                  <span className="code-box-title">Featured Logic</span>
                  <button
                    type="button"
                    className="btn-copy-code"
                    onClick={() => handleCopyCode(video.id, video.codePreview)}
                    title="Copy code to clipboard"
                  >
                    {copiedId === video.id ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <pre><code>{video.codePreview}</code></pre>
              </div>

              <div className="creator-card-actions">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-card-link yt-link"
                >
                  Watch on YouTube <span>↗</span>
                </a>
                <button
                  type="button"
                  className="btn-card-preview"
                  onClick={() => setPreviewItem(video)}
                >
                  Quick Summary
                </button>
              </div>
            </article>
          ))}

        {/* Render Instagram cards if tab is 'all' or 'instagram' */}
        {(activeTab === "all" || activeTab === "instagram") &&
          INSTAGRAM_REELS.map((reel) => (
            <article className="creator-card ig-item-card" key={reel.id}>
              <div className="creator-card-header">
                <span className="item-pill ig-pill">
                  <span>📸</span> Reel · {reel.tag}
                </span>
                <span className="item-metrics">👁️ {reel.views}</span>
              </div>
              <h4 className="item-title">{reel.title}</h4>
              <p className="item-desc">{reel.summary}</p>

              <div className="item-topics">
                {reel.topics.map((t, idx) => (
                  <span className="topic-badge" key={idx}>{t}</span>
                ))}
              </div>

              {/* Code snippet preview */}
              <div className="item-code-box">
                <div className="code-box-header">
                  <span className="code-box-title">Reel Code Snippet</span>
                  <button
                    type="button"
                    className="btn-copy-code"
                    onClick={() => handleCopyCode(reel.id, reel.codeSnippet)}
                    title="Copy snippet"
                  >
                    {copiedId === reel.id ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <pre><code>{reel.codeSnippet}</code></pre>
              </div>

              <div className="creator-card-actions">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-card-link ig-link"
                >
                  Watch Reel on IG <span>↗</span>
                </a>
                <button
                  type="button"
                  className="btn-card-preview"
                  onClick={() => setPreviewItem(reel)}
                >
                  Quick Details
                </button>
              </div>
            </article>
          ))}

        {/* Snippets dedicated view */}
        {activeTab === "snippets" && (
          <div className="snippets-dedicated-list">
            {[...YOUTUBE_VIDEOS, ...INSTAGRAM_REELS].map((item) => {
              const code = item.codePreview || item.codeSnippet;
              return (
                <div className="snippet-expanded-card" key={`snippet-${item.id}`}>
                  <div className="snippet-head">
                    <div>
                      <span className="snippet-source">
                        {item.duration ? "▶ YouTube Masterclass" : "📸 Instagram Reel"}
                      </span>
                      <h5>{item.title}</h5>
                    </div>
                    <button
                      type="button"
                      className="btn-copy-code lg"
                      onClick={() => handleCopyCode(item.id, code)}
                    >
                      {copiedId === item.id ? "✓ Copied to Clipboard!" : "📋 Copy Snippet"}
                    </button>
                  </div>
                  <pre><code>{code}</code></pre>
                  <div className="snippet-footer">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="snippet-learn-more"
                    >
                      Learn full implementation on {item.duration ? "YouTube (@prathamcodingworld)" : "Instagram (@devbypratham)"} ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Creator Value Banner */}
      <div className="creator-community-banner">
        <div className="community-banner-content">
          <h4>Want to level up your coding skills or build a modern project?</h4>
          <p>
            Subscribe to <strong>Pratham Coding World</strong> for in-depth engineering deep dives, or follow <strong>@devbypratham</strong> for daily frontend tips, design trends, and React patterns.
          </p>
        </div>
        <div className="community-banner-actions">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-community-yt"
          >
            ▶ Subscribe on YouTube
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-community-ig"
          >
            📸 Follow on Instagram
          </a>
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewItem && (
        <div
          className="creator-modal-backdrop"
          onClick={() => setPreviewItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="creator-modal" onClick={(e) => e.stopPropagation()}>
            <div className="creator-modal-header">
              <span className="item-pill">
                {previewItem.duration ? "▶ YouTube Tutorial" : "📸 Instagram Reel"}
              </span>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setPreviewItem(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <h3>{previewItem.title}</h3>
            <p className="modal-desc">{previewItem.description || previewItem.summary}</p>
            
            <div className="modal-code-block">
              <div className="code-box-header">
                <span>Code Breakdown</span>
                <button
                  type="button"
                  className="btn-copy-code"
                  onClick={() =>
                    handleCopyCode(
                      previewItem.id,
                      previewItem.codePreview || previewItem.codeSnippet
                    )
                  }
                >
                  {copiedId === previewItem.id ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre>
                <code>{previewItem.codePreview || previewItem.codeSnippet}</code>
              </pre>
            </div>

            <div className="modal-actions">
              <a
                href={previewItem.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {previewItem.duration ? "Watch on YouTube ↗" : "Watch on Instagram ↗"}
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPreviewItem(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
