"use client"; // This hook relies on window object

import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils'; // Ensure path is correct

export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize state based on current window width, or default to false for SSR
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false; // Default value for SSR or environments without window
  });

  useEffect(() => {
    // Ensure this effect runs only on the client
    if (typeof window === 'undefined') {
      return;
    }

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount in case the initial state was SSR default
    checkIfMobile();

    // Use throttling for resize event
    const handleResize = throttle(checkIfMobile, 200);

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return isMobile;
}