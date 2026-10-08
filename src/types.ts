export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalMs: number;
  progressPercent: number; // Progress from Jan 13, 2026 to Dec 18, 2026
}

export interface Milestone {
  id: string;
  name: string;
  dateStr: string;
  targetDate: Date;
  tag: string;
  description: string;
  status: 'passed' | 'current' | 'future';
}

export interface UniverseNode {
  id: string;
  designation: string;
  name: string;
  status: 'Critical' | 'Incursion Looming' | 'Collapsing' | 'Protected';
  riskScore: number;
  coordinates: { x: number; y: number };
  description: string;
  heroes: string[];
  doomNotes: string;
  color: string;
}

export interface TeaserDrop {
  id: string;
  title: string;
  releaseDate: string;
  codename: string;
  tagline: string;
  description: string;
  clues: string[];
  keyQuotes: string;
  soundFrequency: string;
  status: 'Decoded' | 'Analyzing' | 'Classified';
}

export interface FanTransmission {
  id: string;
  author: string;
  timestamp: string;
  location: string;
  text: string;
  likes: number;
  verified?: boolean;
}
