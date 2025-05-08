import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isMobile?: boolean;
}

const ThemeToggle = ({ isMobile = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  if (isMobile) {
    return (
      <button 
        onClick={toggleTheme}
        className="w-full text-left font-medium hover:text-primary transition-colors duration-200 flex items-center"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <>
            <i className="fas fa-sun mr-2"></i>
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <i className="fas fa-moon mr-2"></i>
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }
  
  return (
    <motion.button
      id="theme-toggle"
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-200",
        isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
