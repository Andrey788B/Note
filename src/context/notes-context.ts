import { createContext } from 'react';
import type { Note } from '../types';

export type NotesContextValue = {
  notes: Note[];
  loading: boolean;
  createNote: (content?: string) => Promise<Note>;
  updateNote: (id: string, patch: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  search: (q: string) => Note[];
  get: (id: string) => Note | undefined;
};

export const NotesContext = createContext<NotesContextValue | undefined>(undefined);