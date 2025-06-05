import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      let isDarkMode = false;
      
      if (theme === 'dark') {
        isDarkMode = true;
      } else if (theme === 'light') {
        isDarkMode = false;
      } else {
        // System theme
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      setIsDark(isDarkMode);
      
      // Apply theme to document
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    isDark,
    setTheme: setThemeAndSave,
    toggleTheme: () => {
      const newTheme = isDark ? 'light' : 'dark';
      setThemeAndSave(newTheme);
    }
  };
}
