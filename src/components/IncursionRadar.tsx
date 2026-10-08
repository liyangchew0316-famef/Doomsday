import React, { useState } from 'react';
import { UniverseNode } from '../types';
import { doomAudio } from '../utils/audioEngine';
import { AlertTriangle, Globe, Shield, Orbit, Eye, Zap, Crosshair } from 'lucide-react';

const UNIVERSES: UniverseNode[] = [
  {
    id: 'earth-616',
    designation: 'Earth-616',
    name: 'Sacred Timeline MCU',
    status: 'Incursion Looming',
    riskScore: 94,
    coordinates: { x: 50, y: 50 },
    color: '#10b981', // Emerald
    description: 'The core Marvel Cinematic Universe. Severe multiversal fractures following the death of He Who Remains and multiple unauthorized timeline spells.',
    heroes: ['Thor', 'Sam Wilson (Cap)', 'Doctor Strange', 'Spider-Man', 'Shuri', 'Thunderbolts'],
    doomNotes: 'Ground zero for the ultimate convergence. Vibranium reserves and magical nexus points will serve as the keystone for Battleworld.',
  },
  {
    id: 'earth-828',
    designation: 'Earth-1961',
    name: 'The Fantastic Four Universe',
    status: 'Critical',
    riskScore: 98,
    coordinates: { x: 28, y: 35 },
    color: '#38bdf8', // Cyan / F4 blue
    description: 'A 1960s retro-futuristic alternate universe inhabited by the First Family. Galactus incursion drove their reality toward total collapse.',
    heroes: ['Reed Richards (Mister Fantastic)', 'Sue Storm', 'Johnny Storm', 'Ben Grimm (The Thing)'],
    doomNotes: 'Reed Richards must witness what he failed to calculate. His intellect belongs in service to Latveria.',
  },
  {
    id: 'earth-10005',
    designation: 'Earth-10005',
    name: 'Mutant / X-Men Timeline',
    status: 'Collapsing',
    riskScore: 89,
    coordinates: { x: 72, y: 30 },
    color: '#eab308', // Gold / X-Men yellow
    description: 'The Fox-era mutant reality anchor timeline. Following anchor-being destabilization, time-ripper anomalies have torn holes through the dimensional boundary.',
    heroes: ['Logan / Wolverine', 'Charles Xavier', 'Magneto', 'Cyclops', 'Storm', 'Deadpool'],
    doomNotes: 'Mutant genetics possess extraordinary multiversal stability. The survivors shall form the Iron Legion vanguard.',
  },
  {
    id: 'earth-838',
    designation: 'Earth-838',
    name: 'Illuminati Reality',
    status: 'Critical',
    riskScore: 91,
    coordinates: { x: 32, y: 72 },
    color: '#a855f7', // Purple
    description: 'Reality previously governed by the Illuminati council. The death of their senior council created a catastrophic power vacuum and multiversal bleed.',
    heroes: ['Baxter Foundation Surviving Council', 'Ultron Sentry Remnants', 'Mordo'],
    doomNotes: 'Their arrogance was their downfall. Salvaged Ultron protocols have already been re-encoded with Latverian cipher.',
  },
  {
    id: 'battleworld',
    designation: 'Sector-000',
    name: 'Battleworld Singularity',
    status: 'Protected',
    riskScore: 100,
    coordinates: { x: 75, y: 70 },
    color: '#ef4444', // Red
    description: 'The destination realm forged from the remnants of dying timelines by Doctor Doom. The crucible where all factions must vie for dominion.',
    heroes: ['The Thor Corps', 'Barons of Latveria', 'Black Swans'],
    doomNotes: 'All that is, all that was, and all that ever shall be. Only Doom can preserve existence from the Void.',
  },
];

