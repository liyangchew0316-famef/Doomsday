import React, { useState, useEffect, useRef } from 'react';
import { CountdownTime } from '../types';
import { doomAudio } from '../utils/audioEngine';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Calendar, 
  Share2, 
  Check, 
  Clock, 
  Sparkles
} from 'lucide-react';

interface DoomsdayClockProps {
  onOpenReference?: () => void;
}

// Fixed target: Avengers: Doomsday release date
const TARGET_RELEASE = new Date('2026-12-18T00:00:00Z').getTime();
const STREAM_ORIGIN = new Date('2026-01-13T12:00:00Z').getTime();

export const DoomsdayClock: React.FC<DoomsdayClockProps> = ({ onOpenReference }) => {
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [viewerCount, setViewerCount] = useState<number>(152480);
  const [tickSoundEnabled, setTickSoundEnabled] = useState<boolean>(false);
  
  const lastSecondRef = useRef<number>(-1);

  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    totalMs: 0,
    progressPercent: 0,
  });

  // Calculate live countdown with 25ms precision for smooth milliseconds
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, TARGET_RELEASE - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((diff % 1000) / 10); // 00 - 99

      const totalSpan = TARGET_RELEASE - STREAM_ORIGIN;
      const elapsed = Math.max(0, now - STREAM_ORIGIN);
      const progressPercent = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100));

      if (seconds !== lastSecondRef.current) {
        lastSecondRef.current = seconds;
        if (tickSoundEnabled && !isAudioMuted) {
          doomAudio.playTick();
        }
      }

      setTime({
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        totalMs: diff,
        progressPercent,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 25);
    return () => clearInterval(interval);
  }, [tickSoundEnabled, isAudioMuted]);

  // Subtle natural viewer count oscillation
  useEffect(() => {
    const vInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor((Math.random() - 0.48) * 16));
    }, 3000);
    return () => clearInterval(vInterval);
  }, []);

  const handleToggleAudio = () => {
    const newMuteState = !isAudioMuted;
    setIsAudioMuted(newMuteState);
    doomAudio.setMute(newMuteState);
    if (!newMuteState) {
      doomAudio.playMysticChime();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCopyShare = () => {
    const shareText = `T-minus ${time.days}d ${time.hours}h ${time.minutes}m until Marvel Studios' Avengers: Doomsday! The Incursion approaches: ${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedLink(true);
      doomAudio.playMysticChime();
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCalendarExport = () => {
    const title = encodeURIComponent("Marvel Studios' Avengers: Doomsday Theatrical Release");
    const details = encodeURIComponent("Zero Hour: Robert Downey Jr. stars as Doctor Doom in Avengers: Doomsday directed by Anthony and Joe Russo.");
    const location = encodeURIComponent("Theaters Worldwide & IMAX");
    const dates = "20261218T000000Z/20261218T030000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-stone-950 via-zinc-950 to-black border border-emerald-900/60 shadow-[0_0_80px_rgba(16,185,129,0.18)] overflow-hidden">
      
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-25 z-10" />

      {/* Top Stream Status Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-emerald-950/80 bg-zinc-950/80 backdrop-blur-md">
        
        {/* Left: Broadcast indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/70 border border-red-700/60 text-red-400 font-mono-code text-xs font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
            LIVE // MARVEL STUDIOS
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-code text-emerald-400/80">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            <span>LATVERIAN QUANTUM FEED</span>
          </div>
          <span className="text-xs text-zinc-400 font-mono-code">
            {viewerCount.toLocaleString()} watching
          </span>
        </div>

        {/* Right: Sound & Screen controls */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors border cursor-pointer ${
              isAudioMuted
                ? 'bg-zinc-900/80 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
            title={isAudioMuted ? 'Unmute Cinematic Audio' : 'Mute Audio'}
            aria-label="Toggle Sound"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Tick SFX toggle */}
          <button
            onClick={() => setTickSoundEnabled(!tickSoundEnabled)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code transition-colors border cursor-pointer ${
              tickSoundEnabled
                ? 'bg-emerald-900/40 border-emerald-600/70 text-emerald-300'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-500 hover:text-zinc-400'
            }`}
            title="Toggle Clock Escapement Tick"
          >
            Tick: {tickSoundEnabled ? 'ON' : 'OFF'}
          </button>

          {/* Calendar export */}
          <button
            onClick={handleCalendarExport}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Add to Google Calendar"
            aria-label="Add to Calendar"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleCopyShare}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Share countdown"
            aria-label="Share countdown link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Centerpiece Doomsday Clock Body */}
      <div className="relative z-20 px-4 sm:px-8 py-10 sm:py-16 flex flex-col items-center justify-center text-center">
        
        {/* Title & Badge */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-emerald-500/80" />
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded border border-emerald-600/40 bg-emerald-950/30 text-emerald-400 font-mono-code text-[11px] tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              OFFICIAL COUNTDOWN LIVESTREAM
            </div>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-emerald-500/80" />
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 drop-shadow-lg">
            AVENGERS: DOOMSDAY
          </h1>

          <div className="font-mono-code text-xs sm:text-sm text-emerald-400/90 tracking-widest uppercase mt-2">
            THE DOOMSDAY CLOCK
          </div>
        </div>

        {/* Central Dial with concentric glowing gear rings */}
        <div className="relative w-full max-w-4xl my-3 sm:my-6 flex items-center justify-center">
          
          {/* Concentric magical rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full border border-emerald-500/40 border-dashed animate-spin-slow" />
            <div className="absolute w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full border border-yellow-500/20 animate-spin-reverse-slow" />
            <div className="absolute w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] rounded-full border border-emerald-400/30" />
          </div>

          {/* Chronometer Digital Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 w-full max-w-3xl">
            
            {/* DAYS */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-emerald-900/70 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-6xl md:text-7xl font-mono-code font-extrabold text-emerald-400 doom-glow-text tracking-tighter">
                {String(time.days).padStart(3, '0')}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-zinc-400">
                DAYS
              </div>
            </div>

            {/* HOURS */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-emerald-900/70 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-6xl md:text-7xl font-mono-code font-extrabold text-emerald-400 doom-glow-text tracking-tighter">
                {String(time.hours).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-zinc-400">
                HOURS
              </div>
            </div>

            {/* MINUTES */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-emerald-900/70 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-6xl md:text-7xl font-mono-code font-extrabold text-emerald-400 doom-glow-text tracking-tighter">
                {String(time.minutes).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-zinc-400">
                MINUTES
              </div>
            </div>

            {/* SECONDS */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-emerald-900/70 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-6xl md:text-7xl font-mono-code font-extrabold text-emerald-400 doom-glow-text tracking-tighter">
                {String(time.seconds).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-zinc-400">
                SECONDS
              </div>
            </div>

            {/* MILLISECONDS */}
            <div className="col-span-2 sm:col-span-4 md:col-span-1 p-4 sm:p-6 rounded-xl bg-gradient-to-b from-emerald-950/40 to-black/90 border border-yellow-700/60 shadow-[0_0_35px_rgba(234,179,8,0.12)] flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-5xl md:text-6xl font-mono-code font-black text-yellow-400 doom-glow-gold tracking-tighter">
                .{String(time.milliseconds).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-yellow-400/80">
                MILLISEC
              </div>
            </div>

          </div>

        </div>

        {/* Global Timeline Progress Bar */}
        <div className="w-full max-w-2xl mt-4 sm:mt-6 px-2">
          <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              Stream Started: Jan 13, 2026
            </span>
            <span className="font-semibold text-emerald-300">
              {time.progressPercent.toFixed(1)}%
            </span>
            <span className="text-zinc-400">
              Release: Dec 18, 2026
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-yellow-400 transition-all duration-300 relative"
              style={{ width: `${time.progressPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_10px_#ffffff]" />
            </div>
          </div>
        </div>

        {/* Theatrical Subtitle */}
        <div className="mt-8 font-mono-code text-xs sm:text-sm text-zinc-400 flex flex-wrap items-center justify-center gap-2">
          <span>ZERO HOUR</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-semibold">DECEMBER 18, 2026</span>
          <span aria-hidden="true">·</span>
          <span>THEATERS & IMAX</span>
        </div>

      </div>

    </div>
  );
};
