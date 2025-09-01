import {Button,Center,Paper,PasswordInput,Stack,TextInput,Title,} from '@mantine/core';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      nav('/', { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center mih='100vh'>
      <Paper w={360}>
        <Title order={3} mb='md'>
          Вход
        </Title>
        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              required
              label='Email'
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
            <PasswordInput
              required
              label='Пароль'
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
            <Button type='submit' loading={loading}>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
