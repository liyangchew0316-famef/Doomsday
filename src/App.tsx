import React, { useState, useEffect, useRef } from 'react';
import bgImage from './assets/doomsday_bg.jpg';
import logoImage from './assets/logo.png';
import { ParticleCanvas } from './components/ParticleCanvas';
import { YouTubeAudioPlayer } from './components/YouTubeAudioPlayer';
import { 
  Maximize2, 
  Minimize2, 
  Calendar, 
  Share2, 
  Check
} from 'lucide-react';

// Marvel Studios' Avengers: Doomsday Theatrical Release Target
const TARGET_DATE = new Date('2026-12-18T00:00:00Z');

function calculateCountdown(now: Date, target: Date) {
  if (now.getTime() >= target.getTime()) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Calculate calendar months remaining
  let temp = new Date(now.getTime());
  let months = 0;

  while (true) {
    const nextMonth = new Date(temp);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth.getTime() <= target.getTime()) {
      temp = nextMonth;
      months++;
    } else {
      break;
    }
  }

  let remMs = target.getTime() - temp.getTime();
  const days = Math.floor(remMs / (1000 * 60 * 60 * 24));
  remMs -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(remMs / (1000 * 60 * 60));
  remMs -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(remMs / (1000 * 60));
  remMs -= minutes * (1000 * 60);

  const seconds = Math.floor(remMs / 1000);

  return { months, days, hours, minutes, seconds };
}

