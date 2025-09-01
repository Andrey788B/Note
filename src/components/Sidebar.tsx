import { ScrollArea, Stack } from '@mantine/core'; 
import { useState, useMemo } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useNotes } from '../hooks/useNotes';
import SearchBox from './SearchBox';
import NoteListItem from './NoteListItem';

export default function Sidebar() {
  const { search } = useNotes();
  const [q, setQ] = useState('');
  const [qDebounced] = useDebouncedValue(q, 200);
  const filtered = useMemo(() => search(qDebounced), [search, qDebounced]);

  return (
    <Stack gap='xs' h='100%'>
      <div className='sidebarTop'>
        <SearchBox value={q} onChange={setQ} />
      </div>

      <ScrollArea style={{ flex: 1 }}>
        <Stack gap={4} className='noteListPad'>
          {filtered.length ? (
            filtered.map(n => <NoteListItem key={n.id} note={n} />)
          ) : (
            <div style={{ opacity: 0.6, fontSize: 12, padding: 8 }}>
              Ничего не найдено…
            </div>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
