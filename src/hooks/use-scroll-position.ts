"use client"; // This hook uses window scroll events

import { useState, useEffect, useRef } from 'react';
import { throttle } from '@/lib/utils'; // Ensure path is correct

interface ScrollPosition {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  directionY: 'up' | 'down' | 'none'; // Focus on vertical direction
  directionX: 'left' | 'right' | 'none'; // Added horizontal direction
  percentageY: number; // Percentage of page scrolled vertically (0-1)
}

const getInitialScrollPosition = (): ScrollPosition => {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0, prevX: 0, prevY: 0, directionY: 'none', directionX: 'none', percentageY: 0 };
  }
  return {
    x: window.scrollX,
    y: window.scrollY,
    prevX: window.scrollX,
    prevY: window.scrollY,
    directionY: 'none',
    directionX: 'none',
    percentageY: 0, // Will be calculated on first scroll or effect run
  };
};

export function useScrollPosition(throttleMs: number = 100): ScrollPosition {
  // Initialize state lazily based on window object availability
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(getInitialScrollPosition);
  const prevPositionRef = useRef({ x: scrollPosition.x, y: scrollPosition.y }); // Use ref for previous position to avoid state dependency loop

  useEffect(() => {
     if (typeof window === 'undefined') {
        return; // Don't run effect on server
    }

    const getDocHeight = () => {
      const body = document.body;
      const html = document.documentElement;
      if (!body || !html) return 0; // Guard against null body/html
      
      // Ensure window.innerHeight is available and positive
      const viewportHeight = window.innerHeight > 0 ? window.innerHeight : 0; 

      return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      ) - viewportHeight;
    };

    const handleScroll = () => {
      const { scrollX, scrollY } = window;
      const prevX = prevPositionRef.current.x;
      const prevY = prevPositionRef.current.y;

      const directionY = scrollY < prevY ? 'up' : scrollY > prevY ? 'down' : 'none';
      const directionX = scrollX < prevX ? 'left' : scrollX > prevX ? 'right' : 'none';
      
      const docHeight = getDocHeight();
      // Ensure docHeight is positive to avoid division by zero or negative results
      const percentageY = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0; 
      
      setScrollPosition({
        x: scrollX,
        y: scrollY,
        prevX: prevX,
        prevY: prevY,
        directionY,
        directionX,
        percentageY,
      });

      // Update ref for the next scroll event
      prevPositionRef.current = { x: scrollX, y: scrollY };
    };

    // Throttle the scroll handler
    const throttledHandleScroll = throttle(handleScroll, throttleMs);

    // Initial calculation in case the page is already scrolled
    handleScroll(); 

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      // If throttle creates timers, ensure they are cleaned up if necessary
    };
  }, [throttleMs]); // Only re-run if throttleMs changes

  return scrollPosition;
}