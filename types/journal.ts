export type MoodType = 'happy' | 'neutral' | 'sad';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: MoodType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AIInsight {
  id: string;
  entryId: string;
  content: string;
  createdAt: string;
}

export interface JournalStats {
  totalEntries: number;
  moodDistribution: {
    happy: number;
    neutral: number;
    sad: number;
  };
  averageEntriesPerWeek: number;
  longestStreak: number;
  currentStreak: number;
}
