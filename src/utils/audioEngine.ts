/**
 * Procedural Web Audio Engine for Marvel Avengers: Doomsday Experience
 * Generates cinematic ambient drones, mechanical clockwork ticks, and incursion alerts.
 */

class DoomAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private volume: number = 0.2; // 20% default volume
  private droneGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean): boolean {
    this.initContext();
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (!muted && !this.isDroneActive) {
      this.startDrone();
    } else if (muted && this.isDroneActive) {
      this.stopDrone();
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public startDrone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.isDroneActive) return;

    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(110, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3, this.ctx.currentTime);

      // Low 55Hz (A1) Doom foundation
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Sub-bass 27.5Hz (A0)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(27.5, this.ctx.currentTime);

      this.droneOsc1.connect(this.filterNode);
      this.droneOsc2.connect(this.filterNode);
      this.filterNode.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.isDroneActive = true;
    } catch {
      // Audio autoplay policy handled
    }
  }

  public stopDrone() {
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.5);
        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.isDroneActive = false;
        }, 600);
      } catch {
        this.isDroneActive = false;
      }
    }
  }

  /**
   * Subtle escapement clock tick
   */
  public playTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
      filter.Q.setValueAtTime(5, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignored
    }
  }

  /**
   * Mystic Latverian gong/bell on user action or milestone
   */
  public playMysticChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const freqs = [110, 164.8, 220, 329.6]; // Minor chord tones
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const startTime = this.ctx.currentTime + idx * 0.03;
        gain.gain.setValueAtTime(0.12 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 2.6);
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Multiverse Incursion Warning Siren
   */
  public playIncursionAlert() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      const t = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.linearRampToValueAtTime(440, t + 0.3);
      osc.frequency.linearRampToValueAtTime(220, t + 0.6);
      osc.frequency.linearRampToValueAtTime(520, t + 0.9);
      osc.frequency.linearRampToValueAtTime(180, t + 1.2);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.5);
    } catch {
      // Ignored
    }
  }
}

export const doomAudio = new DoomAudioEngine();
