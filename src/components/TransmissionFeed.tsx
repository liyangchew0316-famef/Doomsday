import React, { useState, useEffect } from 'react';
import { FanTransmission } from '../types';
import { doomAudio } from '../utils/audioEngine';
import { MessageSquare, Send, Heart, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

const INITIAL_TRANSMISSIONS: FanTransmission[] = [
  {
    id: 'tx-1',
    author: 'ComicBookClubLive',
    timestamp: '14m ago',
    location: 'New York, Earth-616',
    text: 'That green lightning change on the Doomsday Clock mechanism at 00:00:00 yesterday was wild. Did anyone else catch the reflection in Doom’s mask during the glitch?',
    likes: 842,
    verified: true,
  },
  {
    id: 'tx-2',
    author: 'TVA_Archivist_Mobius',
    timestamp: '32m ago',
    location: 'Null-Time Zone',
    text: 'Timeline branches in Sector 838 are experiencing severe geometric shear. This is not Kang. This is something much older and infinitely more arrogant.',
    likes: 619,
    verified: true,
  },
  {
    id: 'tx-3',
    author: 'Reed_F4_Rebuild',
    timestamp: '48m ago',
    location: 'Baxter Building, Earth-1961',
    text: 'If Victor built this chronometer, every second elapsed isn’t just counting down to release—it’s calibrating the dimensional bridge to Battleworld.',
    likes: 420,
    verified: false,
  },
  {
    id: 'tx-4',
    author: 'Endgame_Encore_Watcher',
    timestamp: '1h ago',
    location: 'London, UK',
    text: 'Watching the Endgame Encore screening last month and hearing the new post-credits audio cue sent chills down my spine. RDJ saying "peace in our time requires a god" is iconic.',
    likes: 512,
    verified: false,
  },
  {
    id: 'tx-5',
    author: 'MutantResistanceX',
    timestamp: '2h ago',
    location: 'Westchester, NY',
    text: 'Hugh Jackman and Chris Evans sharing a screen in Doomsday would break every box office record in human history. The teasers all point directly to it!',
    likes: 934,
    verified: false,
  },
];

export const TransmissionFeed: React.FC = () => {
  const [transmissions, setTransmissions] = useState<FanTransmission[]>(() => {
    try {
      const saved = localStorage.getItem('doomsday_user_transmissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_TRANSMISSIONS];
      }
    } catch {
      // Fallback
    }
    return INITIAL_TRANSMISSIONS;
  });

  const [authorName, setAuthorName] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [hasLikedMap, setHasLikedMap] = useState<Record<string, boolean>>({});

  const handleSendTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTx: FanTransmission = {
      id: `user-${Date.now()}`,
      author: authorName.trim() || 'Multiverse Observer',
      timestamp: 'Just now',
      location: 'Earth-1218 (Local Reality)',
      text: inputText.trim(),
      likes: 1,
      verified: false,
    };

    const updated = [newTx, ...transmissions];
    setTransmissions(updated);
    setInputText('');

    try {
      const userOnly = updated.filter(t => t.id.startsWith('user-'));
      localStorage.setItem('doomsday_user_transmissions', JSON.stringify(userOnly));
    } catch {
      // Ignored
    }

    doomAudio.playMysticChime();
  };

  const handleLike = (id: string) => {
    if (hasLikedMap[id]) return;
    setHasLikedMap(prev => ({ ...prev, [id]: true }));
    setTransmissions(prev =>
      prev.map(t => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 border border-emerald-900/50 p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              LIVE BROADCAST CHATTER & FAN THEORIES
            </h2>
          </div>
          <p className="text-xs font-mono-code text-zinc-400 mt-1">
            Real-time chatter from the YouTube Doomsday Clock livestream community.
          </p>
        </div>

        <div className="text-xs font-mono-code text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>UPLINK: ENCRYPTED // LATVERIA-NET</span>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSendTransmission} className="mt-5 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div className="text-xs font-mono-code text-emerald-400 mb-2 flex items-center gap-1.5 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Transmit Theory to Battleworld Feed:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Your Alias / Codename"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="sm:col-span-1 px-3 py-2 rounded-lg bg-black border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono-code"
          />
          <input
            type="text"
            placeholder="Share your clue, theory, or reaction to the countdown..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="sm:col-span-3 px-3 py-2 rounded-lg bg-black border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-end mt-2.5">
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Broadcast Transmission
          </button>
        </div>
      </form>

      {/* Messages Feed */}
      <div className="mt-5 space-y-3 max-h-[440px] overflow-y-auto pr-1">
        {transmissions.map((t) => (
          <div
            key={t.id}
            className="p-3.5 rounded-xl bg-black/70 border border-zinc-850 hover:border-zinc-750 transition-colors"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">{t.author}</span>
                {t.verified && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono-code">
                    <UserCheck className="w-2.5 h-2.5" />
                    VERIFIED
                  </span>
                )}
                <span className="text-[10px] font-mono-code text-zinc-500 ml-1">
                  · {t.location}
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-zinc-500">
                {t.timestamp}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t.text}
            </p>

            <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-zinc-900 text-xs text-zinc-500">
              <button
                onClick={() => handleLike(t.id)}
                className={`flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer ${
                  hasLikedMap[t.id] ? 'text-red-400 font-semibold' : ''
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLikedMap[t.id] ? 'fill-red-400' : ''}`} />
                <span>{t.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
