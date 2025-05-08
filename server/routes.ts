import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

// Helper for measuring backend performance metrics
function measureServerTiming(res: Response) {
  const startTime = process.hrtime();
  return (name: string, description?: string) => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationInMs = seconds * 1000 + nanoseconds / 1000000;
    
    const timing = description 
      ? `${name};dur=${durationInMs.toFixed(2)};desc="${description}"`
      : `${name};dur=${durationInMs.toFixed(2)}`;
    
    // Add or append to Server-Timing header
    const existingTiming = res.getHeader('Server-Timing');
    if (existingTiming) {
      res.setHeader('Server-Timing', `${existingTiming}, ${timing}`);
    } else {
      res.setHeader('Server-Timing', timing);
    }
    
    return durationInMs;
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Add Server-Timing middleware for all API endpoints
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    // Attach timing function to response object
    (res as any).measureTiming = measureServerTiming(res);
    
    // Start overall request timing
    (res as any).startTime = process.hrtime();
    
    // End timing on response finish
    res.on('finish', () => {
      if ((res as any).startTime) {
        const [seconds, nanoseconds] = process.hrtime((res as any).startTime);
        const totalDuration = seconds * 1000 + nanoseconds / 1000000;
        
        // Add total request time to Server-Timing
        const existingTiming = res.getHeader('Server-Timing');
        const timing = `total;dur=${totalDuration.toFixed(2)};desc="Total API Time"`;
        
        if (existingTiming) {
          res.setHeader('Server-Timing', `${existingTiming}, ${timing}`);
        } else {
          res.setHeader('Server-Timing', timing);
        }
      }
    });
    
    // Add cache-control headers for better client-side caching
    if (req.method === 'GET') {
      // For GET requests, use stale-while-revalidate strategy
      res.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=60');
    }
    
    next();
  });

  // API endpoint for contact form (simulation only)
  app.post('/api/contact', (req, res) => {
    const measure = (res as any).measureTiming || measureServerTiming(res);
    const { name, email, project, message } = req.body;
    
    // Measure validation time
    measure('validation', 'Input Validation');
    
    // Validate input
    if (!name || !email || !project || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }
    
    // In a real app, you would send an email or store in database
    // Here we're just simulating a successful submission
    setTimeout(() => {
      measure('processing', 'Form Processing');
      
      res.status(200).json({ 
        success: true,
        message: 'Message received successfully!' 
      });
    }, 1000);
  });
  
  // API endpoint for performance metrics (simulation only)
  app.get('/api/performance', (req, res) => {
    const measure = (res as any).measureTiming || measureServerTiming(res);
    
    // Measure data gathering time
    measure('data-gathering', 'Performance Data Collection');
    
    // Simulated performance metrics
    const metrics = {
      fps: 60,
      lcp: 1.8, // Largest Contentful Paint in seconds
      fid: 35,  // First Input Delay in milliseconds
      cls: 0.05 // Cumulative Layout Shift
    };
    
    // Measure response preparation time
    measure('response-prep', 'Response Preparation');
    
    res.status(200).json(metrics);
  });

  const httpServer = createServer(app);

  return httpServer;
}
