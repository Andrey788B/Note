import { NavLink } from 'react-router-dom';
import type { Note } from '../types';

export default function NoteListItem({ note }: { note: Note }) {
    const date = new Date(note.updatedAt).toLocaleString();
    return (
        <NavLink to={`/note/${note.id}`} style={{ display: 'block', padding: '8px 10px' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{note.title || 'Без названия'}</div>
            <div style={{ opacity: 0.6, fontSize: 12 }}>{date}</div>
        </NavLink>
    );
}