import { useEffect, useState, useRef, RefObject } from 'react';

// Extend IntersectionObserverInit with option to freeze once visible
interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Hook to observe when an element enters or exits the viewport
 * Returns entry state that can be used for animations or lazy loading
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: IntersectionObserverOptions = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = useRef(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    
    // If freezeOnceVisible is enabled and element is visible, disconnect observer
    if (freezeOnceVisible && entry.isIntersecting) {
      frozen.current = true;
    }
  };

  useEffect(() => {
    const node = elementRef?.current;
    
    // Do nothing if element ref is empty or frozen
    if (!node || frozen.current) return;
    
    // Create and configure intersection observer
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });
    
    // Start observing
    observer.observe(node);
    
    // Clean up by disconnecting
    return () => {
      observer.disconnect();
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, threshold, root, rootMargin, freezeOnceVisible]);

  return {
    entry,
    isIntersecting: entry?.isIntersecting || false,
    intersectionRatio: entry?.intersectionRatio || 0,
    intersectionRect: entry?.intersectionRect,
    frozen: frozen.current,
  };
}