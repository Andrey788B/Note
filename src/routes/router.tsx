import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotesLayout from './NotesLayout';
import NotePage from './NotePage';
import Login from './Login';
import IndexRedirect from '../routes/IndexRedirect';

// eslint-disable-next-line react-refresh/only-export-components
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to='/login' replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <NotesLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <IndexRedirect /> },
      { path: 'note/:id', element: <NotePage /> },
      { path: 'note/new', element: <NotePage createOnMount /> },
    ],
  },
]);
