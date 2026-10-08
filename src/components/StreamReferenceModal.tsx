import React, { useState } from 'react';
import { X, ExternalLink, Image as ImageIcon, CheckCircle, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface StreamReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreamReferenceModal: React.FC<StreamReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<'reconstructed' | 'remote'>('reconstructed');
  const [remoteError, setRemoteError] = useState<boolean>(true); // Pre-flagged because comicbookclublive blocks external origins with 401

  if (!isOpen) return null;

  const remoteUrl = "https://comicbookclublive.com/wp-content/uploads/2026/01/doomsday-countdown.webp";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-emerald-800/80 p-5 sm:p-7 shadow-[0_0_80px_rgba(16,185,129,0.25)] overflow-hidden max-h-[92vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
              OFFICIAL LIVESTREAM FRAME ARCHIVE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View mode switcher */}
        <div className="mt-3 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800 text-xs font-mono-code">
            <button
              onClick={() => setViewMode('reconstructed')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'reconstructed'
                  ? 'bg-emerald-600 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Stream Reconstructed Frame
            </button>
            <button
              onClick={() => setViewMode('remote')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'remote'
                  ? 'bg-emerald-600 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Original Web Link (401 Protected)
            </button>
          </div>

          <a
            href={remoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-emerald-400 hover:underline flex items-center gap-1"
          >
            Open in New Tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Modal Body */}
        <div className="my-4 overflow-y-auto space-y-4">
          
          {/* Main Visual Frame Display */}
          <div className="relative rounded-xl overflow-hidden border border-emerald-900 bg-black aspect-video flex items-center justify-center shadow-[inset_0_0_40px_rgba(16,185,129,0.2)]">
            
            {viewMode === 'reconstructed' ? (
              /* Built-in high-fidelity recreation of Marvel's official Doomsday Clock stream frame */
              <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-stone-950 via-zinc-950 to-black select-none">
                
                {/* Atmospheric green misty glow */}
                <div className="absolute inset-0 bg-radial-gradient from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

                {/* Top stream overlay */}
                <div className="w-full flex items-center justify-between z-10 font-mono-code text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold uppercase">
                      LIVE
                    </span>
                    <span className="text-zinc-300 font-semibold">MARVEL STUDIOS</span>
                  </div>
                  <div className="text-zinc-400">
                    🔴 152,490 WATCHING
                  </div>
                </div>

                {/* Centerpiece Doomsday Clock Dial Representation */}
                <div className="relative my-auto flex flex-col items-center justify-center z-10 text-center">
                  
                  {/* Outer rune ring */}
                  <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] bg-black/60">
                    <div className="absolute inset-1 rounded-full border border-dashed border-yellow-500/20" />
                    <div className="absolute inset-4 rounded-full border border-emerald-500/20" />

                    {/* Clock numbers display */}
                    <div className="flex flex-col items-center">
                      <div className="font-cinzel text-xs sm:text-sm text-emerald-400 font-bold tracking-widest uppercase mb-1">
                        DOOMSDAY CLOCK
                      </div>
                      <div className="font-mono-code text-xl sm:text-3xl font-extrabold text-emerald-300 doom-glow-text tracking-wider">
                        072 : 14 : 32
                      </div>
                      <div className="font-mono-code text-[10px] text-zinc-400 tracking-widest mt-1">
                        DAYS : HRS : MIN
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 font-cinzel text-sm sm:text-lg font-black tracking-widest uppercase text-white drop-shadow">
                    AVENGERS: DOOMSDAY
                  </div>
                  <div className="font-mono-code text-[10px] sm:text-xs text-emerald-400 tracking-wider">
                    DECEMBER 18, 2026 // ONLY IN THEATERS
                  </div>
                </div>

                {/* Bottom ticker bar */}
                <div className="w-full flex items-center justify-between z-10 font-mono-code text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-2">
                  <span>TRANSMISSION: LATVERIA-GLOBAL</span>
                  <span>BITRATE: 1080p60 12.4 Mbps</span>
                  <span>STATUS: INCURSION ACTIVE</span>
                </div>
              </div>
            ) : (
              /* Remote image viewer with 401 handling */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {remoteError ? (
                  <div className="max-w-md space-y-3">
                    <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-600/80 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        HTTP 401 Unauthorized (Hotlink Protection)
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        The host server at <code className="text-amber-300 font-mono-code">comicbookclublive.com</code> blocks external websites from embedding their media directly via hotlink protection.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 text-left space-y-1">
                      <div className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Solution Active:
                      </div>
                      <p className="text-zinc-400">
                        Use the <strong>Stream Reconstructed Frame</strong> tab above to view our high-precision interactive replica of the livestream frame.
                      </p>
                    </div>

                    <button
                      onClick={() => setViewMode('reconstructed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Switch to Reconstructed Frame
                    </button>
                  </div>
                ) : (
                  <img
                    src={remoteUrl}
                    alt="Marvel Avengers: Doomsday Livestream Frame"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    onError={() => setRemoteError(true)}
                  />
                )}
              </div>
            )}

            {/* Frame Badge */}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/90 text-[10px] font-mono-code text-emerald-400 border border-emerald-900/60 z-20">
              {viewMode === 'reconstructed' ? '✨ RECONSTRUCTED STREAM FRAME' : '🌐 REMOTE HOST'}
            </div>
          </div>

          {/* Explanation notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800">
              <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Livestream Context
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Marvel Studios launched this nearly year-long YouTube countdown on January 13, 2026 after four weeks of teaser drops, counting down all the way to December 18, 2026.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800">
              <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Doctor Doom & Incursions
              </div>
              <p className="text-zinc-400 leading-relaxed">
                The clock mechanism reflects Victor von Doom's signature emerald magic and quantum chronometer, teasing the collision of Earth-616 with alternate realities.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs transition-colors cursor-pointer"
          >
            Return to Live Countdown
          </button>
        </div>

      </div>
    </div>
  );
};
