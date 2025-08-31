import {
  useCallback, useEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { db } from '../db/notesDb';
import type { Note } from '../types';
import { NotesContext, type NotesContextValue } from './notes-context';

const titleFromMd = (md: string) => {
  const line = md.split('\n').find((l) => l.trim().length > 0) || 'Новая заметка';
  return line.replace(/^#+\s*/, '').slice(0, 100);
};

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const initedRef = useRef(false);

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    (async () => {
      await db.transaction('rw', db.notes, async () => {
        const count = await db.notes.count();
        if (count === 0) {
          const seed: Note = {
            id: crypto.randomUUID(),
            title: 'Добро пожаловать',
            content: '# Привет!\nЭто **Markdown**. Попробуй отредактировать справа.',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await db.notes.add(seed);
        }
      });

      const all = await db.notes.orderBy('updatedAt').reverse().toArray();
      setNotes(all);
      setLoading(false);
    })();
  }, []);

  const createNote = useCallback<NotesContextValue['createNote']>(async (content = 'Новая заметка') => {
    const n: Note = {
      id: crypto.randomUUID(),
      title: titleFromMd(content),
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.notes.add(n);
    setNotes((prev) => [n, ...prev]);
    return n;
  }, []);

  const updateNote = useCallback<NotesContextValue['updateNote']>(async (id, patch) => {
    const existing = await db.notes.get(id);
    if (!existing) return;

    const updated: Note = {
      ...existing,
      ...patch,
      title: patch.content
        ? titleFromMd(String(patch.content))
        : patch.title ?? existing.title,
      updatedAt: Date.now(),
    };

    await db.notes.put(updated);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? updated : n)).sort((a, b) => b.updatedAt - a.updatedAt)
    );
  }, []);

  const deleteNote = useCallback<NotesContextValue['deleteNote']>(async (id) => {
    await db.notes.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const search = useCallback<NotesContextValue['search']>((q) => {
    if (!q.trim()) return notes;
    const needle = q.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(needle) || n.content.toLowerCase().includes(needle)
    );
  }, [notes]);

  const get = useCallback<NotesContextValue['get']>((id) => notes.find((n) => n.id === id), [notes]);

  const value = useMemo<NotesContextValue>(
    () => ({ notes, loading, createNote, updateNote, deleteNote, search, get }),
    [notes, loading, createNote, updateNote, deleteNote, search, get]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}