"use client"; // This hook is client-side only

import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

interface IntersectionObserverResult {
  entry?: IntersectionObserverEntry;
  isIntersecting: boolean;
  intersectionRatio: number;
  frozen: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: IntersectionObserverOptions = {}
): IntersectionObserverResult { // Added return type
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(); // Initialize as undefined
  const frozen = useRef(false);

  const updateEntry = ([currentEntry]: IntersectionObserverEntry[]): void => { // Renamed entry to currentEntry
    setEntry(currentEntry);
    
    if (freezeOnceVisible && currentEntry.isIntersecting && !frozen.current) {
      frozen.current = true;
      // No need to explicitly disconnect if we're just freezing the state update
    }
  };

  useEffect(() => {
    const node = elementRef?.current;
    
    if (!node || (freezeOnceVisible && frozen.current)) { // Check frozen state before creating observer
      return;
    }
    
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]); // Corrected dependencies

  return {
    entry,
    isIntersecting: entry?.isIntersecting ?? false, // Provide default value
    intersectionRatio: entry?.intersectionRatio ?? 0, // Provide default value
    frozen: frozen.current,
  };
}
