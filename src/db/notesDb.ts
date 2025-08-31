import Dexie, { type Table } from 'dexie';
import type { Note } from '../types';

class NotesDB extends Dexie {
    notes!: Table<Note, string>;
    constructor() {
        super('notes-db');
        this.version(1).stores({
            notes: 'id, title, updatedAt, createdAt',
        });
    }
}

export const db = new NotesDB();