import '@mantine/core/styles.css';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import './app/mac.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './app/theme';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { UIProvider } from './context/UIContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='light'>
      <ModalsProvider>
        <AuthProvider>
          <NotesProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </NotesProvider>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.warn('SW registration failed:', err));
  });
}
