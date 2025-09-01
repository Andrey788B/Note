import { AppShell, Button, Divider, Group, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderToolbar from '../components/HeaderToolbar';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../hooks/useNotes';

export default function NotesLayout() {
  const { logout } = useAuth();
  const { createNote } = useNotes();
  const nav = useNavigate();

  const [navbarOpened, { toggle }] = useDisclosure(false);

  const onCreate = async () => {
    const n = await createNote('# Новая заметка');
    nav(`/note/${n.id}`);
  };

  return (
    <AppShell
      header={{ height: { base: 120, sm: 88 } }}
      navbar={{
        width: 320,
        breakpoint: 'sm',
        collapsed: { mobile: !navbarOpened, desktop: false },
      }}
      padding='md'
    >
      <AppShell.Header className='appHeader'>
        <Group h={48} px='sm' justify='space-between' wrap='nowrap'>
          <Group gap={10}>
            <div className='traffic'>
              <span className='dot red' />
              <span className='dot yellow' />
              <span className='dot green' />
            </div>
            <Text fw={600}>Notes (macOS)</Text>
          </Group>

          <Group gap='xs'>
            <Button onClick={onCreate}>Новая заметка</Button>
            <Button
              size='xs'
              variant='light'
              onClick={() => {
                logout();
                nav('/login');
              }}
            >
              Выйти
            </Button>
          </Group>
        </Group>

        {/* 2-я строка — панель */}
        <Box className='toolbarRow'>
          <HeaderToolbar onToggleSidebar={toggle} />
        </Box>

        <Divider />
      </AppShell.Header>

      <AppShell.Navbar p={0} className='appNavbar'>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
