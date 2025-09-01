import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type UIContextValue = {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditing: () => void;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const value = useMemo(
    () => ({
      editing,
      setEditing,
      toggleEditing: () => setEditing((e) => !e),
    }),
    [editing]
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
