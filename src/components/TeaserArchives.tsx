import React, { useState } from 'react';
import { TeaserDrop } from '../types';
import { doomAudio } from '../utils/audioEngine';
import { Play, Volume2, Shield, Zap, Sparkles, Binary, CheckCircle2, ChevronRight } from 'lucide-react';

const TEASERS: TeaserDrop[] = [
  {
    id: 'teaser-1',
    title: 'Teaser I: The Nomad Frequency',
    releaseDate: 'Dec 19, 2025',
    codename: 'BEACON_ROGERS',
    tagline: 'Steve Rogers (Chris Evans) signal detected across the temporal river.',
    description: 'A dark frame showing a worn, scarred compass opening to Peggy Carter’s photo, followed by boots crunching on ruined soil. An audio transmission crackles: "We gave everything to stop Thanos. But this time... the universe itself is breaking."',
    clues: [
      'Compass needle spins erratically in the presence of green Latverian chronal radiation.',
      'Background radio reveals emergency broadcast frequencies from Earth-616 and Earth-838 simultaneously.',
      'Steve Rogers rumored to return not as Captain America, but as the multiverse Nomad assembling survivors.',
    ],
    keyQuotes: '"If we are to survive what comes next... we will need every shield that ever stood."',
    soundFrequency: '432 Hz Chronal Resonance',
    status: 'Decoded',
  },
  {
    id: 'teaser-2',
    title: 'Teaser II: Thunder & Doom',
    releaseDate: 'Dec 26, 2025',
    codename: 'MJOLNIR_STATIC',
    tagline: 'Thor (Chris Hemsworth) witnesses the dying of the northern skies.',
    description: 'Stormbreaker sparks with unfamiliar emerald green electrical arcs rather than Asgardian blue. Thor stands before the ruins of Omnipotence City as constellations blink out of existence one by one in the cosmic tapestry.',
    clues: [
      'The cosmic gods are dead or hiding; Zeus’ lightning bolt has been seized by Latverian tech.',
      'Love (Thor’s adopted daughter) holds a glowing green talisman with the seal of Doom.',
      'Thor is shown mourning another brother—or a variant he could not save.',
    ],
    keyQuotes: '"The stars are going out. Not by entropy... by design."',
    soundFrequency: '528 Hz Bifrost Harmonic',
    status: 'Decoded',
  },
  {
    id: 'teaser-3',
    title: 'Teaser III: The X-Gene Rupture',
    releaseDate: 'Jan 02, 2026',
    codename: 'MUTANT_ANCHOR',
    tagline: 'The Xavier Institute iron gates shudder as realities collide.',
    description: 'Cerebro helmet begins bleeding green liquid metal. In the reflection of the glass, the shadow of Adamantium claws emerges alongside the silhouetted cape of Magneto. An alarm blares: "INCURSION IN SECTOR 10005."',
    clues: [
      'Direct continuation of Deadpool & Wolverine’s anchor-being timeline anomalies.',
      'Beast (Hank McCoy) seen analyzing TVA tem-pad energy signatures.',
      'First official crossover confirmation of the legacy X-Men into the Avengers fray.',
    ],
    keyQuotes: '"Charles always believed in peaceful coexistence. He never foresaw a conqueror from outside time."',
    soundFrequency: '639 Hz Cerebro Wave',
    status: 'Decoded',
  },
  {
    id: 'teaser-4',
    title: 'Teaser IV: The First Family Distress Beacon',
    releaseDate: 'Jan 09, 2026',
    codename: 'BAXTER_BEACON',
    tagline: 'The Fantastic Four’s retro-future vessel pierces the cosmic storm.',
    description: 'The iconic "4" beacon fires upward through a swirling purple sky. Reed Richards frantically works on the Bridge device while Sue Storm holds a protective barrier against collapsing spacetime. A metallic gauntlet places a pawn on an ivory chessboard.',
    clues: [
      'Directly links the end of The Fantastic Four: First Steps to Avengers: Doomsday.',
      'Reed’s chalkboard contains equations matching the multiversal incursions from Hickman’s Avengers #1.',
      'The chessboard piece is an exact replica of Victor von Doom’s family crest in Latveria.',
    ],
    keyQuotes: '"Reed... the coordinates are gone. There is only Latveria."',
    soundFrequency: '741 Hz Baxter Carrier',
    status: 'Decoded',
  },
  {
    id: 'teaser-5',
    title: 'Teaser V: The Crown of Latveria',
    releaseDate: 'Feb 08, 2026',
    codename: 'DOOM_ASCENDANT',
    tagline: 'Robert Downey Jr. makes his first appearance as Victor von Doom.',
    description: 'A slow tracking shot across a cold stone castle in Latveria. Monks chant in ancient Romani dialect. A man in an emerald hooded cloak turns slowly, revealing the iconic riveted iron mask. His voice echoes through the silence with familiar cadence.',
    clues: [
      'Revealed during the Super Bowl LIX broadcast as the Doomsday Clock hit its first milestone.',
      'Robert Downey Jr.’s iconic voice delivered with menacing, aristocratic Latverian diction.',
      'The Arc Reactor socket in his chest armor has been replaced with the mystical Eye of Agamotto / Latverian jewel.',
    ],
    keyQuotes: '"New mask. Same task. I told you... peace in our time requires a god."',
    soundFrequency: '108 Hz Latverian Chime',
    status: 'Decoded',
  },
];

