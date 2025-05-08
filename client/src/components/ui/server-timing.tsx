import React, { useState, useEffect } from 'react';

interface ServerTiming {
  name: string;
  duration: number;
  description?: string;
}

interface ServerTimingProps {
  url: string;
  onComplete?: (timings: ServerTiming[]) => void;
}

/**
 * Component to fetch a URL and display Server-Timing metrics
 * Great for tracking backend performance in development
 */
export function ServerTimingMonitor({ url, onComplete }: ServerTimingProps) {
  const [timings, setTimings] = useState<ServerTiming[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format duration for display
  const formatDuration = (ms: number) => {
    return ms < 1 ? `${(ms * 1000).toFixed(2)}μs` : `${ms.toFixed(2)}ms`;
  };

  // Parse Server-Timing header
  const parseServerTiming = (header: string): ServerTiming[] => {
    return header.split(',').map(metric => {
      const [nameAndDuration, ...descriptionParts] = metric.trim().split(';');
      const name = nameAndDuration.split('=')[0].trim();
      
      // Extract duration value
      const durationMatch = metric.match(/dur=([0-9.]+)/);
      const duration = durationMatch ? parseFloat(durationMatch[1]) : 0;
      
      // Extract description if present
      const descriptionMatch = metric.match(/desc="([^"]+)"/);
      const description = descriptionMatch ? descriptionMatch[1] : undefined;
      
      return { name, duration, description };
    });
  };

  // Fetch the URL and extract timing information
  const fetchWithTiming = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const start = performance.now();
      const response = await fetch(url);
      const end = performance.now();
      
      // Calculate total time including network
      const totalTime: ServerTiming = {
        name: 'total-time',
        duration: end - start,
        description: 'Total Time (incl. network)'
      };
      
      // Get server timing from headers
      const serverTimingHeader = response.headers.get('Server-Timing');
      
      if (serverTimingHeader) {
        const parsedTimings = parseServerTiming(serverTimingHeader);
        const allTimings = [...parsedTimings, totalTime];
        setTimings(allTimings);
        
        if (onComplete) {
          onComplete(allTimings);
        }
      } else {
        setTimings([totalTime]);
        
        if (onComplete) {
          onComplete([totalTime]);
        }
      }
      
      // Also check for cache headers
      const cacheControl = response.headers.get('Cache-Control');
      if (cacheControl) {
        console.log('Cache-Control:', cacheControl);
      }
      
    } catch (err) {
      setError('Failed to fetch URL');
      console.error('Server timing fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="server-timing bg-slate-50 dark:bg-slate-900 p-4 rounded-md shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Server Performance</h3>
        <button
          onClick={fetchWithTiming}
          disabled={loading}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Test Endpoint'}
        </button>
      </div>
      
      {error && (
        <div className="text-red-500 text-xs mb-2">{error}</div>
      )}
      
      {timings.length > 0 ? (
        <div className="text-xs space-y-1">
          {timings.map((timing, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="text-slate-700 dark:text-slate-300">
                {timing.description || timing.name}:
              </div>
              <div className="font-mono">
                {formatDuration(timing.duration)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-slate-500 dark:text-slate-400 text-xs">
          Click "Test Endpoint" to measure performance
        </div>
      )}
    </div>
  );
}