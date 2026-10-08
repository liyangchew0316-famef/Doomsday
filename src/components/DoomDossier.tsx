import React, { useState } from 'react';
import { doomAudio } from '../utils/audioEngine';
import { Shield, Crown, Sparkles, BookOpen, User, Flame, Skull, Layers } from 'lucide-react';

export const DoomDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doom' | 'secretwars' | 'russo' | 'mask'>('doom');
  const [maskVisorGlow, setMaskVisorGlow] = useState<boolean>(true);

  const handleTabChange = (tab: 'doom' | 'secretwars' | 'russo' | 'mask') => {
    setActiveTab(tab);
    doomAudio.playMysticChime();
  };

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 border border-emerald-900/50 p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-emerald-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              LATVERIAN ARCHIVES // VICTOR VON DOOM
            </h2>
          </div>
          <p className="text-xs font-mono-code text-zinc-400 mt-1">
            Classified intelligence on the sovereign ruler of Latveria and the architect of Battleworld.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono-code">
          <button
            onClick={() => handleTabChange('doom')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'doom' ? 'bg-emerald-600 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Doctor Doom
          </button>
          <button
            onClick={() => handleTabChange('secretwars')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'secretwars' ? 'bg-emerald-600 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Secret Wars
          </button>
          <button
            onClick={() => handleTabChange('russo')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'russo' ? 'bg-emerald-600 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Russo Brothers
          </button>
          <button
            onClick={() => handleTabChange('mask')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'mask' ? 'bg-emerald-600 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Doom Mask
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        
        {/* TAB 1: DOCTOR DOOM */}
        {activeTab === 'doom' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-emerald-900/50">
                <span className="text-xs font-mono-code text-emerald-400">CASTING REVEAL</span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Robert Downey Jr. as Victor von Doom
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  In one of the most stunning announcements in cinema history at San Diego Comic-Con, Marvel Studios revealed that Robert Downey Jr. returns to the MCU—not as Tony Stark, but as Marvel's greatest and most philosophical conqueror: Victor von Doom. Rather than a simple variant, Doom represents the philosophical antithesis of the selfless sacrifice in *Endgame*: a man convinced that only his absolute, uncompromising sovereign rule can rescue the multiverse from total annihilation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-xs font-mono-code text-zinc-400 mb-1">SOVEREIGNTY</div>
                  <div className="text-sm font-semibold text-white">Monarch of Latveria</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Combines sorcery taught by ancient mystic masters with quantum physics exceeding Stark Industries.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-xs font-mono-code text-zinc-400 mb-1">MOTIVATION</div>
                  <div className="text-sm font-semibold text-white">The Incursion Solution</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    While the Avengers squabble over timelines, Doom calculates the exact physics necessary to stitch dying universes into Battleworld.
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar quick stats */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3 font-mono-code text-xs">
              <div className="text-emerald-400 font-bold border-b border-zinc-800 pb-2">
                LATVERIA INTEL DATA
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Subject:</span>
                <span className="text-white">Victor von Doom</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Power Level:</span>
                <span className="text-red-400">Cosmic / Godhood</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Armor:</span>
                <span className="text-zinc-200">Titanium / Mystical Alloy</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Primary Rival:</span>
                <span className="text-cyan-300">Reed Richards</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Domain:</span>
                <span className="text-emerald-300">Castle Doom, Doomstadt</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECRET WARS & BATTLEWORLD */}
        {activeTab === 'secretwars' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/60 border border-emerald-900/50">
              <span className="text-xs font-mono-code text-emerald-400">THE GRAND DESTINY</span>
              <h3 className="text-lg font-bold text-white mt-1">
                From Doomsday to Secret Wars (2027)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                *Avengers: Doomsday* directly sets the stage for *Avengers: Secret Wars*. Rooted in Jonathan Hickman’s celebrated 2015 comic masterpiece, incursions will cause the complete destruction of the multiverse. As the final two universes—Earth-616 and the Ultimate/Mutant reality—collide, all existence is erased, leaving only the fragments stitched together by Victor von Doom into the patchwork planet known as **Battleworld**.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs font-mono-code text-emerald-400 mb-1">01. THE INCURSIONS</div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  Realities collapse into each other like falling dominoes. Earth is always the collision focal point.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs font-mono-code text-emerald-400 mb-1">02. BATTLEWORLD FORGED</div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  Doom harnesses the power of the Beyonders to hold reality together, declaring himself God Emperor Doom.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs font-mono-code text-emerald-400 mb-1">03. THE FINAL RESISTANCE</div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  Surviving Avengers, X-Men, and Fantastic Four ride a life raft to mount the final rebellion against the throne.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RUSSO BROTHERS */}
        {activeTab === 'russo' && (
          <div className="p-4 rounded-xl bg-black/60 border border-emerald-900/50 space-y-3">
            <span className="text-xs font-mono-code text-emerald-400">DIRECTORIAL MASTERY</span>
            <h3 className="text-lg font-bold text-white">
              Anthony & Joe Russo Return to Marvel
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Having directed *Captain America: The Winter Soldier*, *Civil War*, *Avengers: Infinity War*, and *Avengers: Endgame*—the most successful film quartet in Marvel history—the Russo Brothers return alongside longtime collaborator Stephen McFeely writing the script.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800">
              <div className="text-xs text-zinc-400">
                <span className="text-white font-semibold block mb-1">Cinematic Scope</span>
                Shot entirely with IMAX digital cameras to capture the colossal multiversal clashes and panoramic incursions across multiple planets.
              </div>
              <div className="text-xs text-zinc-400">
                <span className="text-white font-semibold block mb-1">Scale of Ensemble</span>
                Bringing together the Avengers, New Avengers, Young Avengers, Thunderbolts, Fantastic Four, and the Fox X-Men in the largest crossover ever attempted.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MASK INSPECTOR */}
        {activeTab === 'mask' && (
          <div className="p-6 rounded-xl bg-black border border-emerald-900/50 flex flex-col items-center justify-center text-center">
            
            {/* Stylized Doom Mask Graphic (SVG) */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-4 flex items-center justify-center">
              {/* Outer glow */}
              <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
                maskVisorGlow ? 'bg-emerald-500/20 blur-2xl animate-pulse' : 'bg-transparent'
              }`} />

              <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                {/* Hood outline */}
                <path
                  d="M 40 180 C 20 120 40 40 100 20 C 160 40 180 120 160 180 C 140 160 120 150 100 150 C 80 150 60 160 40 180 Z"
                  fill="#064e3b"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                {/* Hood folds */}
                <path d="M 100 20 Q 90 70 80 130" stroke="#047857" strokeWidth="2" fill="none" />
                <path d="M 100 20 Q 110 70 120 130" stroke="#047857" strokeWidth="2" fill="none" />

                {/* Steel Mask Plate */}
                <polygon
                  points="65,90 135,90 145,150 130,195 100,205 70,195 55,150"
                  fill="#18181b"
                  stroke="#52525b"
                  strokeWidth="2.5"
                />
                
                {/* Rivets on Mask */}
                <circle cx="70" cy="100" r="2" fill="#a1a1aa" />
                <circle cx="130" cy="100" r="2" fill="#a1a1aa" />
                <circle cx="62" cy="140" r="2" fill="#a1a1aa" />
                <circle cx="138" cy="140" r="2" fill="#a1a1aa" />
                <circle cx="75" cy="185" r="2" fill="#a1a1aa" />
                <circle cx="125" cy="185" r="2" fill="#a1a1aa" />

                {/* Eyes (Glowing slits) */}
                <polygon
                  points="75,120 92,123 90,132 73,128"
                  fill={maskVisorGlow ? '#34d399' : '#1c1917'}
                  filter={maskVisorGlow ? 'drop-shadow(0px 0px 6px #10b981)' : undefined}
                />
                <polygon
                  points="125,120 108,123 110,132 127,128"
                  fill={maskVisorGlow ? '#34d399' : '#1c1917'}
                  filter={maskVisorGlow ? 'drop-shadow(0px 0px 6px #10b981)' : undefined}
                />

                {/* Nasal ridge & mouth grille */}
                <path d="M 100 120 L 100 155" stroke="#71717a" strokeWidth="2" />
                {/* Latverian breathing vent slits */}
                <line x1="88" y1="168" x2="112" y2="168" stroke="#71717a" strokeWidth="2" />
                <line x1="85" y1="175" x2="115" y2="175" stroke="#71717a" strokeWidth="2" />
                <line x1="90" y1="182" x2="110" y2="182" stroke="#71717a" strokeWidth="2" />
              </svg>
            </div>

            <div className="font-cinzel text-lg font-bold text-white mb-1">
              THE RIVETED MASK OF LATVERIA
            </div>
            <div className="text-xs font-mono-code text-zinc-400 max-w-md mb-4">
              Forged in cold Himalayan sorcery, bounded to flesh. When Doom speaks through this visage, galaxies obey.
            </div>

            <button
              onClick={() => {
                setMaskVisorGlow(!maskVisorGlow);
                doomAudio.playMysticChime();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-mono-code text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Toggle Emerald Visor: {maskVisorGlow ? 'ACTIVE' : 'DORMANT'}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
