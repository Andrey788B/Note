import { Button, Group, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotes } from '../hooks/useNotes';
import type { Note } from '../types';
import { modals } from '@mantine/modals';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { renderMarkdown } from '../utils/markdown';
import { useAutosave } from '../hooks/useAutosave';
import { useUI } from '../context/UIContext';

export default function Workspace({ note }: { note: Note }) {
  const { updateNote, deleteNote } = useNotes();
  const {editing, setEditing} = useUI();
  const [text, setText] = useState(note.content);
  const nav = useNavigate();

  useEffect(() => {
    setText(note.content);
    setEditing(false);
  }, [note.id, note.content, setEditing]);

  useAutosave(text, 800, v => {
    if (editing) updateNote(note.id, { content: String(v) });
  });

  const onDelete = () => {
    modals.openConfirmModal({
      title: 'Удалить заметку?',
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteNote(note.id);
        nav('/note/new', { replace: true });
      },
    });
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Group justify="flex-end" mb="sm">
        <Button variant="light" onClick={() => setEditing((e) => !e)}>
          {editing ? 'Просмотр' : 'Редактировать'}
        </Button>
        <Button color="red" variant="light" onClick={onDelete}>Удалить</Button>
      </Group>

      {editing ? (
        <SimpleMDE value={text} onChange={setText} options={{ spellChecker: false, autofocus: true, status: false }} />
      ) : (
        <div className="markdown" dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }} />
      )}
    </Paper>
  );
}