export const TeaserArchives: React.FC = () => {
  const [selectedTeaser, setSelectedTeaser] = useState<TeaserDrop>(TEASERS[4]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleSelect = (teaser: TeaserDrop) => {
    setSelectedTeaser(teaser);
    doomAudio.playMysticChime();
  };

  const handlePlayTeaserSound = () => {
    setIsPlayingAudio(true);
    doomAudio.playMysticChime();
    setTimeout(() => {
      doomAudio.playIncursionAlert();
    }, 400);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 border border-emerald-900/50 p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-emerald-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              MARVEL TEASER ARCHIVES & DECODER
            </h2>
          </div>
          <p className="text-xs font-mono-code text-zinc-400 mt-1">
            Analyzing the teaser drops preceding the official Doomsday Clock livestream.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>5 of 5 TEASERS DECRYPTED</span>
        </div>
      </div>

      {/* Grid: Teaser selector list + Teaser dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left List: Teaser Tabs (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {TEASERS.map((t) => {
            const isSelected = t.id === selectedTeaser.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-code mb-1">
                  <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {t.releaseDate}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    t.id === 'teaser-5' 
                      ? 'bg-yellow-950 text-yellow-300 border border-yellow-700' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {t.codename}
                  </span>
                </div>
                <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {t.title}
                </div>
                <div className="text-xs text-zinc-400 line-clamp-1 mt-1">
                  {t.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-zinc-900/50 border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono-code text-emerald-400">
                  CLASSIFIED MARVEL BROADCAST // {selectedTeaser.codename}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedTeaser.title}
                </h3>
                <div className="text-xs text-zinc-400 mt-0.5 font-mono-code">
                  Premiered: {selectedTeaser.releaseDate} · Frequency: {selectedTeaser.soundFrequency}
                </div>
              </div>

              <button
                onClick={handlePlayTeaserSound}
                disabled={isPlayingAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs transition-colors cursor-pointer"
                title="Play simulated transmission audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
                {isPlayingAudio ? 'BROADCASTING...' : 'Play Audio'}
              </button>
            </div>

            {/* Quote block */}
            <div className="my-4 p-4 rounded-xl bg-black/60 border-l-4 border-emerald-500 text-emerald-300 font-mono-code text-sm italic">
              {selectedTeaser.keyQuotes}
            </div>

            {/* Visual Description */}
            <div className="mb-4">
              <h4 className="text-xs font-mono-code uppercase text-zinc-400 mb-1.5">
                Teaser Footage Description:
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedTeaser.description}
              </p>
            </div>

            {/* Frame Analysis & Easter Eggs */}
            <div>
              <h4 className="text-xs font-mono-code uppercase text-zinc-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Frame Clues & Comic Book Roots:
              </h4>
              <ul className="space-y-2">
                {selectedTeaser.clues.map((clue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-800 text-[11px] font-mono-code text-zinc-500 flex justify-between items-center">
            <span>MARVEL STUDIOS CIPHER ARCHIVE</span>
            <span className="text-emerald-400">STATUS: VERIFIED CANON</span>
          </div>
        </div>

      </div>

    </div>
  );
};
