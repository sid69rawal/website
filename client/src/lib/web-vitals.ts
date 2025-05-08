// A simplified implementation of Web Vitals tracking
// For production, consider using the official web-vitals library

interface WebVital {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// LCP thresholds (in seconds)
const LCP_THRESHOLD = {
  GOOD: 2.5,
  POOR: 4.0
};

// FID thresholds (in milliseconds)
const FID_THRESHOLD = {
  GOOD: 100,
  POOR: 300
};

// CLS thresholds (unitless)
const CLS_THRESHOLD = {
  GOOD: 0.1,
  POOR: 0.25
};

// Track largest contentful paint
export function trackLCP(callback: (vital: WebVital) => void): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry;
    
    // Value is in milliseconds, convert to seconds
    const value = lastEntry.startTime / 1000;
    
    // Determine rating
    const rating = 
      value <= LCP_THRESHOLD.GOOD ? 'good' :
      value <= LCP_THRESHOLD.POOR ? 'needs-improvement' : 'poor';
      
    callback({
      id: 'LCP',
      name: 'Largest Contentful Paint',
      value,
      rating
    });
    
    // Disconnect after reporting
    observer.disconnect();
  };
  
  // Create and start observing
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

// Track first input delay
export function trackFID(callback: (vital: WebVital) => void): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entry = list.getEntries()[0] as PerformanceEventTiming;
    
    // Value is in milliseconds
    const value = entry.processingStart - entry.startTime;
    
    // Determine rating
    const rating = 
      value <= FID_THRESHOLD.GOOD ? 'good' :
      value <= FID_THRESHOLD.POOR ? 'needs-improvement' : 'poor';
      
    callback({
      id: 'FID',
      name: 'First Input Delay',
      value,
      rating
    });
    
    // Disconnect after reporting
    observer.disconnect();
  };
  
  // Create and start observing
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'first-input', buffered: true });
}

// Track cumulative layout shift
export function trackCLS(callback: (vital: WebVital) => void): void {
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries();
    
    entries.forEach(entry => {
      // Only count layout shifts without recent user input
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        clsEntries.push(entry);
      }
    });
  };

  // Report CLS when page is hidden or unloaded
  const reportCLS = () => {
    // Determine rating
    const rating = 
      clsValue <= CLS_THRESHOLD.GOOD ? 'good' :
      clsValue <= CLS_THRESHOLD.POOR ? 'needs-improvement' : 'poor';
      
    callback({
      id: 'CLS',
      name: 'Cumulative Layout Shift',
      value: clsValue,
      rating
    });
    
    // Disconnect after reporting
    observer.disconnect();
  };
  
  // Create and start observing
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'layout-shift', buffered: true });
  
  // Report on visibility change or unload
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportCLS();
    }
  });
  
  window.addEventListener('unload', reportCLS);
}

// Track all web vitals
export function trackWebVitals(callback: (vital: WebVital) => void): void {
  trackLCP(callback);
  trackFID(callback);
  trackCLS(callback);
}