"use client"; // This component fetches data client-side

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerTiming {
  name: string;
  duration: number;
  description?: string;
}

interface ServerTimingProps {
  url: string; // Expecting an API route URL, e.g., "/api/performance"
  onComplete?: (timings: ServerTiming[]) => void;
  className?: string;
}

export function ServerTimingMonitor({ url, onComplete, className }: ServerTimingProps) {
  const [timings, setTimings] = useState<ServerTiming[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDuration = (ms: number): string => {
    if (ms < 0) return 'N/A'; // Handle potential negative values if timing goes wrong
    return ms < 1 ? `${(ms * 1000).toFixed(1)}μs` : `${ms.toFixed(1)}ms`;
  };

  const parseServerTiming = (header: string): ServerTiming[] => {
    if (!header) return [];
    return header.split(',').map(metric => {
      const parts = metric.trim().split(';');
      const name = parts[0].trim();
      let duration = -1; // Default to -1 if not found
      let description: string | undefined;

      parts.slice(1).forEach(part => {
        const [key, value] = part.trim().split('=');
        if (key === 'dur') {
          duration = parseFloat(value);
        } else if (key === 'desc') {
          description = value.replace(/^"|"$/g, ''); // Remove quotes
        }
      });

      return { name, duration, description };
    }).filter(t => t.duration >= 0); // Filter out entries without valid duration
  };

  const fetchWithTiming = useCallback(async () => {
    setLoading(true);
    setError(null);
    setTimings([]); // Clear previous timings

    try {
      const start = performance.now();
      const response = await fetch(url);
      const end = performance.now();
      
      if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
      }

      const totalTime: ServerTiming = {
        name: 'client-total-time', // Changed name to avoid conflict
        duration: end - start,
        description: 'Total Request Time (Client Measured)'
      };
      
      const serverTimingHeader = response.headers.get('Server-Timing');
      const parsedTimings = parseServerTiming(serverTimingHeader || '');
      
      const allTimings = [...parsedTimings, totalTime].sort((a, b) => b.duration - a.duration); // Sort by duration descending
      setTimings(allTimings);
      
      if (onComplete) {
        onComplete(allTimings);
      }
      
    } catch (err) {
       const message = err instanceof Error ? err.message : 'Failed to fetch URL';
       setError(message);
       console.error('Server timing fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, onComplete]); // Dependencies for useCallback

  return (
    <div className={cn("server-timing bg-muted/50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border", className)}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-foreground">Backend Performance</h3>
        <Button
          onClick={fetchWithTiming}
          disabled={loading}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          {loading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
          {loading ? 'Testing...' : 'Test Endpoint'}
        </Button>
      </div>
      
      {error && (
        <div className="text-red-600 dark:text-red-400 text-xs mb-2 p-2 bg-destructive/10 rounded border border-destructive/30">{error}</div>
      )}
      
      {timings.length > 0 ? (
        <div className="text-xs space-y-1.5">
          {timings.map((timing, index) => (
            <div key={`${timing.name}-${index}`} className="flex justify-between items-center border-b border-border/50 pb-1 last:border-b-0">
              <div className="text-muted-foreground truncate pr-2" title={timing.description || timing.name}>
                 {timing.description || timing.name}:
              </div>
              <div className={cn(
                  "font-mono font-medium px-1.5 py-0.5 rounded text-xs",
                   timing.duration > 100 ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" : 
                   timing.duration > 50 ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300" : 
                   "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" // Color coding based on duration
              )}>
                {formatDuration(timing.duration)}
              </div>
            </div>
          ))}
        </div>
      ) : (
         !loading && !error && ( // Show only if not loading and no error
           <div className="text-muted-foreground text-xs italic">
             Click "Test Endpoint" to measure performance.
           </div>
         )
      )}
    </div>
  );
}
