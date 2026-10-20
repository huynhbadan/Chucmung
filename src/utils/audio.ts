/**
 * Web Audio API synthesizer for romantic 20/10 gift box sound effects & ambient music.
 * Zero external audio file dependencies ensures 100% offline reliability & no broken CORS.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  /**
   * Magical chime burst when opening gift box
   */
  public playOpenChimes() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0]; // C5, E5, G5, C6, E6, G6, C7
      const startTime = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Bell-like sine + triangle blend
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

        const noteStart = startTime + idx * 0.08;
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.2);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 1.3);
      });
    } catch {
      // Audio playback best effort
    }
  }

  /**
   * Soft paper flutter / whisper when receiving next wish
   */
  public playNextWishSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, t + 0.18); // E6

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch {
      // Audio playback best effort
    }
  }

  /**
   * Gentle click feedback
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // Audio playback best effort
    }
  }

  /**
   * Romantic ambient music generator (celesta & harp chord arpeggios)
   */
  public startRomanticMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    this.isMusicPlaying = true;

    // Progression: Cmaj9 -> Am9 -> Fmaj9 -> Gsus4 -> G
    const chords = [
      [261.63, 329.63, 392.0, 493.88, 587.33], // C, E, G, B, D
      [220.0, 261.63, 329.63, 392.0, 493.88],  // A, C, E, G, B
      [174.61, 261.63, 329.63, 349.23, 440.0], // F, C, E, F, A
      [196.0, 261.63, 293.66, 392.0, 493.88],  // G, C, D, G, B
    ];

    let chordIdx = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterGain) return;

      const currentChord = chords[chordIdx];
      const freq = currentChord[step % currentChord.length];

      if (!this.isMuted) {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = this.ctx.currentTime;

          // Warm flute/harp timbre
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(0.045, t + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(t);
          osc.stop(t + 1.3);
        } catch {
          // ignore
        }
      }

      step++;
      if (step >= 8) {
        step = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      this.musicTimer = window.setTimeout(playStep, 450);
    };

    playStep();
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopRomanticMusic();
      return false;
    } else {
      this.startRomanticMusic();
      return true;
    }
  }
}

export const soundManager = new SoundController();