export default function App() {
  const [time, setTime] = useState(() => calculateCountdown(new Date(), TARGET_DATE));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsHovered, setControlsHovered] = useState(false);

  const hideTimerRef = useRef<number | null>(null);

  // Real-time tick every 100ms
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateCountdown(new Date(), TARGET_DATE));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Auto-hide controls for pure cinematic presentation
  useEffect(() => {
    const resetTimer = () => {
      setShowControls(true);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        if (!controlsHovered) {
          setShowControls(false);
        }
      }, 4000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [controlsHovered]);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    const text = `DOOMSDAY IS COMING: ${time.months}M ${time.days}D ${time.hours}H ${time.minutes}M ${time.seconds}S until Marvel Studios' Avengers: Doomsday! ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCalendar = () => {
    const title = encodeURIComponent("Marvel Studios' Avengers: Doomsday Theatrical Release");
    const details = encodeURIComponent("DOOMSDAY IS COMING. Anthony & Joe Russo direct Avengers: Doomsday starring Robert Downey Jr. as Doctor Doom.");
    const location = encodeURIComponent("Theaters Worldwide & IMAX");
    const dates = "20261218T000000Z/20261218T030000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  const formatUnit = (val: number) => {
    const str = String(val).padStart(2, '0');
    return `${str[0]} ${str[1]}`;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none flex items-center justify-center font-montserrat">
      
      {/* Background Image: Weathered Gothic Avengers Monolith with Green Volumetric Light */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Atmospheric Vignette & Deep Shadows matching reference */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_25%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Subtle Volumetric Green Haze behind triangle aperture */}
      <div className="absolute top-[32%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[380px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 60fps Ambient Floating Dust Motes & Embers */}
      <ParticleCanvas density={24} intensity={0.6} />

      {/* TOP LEFT: Official Avengers: Doomsday Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-40 flex items-center pointer-events-auto">
        <img
          src={logoImage}
          alt="Marvel Studios Avengers: Doomsday"
          className="w-36 sm:w-52 md:w-64 lg:w-72 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_24px_rgba(16,185,129,0.5)] transition-all duration-300 select-none cursor-pointer"
          title="Marvel Studios' Avengers: Doomsday"
        />
      </div>

      {/* Centerpiece Countdown: EXACT match to user reference screenshot */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl translate-y-8 sm:translate-y-12">
        
        {/* DOOMSDAY IS COMING Title */}
        <h1 className="font-montserrat text-white text-base sm:text-2xl md:text-[26px] lg:text-[28px] font-extrabold uppercase tracking-[0.22em] sm:tracking-[0.25em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] mb-4 sm:mb-6">
          DOOMSDAY IS COMING
        </h1>

        {/* 1 1  :  0 4  :  1 4  :  5 2  :  2 5 Number & Labels Grid */}
        <div className="flex items-start justify-center text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
          
          {/* MONTHS */}
          <div className="flex flex-col items-center w-14 sm:w-28 md:w-32 lg:w-36">
            <span className="font-montserrat text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] whitespace-nowrap">
              {formatUnit(time.months)}
            </span>
            <span className="font-montserrat text-[8px] sm:text-xs md:text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-300 mt-2 sm:mt-3">
              MONTHS
            </span>
          </div>

          {/* Colon */}
          <span className="font-montserrat text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 px-0.5 sm:px-2 pt-0.5 sm:pt-1">
            :
          </span>

          {/* DAYS */}
          <div className="flex flex-col items-center w-14 sm:w-28 md:w-32 lg:w-36">
            <span className="font-montserrat text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] whitespace-nowrap">
              {formatUnit(time.days)}
            </span>
            <span className="font-montserrat text-[8px] sm:text-xs md:text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-300 mt-2 sm:mt-3">
              DAYS
            </span>
          </div>

          {/* Colon */}
          <span className="font-montserrat text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 px-0.5 sm:px-2 pt-0.5 sm:pt-1">
            :
          </span>

          {/* HOURS */}
          <div className="flex flex-col items-center w-14 sm:w-28 md:w-32 lg:w-36">
            <span className="font-montserrat text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] whitespace-nowrap">
              {formatUnit(time.hours)}
            </span>
            <span className="font-montserrat text-[8px] sm:text-xs md:text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-300 mt-2 sm:mt-3">
              HOURS
            </span>
          </div>

          {/* Colon */}
          <span className="font-montserrat text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 px-0.5 sm:px-2 pt-0.5 sm:pt-1">
            :
          </span>

          {/* MINUTES */}
          <div className="flex flex-col items-center w-14 sm:w-28 md:w-32 lg:w-36">
            <span className="font-montserrat text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] whitespace-nowrap">
              {formatUnit(time.minutes)}
            </span>
            <span className="font-montserrat text-[8px] sm:text-xs md:text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-300 mt-2 sm:mt-3">
              MINUTES
            </span>
          </div>

          {/* Colon */}
          <span className="font-montserrat text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 px-0.5 sm:px-2 pt-0.5 sm:pt-1">
            :
          </span>

          {/* SECONDS */}
          <div className="flex flex-col items-center w-14 sm:w-28 md:w-32 lg:w-36">
            <span className="font-montserrat text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] whitespace-nowrap">
              {formatUnit(time.seconds)}
            </span>
            <span className="font-montserrat text-[8px] sm:text-xs md:text-[13px] font-bold tracking-[0.18em] uppercase text-zinc-300 mt-2 sm:mt-3">
              SECONDS
            </span>
          </div>

        </div>

      </div>

      {/* Floating Controls: YouTube Piano Soundtrack Player & Utility Icons */}
      <div 
        onMouseEnter={() => setControlsHovered(true)}
        onMouseLeave={() => setControlsHovered(false)}
        className={`absolute top-4 right-4 z-40 flex items-center gap-2.5 transition-opacity duration-500 ${
          showControls || controlsHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* YouTube Background Music Player (FfU9DDVBI9k) controlled at volume 20 */}
        <YouTubeAudioPlayer videoId="FfU9DDVBI9k" defaultVolume={20} />

        {/* Google Calendar Add */}
        <button
          onClick={handleCalendar}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
          title="Add December 18, 2026 to Google Calendar"
          aria-label="Add to Calendar"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>

        {/* Share Link */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
          title="Share countdown"
          aria-label="Share countdown"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>

        {/* Fullscreen Mode */}
        <button
          onClick={handleToggleFullscreen}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

    </div>
  );
}