export const IncursionRadar: React.FC = () => {
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseNode>(UNIVERSES[0]);
  const [isSimulatingCollision, setIsSimulatingCollision] = useState<boolean>(false);

  const handleSelectUniverse = (u: UniverseNode) => {
    setSelectedUniverse(u);
    doomAudio.playMysticChime();
  };

  const handleSimulate = () => {
    setIsSimulatingCollision(true);
    doomAudio.playIncursionAlert();
    setTimeout(() => {
      setIsSimulatingCollision(false);
    }, 4000);
  };

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 border border-emerald-900/50 p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Orbit className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              MULTIVERSE INCURSION RADAR
            </h2>
          </div>
          <p className="text-xs font-mono-code text-zinc-400 mt-1">
            Tracking dimensional boundary erosion across intersecting Marvel realities.
          </p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulatingCollision}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all border cursor-pointer ${
            isSimulatingCollision
              ? 'bg-red-950 border-red-500 text-red-300 animate-pulse'
              : 'bg-zinc-900 hover:bg-zinc-800 border-red-900/60 text-red-400 hover:text-red-300'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          {isSimulatingCollision ? 'SIMULATING COLLISION...' : 'Test Incursion Alert'}
        </button>
      </div>

      {/* Main Grid: Radar Screen + Reality Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Radar Viewport (7 Cols) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] rounded-xl bg-black border border-emerald-950 p-4 overflow-hidden">
          
          {/* Radar background grid & sweep */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Concentric rings */}
            <div className="w-[360px] h-[360px] rounded-full border border-emerald-500/20" />
            <div className="absolute w-[260px] h-[260px] rounded-full border border-emerald-500/20 border-dashed" />
            <div className="absolute w-[160px] h-[160px] rounded-full border border-emerald-500/30" />
            <div className="absolute w-[60px] h-[60px] rounded-full border border-red-500/40 bg-red-950/20" />
            {/* Crosshairs */}
            <div className="absolute w-full h-px bg-emerald-500/15" />
            <div className="absolute h-full w-px bg-emerald-500/15" />
            {/* Rotating radar sweep */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-transparent to-transparent animate-spin-slow pointer-events-none origin-center" />
          </div>

          {/* Collision Simulation Wave Alert */}
          {isSimulatingCollision && (
            <div className="absolute inset-0 bg-red-950/40 backdrop-blur-[2px] flex items-center justify-center z-20 animate-pulse">
              <div className="p-4 rounded-xl border border-red-500 bg-black/90 text-center max-w-sm">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2 animate-bounce" />
                <div className="text-red-400 font-mono-code font-bold text-sm tracking-wider uppercase">
                  DIMENSIONAL COLLAPSE IMMINENT
                </div>
                <div className="text-zinc-400 text-xs mt-1">
                  Earth-616 and Earth-1961 boundary velocity exceeding critical threshold.
                </div>
              </div>
            </div>
          )}

          {/* Universe Interactive Nodes */}
          <div className="relative w-full h-full min-h-[360px] sm:min-h-[400px]">
            {UNIVERSES.map((u) => {
              const isSelected = u.id === selectedUniverse.id;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUniverse(u)}
                  style={{ left: `${u.coordinates.x}%`, top: `${u.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer focus:outline-none"
                  aria-label={`Inspect ${u.name}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing beacon ring */}
                    <div
                      className={`absolute w-12 h-12 rounded-full transition-all ${
                        isSelected ? 'animate-ping opacity-60' : 'opacity-20 group-hover:opacity-40'
                      }`}
                      style={{ backgroundColor: u.color }}
                    />
                    
                    {/* Node Core */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'scale-125 shadow-[0_0_20px_rgba(255,255,255,0.8)] border-white'
                          : 'border-zinc-400 group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: u.color }}
                    >
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black font-black" />
                    </div>

                    {/* Tag label */}
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-zinc-700/80 text-[10px] sm:text-xs font-mono-code text-zinc-300 group-hover:text-white pointer-events-none">
                      {u.designation}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Coordinate HUD footer */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono-code text-zinc-500 pointer-events-none">
            <span>GRID: LATVERIA-TVA_SYNC</span>
            <span>POLARITY: NEGATIVE</span>
            <span>DESTABILIZATION: 89.4%</span>
          </div>
        </div>

        {/* Selected Reality Inspection Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-zinc-900/60 border border-zinc-800 p-5">
          <div>
            {/* Reality Title & Status */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono-code text-emerald-400 font-bold">
                  {selectedUniverse.designation}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedUniverse.name}
                </h3>
              </div>

              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono-code font-bold uppercase ${
                  selectedUniverse.status === 'Critical' || selectedUniverse.status === 'Collapsing'
                    ? 'bg-red-950/80 text-red-400 border border-red-800'
                    : selectedUniverse.status === 'Incursion Looming'
                    ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                }`}>
                  {selectedUniverse.status}
                </span>
                <div className="text-[10px] font-mono-code text-zinc-500 mt-1">
                  Risk: {selectedUniverse.riskScore}/100
                </div>
              </div>
            </div>

            {/* Incursion Gauge */}
            <div className="my-4">
              <div className="flex justify-between text-xs font-mono-code text-zinc-400 mb-1.5">
                <span>Incursion Proximity</span>
                <span className="text-red-400 font-bold">{selectedUniverse.riskScore}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-500"
                  style={{ width: `${selectedUniverse.riskScore}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {selectedUniverse.description}
            </p>

            {/* Key Heroes / Key Factions */}
            <div className="mb-4">
              <div className="text-xs font-mono-code uppercase text-zinc-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Active Dimensional Defenders:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedUniverse.heroes.map((hero, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-200"
                  >
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            {/* Victor von Doom Classified Note */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/60">
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 font-semibold mb-1 uppercase">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                Latverian Classified Surveillance Log:
              </div>
              <p className="text-xs text-emerald-200/90 italic">
                "{selectedUniverse.doomNotes}"
              </p>
            </div>
          </div>

          {/* Quick Reality Switcher buttons */}
          <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono-code text-zinc-500">
            <span>QUICK FOCUS:</span>
            <div className="flex gap-1.5">
              {UNIVERSES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleSelectUniverse(u)}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    selectedUniverse.id === u.id
                      ? 'bg-emerald-600 text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {u.designation.replace('Earth-', '')}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
