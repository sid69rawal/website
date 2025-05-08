import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useThemeToggle(): {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
} {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or use the system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    
    return 'light'; // Default to light theme
  });

  useEffect(() => {
    // Apply theme class to document root
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme };
}
