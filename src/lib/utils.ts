import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBrowser = typeof window !== "undefined";

export function scrollToElement(elementId: string, offset: number = 0) {
  if (!isBrowser) return;
  
  const element = document.getElementById(elementId.startsWith('#') ? elementId.substring(1) : elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isMobileDevice(breakpoint: number = 768): boolean {
  if (!isBrowser) return false;
  return window.innerWidth < breakpoint;
}

export function generateId(prefix: string = 'uid'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: ThisParameterType<T> | null = null;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, limit);
    } else {
      lastArgs = args;
      lastThis = context;
    }
  };
}

export function isInViewport(element: HTMLElement): boolean {
  if (!isBrowser || !element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  if (!text || typeof text !== 'string') return 0;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getOptimizedImageUrl(url: string, quality: number = 75, width?: number): string {
  if (!url || !url.includes('images.unsplash.com')) {
    return url; 
  }
  
  const urlObj = new URL(url);
  urlObj.searchParams.set('q', quality.toString());
  if (width) {
    urlObj.searchParams.set('w', width.toString());
  }
  urlObj.searchParams.set('auto', 'format'); // Helps with WebP delivery
  urlObj.searchParams.set('fit', 'max'); // Ensures image isn't upscaled beyond its original size, if width is provided

  return urlObj.toString();
}

export function loadScript(src: string, async: boolean = true, defer: boolean = false): Promise<void> {
  if (!isBrowser) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // Script already loaded or loading
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export function isLowEndDevice(): boolean {
  if (!isBrowser) return false; // Default to not low-end for SSR or non-browser env

  const navigatorAlias = navigator as any; // Alias to handle vendor-prefixed properties

  // Check connection type (more reliable than deviceMemory in some cases)
  const connection = navigatorAlias.connection || navigatorAlias.mozConnection || navigatorAlias.webkitConnection;
  if (connection && connection.effectiveType) {
    const effectiveType = connection.effectiveType;
    if (['slow-2g', '2g'].includes(effectiveType)) {
      return true;
    }
  }

  // Check device memory (if available)
  if (navigatorAlias.deviceMemory && navigatorAlias.deviceMemory < 1) { // e.g., less than 1GB RAM
    return true;
  }
  
  // Check for prefers-reduced-data header (experimental but useful)
  if (connection && connection.saveData === true) {
    return true;
  }

  // Fallback: Check screen resolution (very rough heuristic)
  // const isSmallScreen = window.screen.width < 768 || window.screen.height < 768;
  // const pixelRatio = window.devicePixelRatio || 1;
  // if (isSmallScreen && pixelRatio < 2) return true;


  return false; // Assume not low-end if no specific indicators are met
}
