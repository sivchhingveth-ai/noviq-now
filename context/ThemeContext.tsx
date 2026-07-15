'use client';

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'insight_theme';
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): Theme {
  return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

// Server (and the first client render during hydration) always assume the
// default theme so the markup matches — the effect below syncs the real value.
function getServerSnapshot(): Theme {
  return 'dark';
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep the <html> class in sync with the current theme (toggle + cross-tab).
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((l) => l());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
