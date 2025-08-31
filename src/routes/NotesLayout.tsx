import { AppShell, Button, Group } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';


export default function NotesLayout() {
    const { logout } = useAuth();
    const nav = useNavigate();
    return (
        <AppShell
            header={{ height: 56 }}
            navbar={{ width: 300, breakpoint: 'sm' }}
        >
            <AppShell.Header>
                <Group p="sm" justify="space-between">
                    <strong>Notes (macOS)</strong>
                    <Button variant="light" size="xs" onClick={() => { logout(); nav('/login'); }}>Выйти</Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
              <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
             <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}