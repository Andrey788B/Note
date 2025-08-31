import { Button, ScrollArea, Stack } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import SearchBox from './SearchBox';
import NoteListItem from './NoteListItem';

export default function Sidebar() {
    const {  search, createNote } = useNotes();
    const [q, setQ] = useState('');
    const nav = useNavigate();
    const filtered = search(q);

    const onCreate = async () => {
        const n = await createNote('# Новая заметка');
        nav(`/note/${n.id}`);
    };

    return (
        <Stack p="sm" h="100%">
            <SearchBox value={q} onChange={setQ} />
            <Button onClick={onCreate}>Новая заметка</Button>
            <ScrollArea style={{ flex: 1 }}>
                <Stack gap="xs">
                    {filtered.map((n) => (
                    <NoteListItem key={n.id} note={n} />
                    ))}
                </Stack>
            </ScrollArea>
        </Stack>
    );
}