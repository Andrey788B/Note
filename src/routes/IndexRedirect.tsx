import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';

export default function IndexRedirect() {
  const { notes, loading } = useNotes();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (notes.length) nav(`/note/${notes[0].id}`, { replace: true });
    else nav('/note/new', { replace: true });
  }, [loading, notes, nav]);

  return null;
}