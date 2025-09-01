import { useNavigate, useParams } from 'react-router-dom';
import Workspace from '../components/Workspace';
import { useNotes } from '../hooks/useNotes';
import { useRef, useEffect, useState } from 'react';


export default function NotePage({ createOnMount }: { createOnMount?: boolean }) {
  const { id } = useParams();
  const { get, createNote } = useNotes();
  const nav = useNavigate();
  const [noteId, setNoteId] = useState<string | null>(id ?? null);
  const createdRef = useRef(false); 

  useEffect(() => {
    if (createOnMount) {
      if (createdRef.current) return;
      createdRef.current = true;

      (async () => {
        const n = await createNote('# Новая заметка');
        setNoteId(n.id);
        nav(`/note/${n.id}`, { replace: true });
      })();
    } else if (id) {
      setNoteId(id);
    }
  }, [id, createOnMount, createNote, nav]);

  if (!noteId) return null;
  const note = get(noteId);
  if (!note) return null;
  return <Workspace note={note} />;
}