// Web Audio API Sound Effects Synthesizer
// Pure browser synthesis - 0 external files, 0 load time, instant micro-interactions

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    try {
      const stored = localStorage.getItem("ui_sound_enabled");
      this.enabled = stored === "true";
    } catch {
      this.enabled = false;
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  isEnabled() {
    return this.enabled;
  }

  toggleSound() {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem("ui_sound_enabled", String(this.enabled));
    } catch {}
    if (this.enabled) {
      this.init();
      this.playTone(520, 0.08, "sine", 0.05);
      setTimeout(() => this.playTone(780, 0.12, "sine", 0.06), 80);
    }
    return this.enabled;
  }

  playTone(freq, duration = 0.05, type = "sine", gainVal = 0.04) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or suspended
    }
  }

  // Crisp micro-click for buttons & links
  playClick() {
    this.playTone(850, 0.035, "sine", 0.03);
  }

  // Soft pop for chips, tabs, and filters
  playPop() {
    this.playTone(420, 0.045, "triangle", 0.04);
  }

  // Success chime for copied email, submitted form
  playSuccess() {
    this.playTone(587.33, 0.08, "sine", 0.04);
    setTimeout(() => this.playTone(880, 0.14, "sine", 0.05), 90);
  }

  // Theme switch whoosh
  playThemeToggle() {
    this.playTone(330, 0.06, "sine", 0.03);
    setTimeout(() => this.playTone(660, 0.09, "sine", 0.04), 60);
  }
}

export const soundFX = new SoundFX();

