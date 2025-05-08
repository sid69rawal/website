"use client"; // Web Vitals are client-side metrics

import { onLCP, onFID, onCLS, Metric } from 'web-vitals';

interface WebVital extends Metric {
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Define thresholds directly from web-vitals types if possible, or keep as constants
const LCP_THRESHOLD = { GOOD: 2500, POOR: 4000 }; // milliseconds
const FID_THRESHOLD = { GOOD: 100, POOR: 300 }; // milliseconds
const CLS_THRESHOLD = { GOOD: 0.1, POOR: 0.25 }; // unitless

// Helper function to determine rating
const getRating = (value: number, thresholds: { GOOD: number; POOR: number }): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= thresholds.GOOD) {
    return 'good';
  } else if (value <= thresholds.POOR) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
};

// Type guard for Metric
function isMetric(metric: any): metric is Metric {
  return metric && typeof metric.name === 'string' && typeof metric.value === 'number' && typeof metric.id === 'string';
}


// Wrapper function to add rating to web-vitals metrics
const reportWebVitalsWithRating = (callback: (vital: WebVital) => void) => {
  const report = (metric: Metric) => {
    if (!isMetric(metric)) return; // Type check

    let thresholds;
    switch (metric.name) {
      case 'LCP':
        thresholds = LCP_THRESHOLD;
        break;
      case 'FID':
        thresholds = FID_THRESHOLD;
        break;
      case 'CLS':
        thresholds = CLS_THRESHOLD;
        break;
      default:
        // For other metrics like TTFB, FCP - we might not have standard ratings
        // or need different thresholds. Handle as needed or skip rating.
         callback({ ...metric, rating: 'good' }); // Default or skip rating
         return;
    }

    const rating = getRating(metric.value, thresholds);
    callback({ ...metric, rating });
  };

  // Use the web-vitals library functions
  onLCP(report);
  onFID(report);
  onCLS(report);
  // You can add onTTFB and onFCP here as well if needed
  // import { onTTFB, onFCP } from 'web-vitals';
  // onTTFB(report);
  // onFCP(report);
};

// Export the main function to be used in your application
export function trackWebVitals(callback: (vital: WebVital) => void): void {
  if (typeof window !== 'undefined') {
      reportWebVitalsWithRating(callback);
  }
}

// If you were previously exporting individual trackers, remove them or adapt them
// to use the web-vitals library functions. e.g.:
/*
export function trackLCP(callback: (vital: WebVital) => void): void {
  onLCP((metric) => {
      const rating = getRating(metric.value, LCP_THRESHOLD);
      callback({ ...metric, rating });
  });
}
// ... similar for FID and CLS
*/
