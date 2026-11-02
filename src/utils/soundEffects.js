// Web Audio API Sound Effects Synthesizer (Silenced / Disabled for clean, professional UX)
class SoundFX {
  constructor() {
    this.enabled = false;
  }

  init() {}

  isEnabled() {
    return false;
  }

  toggleSound() {
    return false;
  }

  playTone() {}

  playClick() {}

  playPop() {}

  playSuccess() {}

  playThemeToggle() {}
}

export const soundFX = new SoundFX();
