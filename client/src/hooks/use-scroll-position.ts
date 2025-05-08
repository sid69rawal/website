import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

interface ScrollPosition {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  direction: 'up' | 'down' | 'left' | 'right' | 'none';
  percentage: number; // Percentage of page scrolled (0-1)
}

export function useScrollPosition(throttleMs: number = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    direction: 'none',
    percentage: 0,
  });

  useEffect(() => {
    // Get the total scrollable height
    const getDocHeight = () => {
      const body = document.body;
      const html = document.documentElement;
      
      return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      ) - window.innerHeight;
    };

    const handleScroll = throttle(() => {
      const { scrollX, scrollY } = window;
      
      // Calculate scroll direction
      const direction = 
        scrollY < scrollPosition.y ? 'up' :
        scrollY > scrollPosition.y ? 'down' :
        scrollX < scrollPosition.x ? 'left' :
        scrollX > scrollPosition.x ? 'right' : 'none';
      
      // Calculate scroll percentage
      const docHeight = getDocHeight();
      const percentage = docHeight ? Math.min(scrollY / docHeight, 1) : 0;
      
      setScrollPosition({
        x: scrollX,
        y: scrollY,
        prevX: scrollPosition.x,
        prevY: scrollPosition.y,
        direction,
        percentage,
      });
    }, throttleMs);

    // Add event listener with throttling for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition.x, scrollPosition.y, throttleMs]);

  return scrollPosition;
}