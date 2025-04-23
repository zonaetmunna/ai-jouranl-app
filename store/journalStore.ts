import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

import { JournalEntry, MoodType } from '~/types/journal';

/**
 * Interface defining the state and actions for the journal store
 */
interface JournalState {
  entries: JournalEntry[];
  addEntry: (title: string, content: string, mood: MoodType, tags: string[]) => string;
  updateEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => JournalEntry | undefined;
}

/**
 * Journal store for managing journal entries
 * @version 1.0.0
 * @changelog
 * - 2023-06-15: Initial implementation with CRUD operations
 */
export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],

  /**
   * Add a new journal entry
   * @param title - Title of the journal entry
   * @param content - Content of the journal entry
   * @param mood - Mood associated with the entry
   * @param tags - Array of tags for the entry
   * @returns The ID of the new entry
   */
  addEntry: (title, content, mood, tags) => {
    const id = uuidv4();
    const now = new Date().toISOString();

    const newEntry: JournalEntry = {
      id,
      title,
      content,
      mood,
      tags,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      entries: [newEntry, ...state.entries],
    }));

    return id;
  },

  /**
   * Update an existing journal entry
   * @param id - ID of the entry to update
   * @param updates - Partial object with fields to update
   */
  updateEntry: (id, updates) => {
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : entry
      ),
    }));
  },

  /**
   * Delete a journal entry
   * @param id - ID of the entry to delete
   */
  deleteEntry: (id) => {
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    }));
  },

  /**
   * Get a specific journal entry by ID
   * @param id - ID of the entry to retrieve
   * @returns The journal entry or undefined if not found
   */
  getEntry: (id) => {
    return get().entries.find((entry) => entry.id === id);
  },
}));
