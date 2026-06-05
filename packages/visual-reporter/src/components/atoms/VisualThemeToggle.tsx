import type { FC } from 'react';
import { useEffect, useState } from 'react';

const THEME_KEY = 'visual-report-theme';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Default to dark theme if no preference stored or detected
  return 'dark';
}

function applyTheme(newTheme: Theme): void {
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

export const VisualThemeToggle: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const preferred = getPreferredTheme();
    setCurrentTheme(preferred);
    applyTheme(preferred);
    setIsInitialized(true);
  }, []);

  const toggleTheme = (): void => {
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  const buttonStyle = {
    background: 'var(--color-toggle-bg)',
    color: 'var(--color-toggle-icon)',
    border: `1px solid var(--color-border-strong)`,
    borderRadius: '999px',
    fontSize: '1rem',
    padding: '6px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  } as const;

  if (!isInitialized) {
    return null;
  }

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={buttonStyle}
    >
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
