import {createContext,useContext,useEffect,useMemo,useState,type ReactNode,} from 'react';

type User = { uid: string; email: string } | null;

type AuthContextValue = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth:user');
      setUser(raw ? (JSON.parse(raw) as User) : null);
    } catch {
      localStorage.removeItem('auth:user');
      setUser(null);
    }
  }, []);

  const login: AuthContextValue['login'] = async (email, _password) => {
    void _password; 
    const u = { uid: crypto.randomUUID(), email };
    localStorage.setItem('auth:user', JSON.stringify(u));
    setUser(u);
  };

  const logout: AuthContextValue['logout'] = () => {
    localStorage.removeItem('auth:user');
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}