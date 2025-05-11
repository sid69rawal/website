
"use client";

import { useState, useEffect } from 'react'; // Import hooks
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'); // Use resolvedTheme for toggle logic
  };

  const isDark = resolvedTheme === 'dark';

  // Placeholder classes to avoid className mismatch during hydration
  const placeholderButtonClasses = "p-2 rounded-full transition-colors duration-200 hover:bg-muted min-w-[44px] min-h-[44px]";
  const placeholderMobileButtonClasses = "w-full font-medium hover:text-primary transition-colors duration-200 flex items-center justify-center text-xl py-3 min-h-[44px]";


  if (isMobile) {
    if (!mounted) {
      // Render a placeholder for the mobile theme toggle until mounted
      return (
        <button
          className={placeholderMobileButtonClasses}
          aria-label="Toggle theme" // Generic aria-label
          disabled // Disable until theme is known
        >
          <Sun className="mr-2 h-5 w-5 opacity-50" /> {/* Default/placeholder icon */}
          <span className="opacity-50">Loading theme...</span>
        </button>
      );
    }
    // Render the actual mobile theme toggle once mounted
    return (
      <button
        onClick={toggle}
        className={cn(
          "w-full font-medium hover:text-primary transition-colors duration-200 flex items-center justify-center text-xl py-3 min-h-[44px]",
          isDark ? "text-foreground" : "text-foreground" // Ensure consistent text color
        )}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <>
            <Sun className="mr-2 h-5 w-5" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="mr-2 h-5 w-5" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  // For the non-mobile toggle button
  if (!mounted) {
    // Render a placeholder for the main theme toggle until mounted
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme" // Generic aria-label
          className={placeholderButtonClasses}
          disabled // Disable until theme is known
        >
          {/* Empty span to maintain button size, or a static placeholder icon */}
          <span className="h-[1.2rem] w-[1.2rem]" /> 
        </Button>
      </motion.div>
    );
  }

  // Render the actual main theme toggle once mounted
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "p-2 rounded-full transition-colors duration-200 min-w-[44px] min-h-[44px]", // Ensured min tap target size
          isDark ? "hover:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
      >
        {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
    </motion.div>
  );
}
