import 'easymde/dist/easymde.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { registerSW } from 'virtual:pwa-register';


registerSW({ immediate: true });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <ModalsProvider>
        <AuthProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);