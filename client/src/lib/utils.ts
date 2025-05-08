import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if code is running in browser environment
export const isBrowser = typeof window !== "undefined";

// Smoothly scroll to an element
export function scrollToElement(elementId: string) {
  if (!isBrowser) return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Get header height to offset scroll position
  const header = document.getElementById('header');
  const headerHeight = header ? header.offsetHeight : 0;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerHeight;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

// Format date helper
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Determine if device is likely mobile based on screen width
export function isMobileDevice(): boolean {
  if (!isBrowser) return false;
  return window.innerWidth < 768;
}

// Generate a unique ID for elements
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Debounce function to limit execution frequency
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit execution rate
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Check if an element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  if (!isBrowser) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}

// Get random number between min and max
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Calculate reading time for a text
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Get optimized image URL - lowres first for faster LCP
export function getOptimizedImageUrl(url: string, quality: number = 60, width: number = 800): string {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    // Add quality and width parameters
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}q=${quality}&w=${width}&auto=format`;
  }
  
  // For other image services you could add similar optimizations
  
  // Return original URL if no optimizations available
  return url;
}

// Dynamically load JavaScript
export function loadScript(src: string, async: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// Detect low-end devices for reduced animation
export function isLowEndDevice(): boolean {
  const memory = (navigator as any).deviceMemory;
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;
  
  // Less than 4GB RAM or slow connection
  return (
    typeof memory !== 'undefined' && memory < 4 ||
    effectiveType === 'slow-2g' || 
    effectiveType === '2g' || 
    effectiveType === '3g'
  );
}
