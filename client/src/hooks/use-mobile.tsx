import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

// Hook to detect if the current device is mobile based on screen width
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Throttled resize handler for performance
    const handleResize = throttle(() => {
      checkIfMobile();
    }, 200);

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Initial check
    checkIfMobile();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}