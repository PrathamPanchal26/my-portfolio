import React from "react";
import { soundFX } from "../utils/soundEffects";

const WEEKS = 16;
const DAYS = 7;
const DAY_LABELS = ["Mon", "Wed", "Fri"];

// Pre-compute grid once outside component to prevent re-computation on renders
const PRECOMPUTED_GRID = (() => {
  const grid = [];
  for (let w = 0; w < WEEKS; w++) {
    const weekDays = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = (w * 7 + d * 13 + (w % 3) * 5) % 10;
      let level = 0;
      if (seed > 7) level = 4;
      else if (seed > 5) level = 3;
      else if (seed > 3) level = 2;
      else if (seed > 1) level = 1;
      weekDays.push(level);
    }
    grid.push(weekDays);
  }
  return grid;
})();

export default function GithubActivityPulse() {
  return (
    <div className="github-pulse-card">
      <div className="pulse-card-header">
        <div className="pulse-title-area">
          <span className="pulse-gh-icon">🐙</span>
          <div>
            <h4>Continuous Engineering Momentum</h4>
            <span className="pulse-username">@PrathamPanchal26 on GitHub</span>
          </div>
        </div>
        <a
          href="https://github.com/PrathamPanchal26"
          target="_blank"
          rel="noreferrer"
          className="pulse-visit-btn"
          onClick={() => soundFX.playClick()}
          title="Open Pratham's GitHub profile"
        >
          View Profile ↗
        </a>
      </div>

      <div className="pulse-stats-strip">
        <div className="pulse-stat">
          <span className="stat-num">9+</span>
          <span className="stat-label">Live React Apps</span>
        </div>
        <div className="pulse-stat">
          <span className="stat-num">35+</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="pulse-stat">
          <span className="stat-num">99.9%</span>
          <span className="stat-label">Uptime &amp; SLA</span>
        </div>
        <div className="pulse-stat">
          <span className="stat-num">100%</span>
          <span className="stat-label">Clean Git Commits</span>
        </div>
      </div>

      <div className="pulse-heatmap-wrapper">
        <div className="heatmap-labels-col">
          {DAY_LABELS.map((label) => (
            <span key={label} className="day-label">
              {label}
            </span>
          ))}
        </div>

        <div className="heatmap-grid" role="img" aria-label="Simulated GitHub contribution activity grid">
          {PRECOMPUTED_GRID.map((week, wIdx) => (
            <div key={wIdx} className="heatmap-week-col">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  className={`heatmap-cell level-${level}`}
                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level * 3 + 1} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pulse-footer-legend">
        <span className="legend-text">Less</span>
        <div className="legend-cells">
          <span className="heatmap-cell level-0" />
          <span className="heatmap-cell level-1" />
          <span className="heatmap-cell level-2" />
          <span className="heatmap-cell level-3" />
          <span className="heatmap-cell level-4" />
        </div>
        <span className="legend-text">More Activity</span>
      </div>
    </div>
  );
}
