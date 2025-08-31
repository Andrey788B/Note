import { Button, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        nav('/');
};


return (
    <Stack align="center" justify="center" mih="100dvh">
        <Paper withBorder p="lg" w={360}>
            <Title order={3} mb="md">Вход</Title>
            <form onSubmit={onSubmit}>
                <Stack>
                    <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
                    <PasswordInput label="Пароль" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
                    <Button type="submit">Войти</Button>
                </Stack>
            </form>
        </Paper>
    </Stack>
    );
}