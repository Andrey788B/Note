import { NavLink } from 'react-router-dom';
import type { Note } from '../types';

export default function NoteListItem({ note }: { note: Note }) {
  const date = new Date(note.updatedAt).toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' });
  const preview = note.content.replace(/\s+/g, ' ').slice(0, 60);

  return (
    <NavLink
      to={`/note/${note.id}`}
      className={({ isActive }) => `noteItem${isActive ? ' active' : ''}`}
      title={note.title || 'Без названия'}
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <div className="noteTitle">{note.title || 'Без названия'}</div>
      <div className="noteMeta">{date} · {preview}</div>
    </NavLink>
  );
}