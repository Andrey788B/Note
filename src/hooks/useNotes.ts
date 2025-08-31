// src/hooks/useNotes.ts
import { useContext } from 'react';
import { NotesContext } from '../context/notes-context';

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};