import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { useNotes } from '../hooks/useNotes';
import { useUI } from '../context/UIContext';

import {
  PanelLeft,
  Columns,
  List,
  Pencil,
  Trash2,
  Share2,
  Tag,
  Type,
  Plus,
} from 'lucide-react';

export default function HeaderToolbar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const { createNote, deleteNote, get } = useNotes();
  const { id } = useParams();
  const nav = useNavigate();
  const note = id ? get(id) : undefined;
  const { editing, toggleEditing } = useUI();

  const onCreate = async () => {
    const n = await createNote('# Новая заметка');
    nav(`/note/${n.id}`);
  };

  const onDelete = () => {
    if (!note) return;
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
    <Group gap={8} wrap='wrap' className='macToolbar' px='sm' py={6}>
      <Tooltip label='Новая'>
        <ActionIcon className='macTbBtn' onClick={onCreate}>
          <Plus size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label='Сайдбар'>
        <ActionIcon className='macTbBtn' onClick={onToggleSidebar}>
          <PanelLeft size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={editing ? 'Просмотр' : 'Редактировать'}>
        <ActionIcon
          className={`macTbBtn${editing ? ' danger' : ''}`}
          onClick={toggleEditing}
        >
          <Pencil size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label='Колонки'>
        <ActionIcon className='macTbBtn'>
          <Columns size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Список'>
        <ActionIcon className='macTbBtn'>
          <List size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label='Удалить'>
        <ActionIcon
          className='macTbBtn danger'
          onClick={onDelete}
          disabled={!note}
        >
          <Trash2 size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label='Поделиться'>
        <ActionIcon className='macTbBtn'>
          <Share2 size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Теги'>
        <ActionIcon className='macTbBtn'>
          <Tag size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Шрифт'>
        <ActionIcon className='macTbBtn'>
          <Type size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
