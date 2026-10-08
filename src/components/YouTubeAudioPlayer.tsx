import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';

interface YouTubeAudioPlayerProps {
  videoId?: string;
  defaultVolume?: number;
}

export const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({
  videoId = 'FfU9DDVBI9k',
  defaultVolume = 20,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(defaultVolume);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sendCommand = (func: string, args: unknown[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const startPlaying = () => {
    sendCommand('unMute');
    sendCommand('setVolume', [volume]);
    sendCommand('playVideo');
    setIsPlaying(true);
    setIsMuted(false);
    setHasInteracted(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      sendCommand('setVolume', [volume]);
      setIsMuted(false);
      if (!isPlaying) {
        sendCommand('playVideo');
        setIsPlaying(true);
      }
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
      sendCommand('unMute');
    }
    sendCommand('setVolume', [newVol]);
  };

  // Auto-start at volume 20 upon first user click/interaction anywhere
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasInteracted) {
        startPlaying();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [hasInteracted, volume]);

  return (
    <>
      {/* Hidden YouTube Iframe that loops the piano soundtrack at volume 20 */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&playsinline=1&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&origin=${window.location.origin}`}
          title="Avengers Doomsday Piano Background Music"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Sleek Floating Music Pill with Volume Slider */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90 font-montserrat text-xs shadow-xl transition-all">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 cursor-pointer focus:outline-none hover:text-emerald-400 transition-colors"
          title={isPlaying ? "Pause Piano Theme" : "Play Piano Theme"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          )}
          <span className="text-[11px] font-semibold tracking-wide flex items-center gap-1">
            <Music className={`w-3 h-3 text-emerald-400 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">Piano Theme</span>
          </span>
        </button>

        <span className="text-white/20">|</span>

        {/* Volume Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-0.5 hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 || !isPlaying ? (
            <VolumeX className="w-3.5 h-3.5 text-white/50" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          )}
        </button>

        {/* Volume Level Slider & Indicator (Default: 20) */}
        <div className="flex items-center gap-1.5">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 sm:w-20 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
            title={`Sound Volume: ${isMuted ? 0 : volume}%`}
            aria-label="Sound volume"
          />
          <span className="font-mono text-[10px] text-emerald-400 font-bold min-w-[28px] text-right">
            {isMuted ? '0%' : `${volume}%`}
          </span>
        </div>
      </div>
    </>
  );
};
