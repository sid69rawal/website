import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { trackWebVitals } from "@/lib/web-vitals";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Enable smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Track Web Vitals for performance monitoring
  useEffect(() => {
    // Only track in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || import.meta.env.VITE_ENABLE_ANALYTICS) {
      trackWebVitals((metric) => {
        // Log metrics to console in development
        console.log(`Web Vital: ${metric.name}`, {
          value: metric.value,
          rating: metric.rating
        });
        
        // In production, you would send this data to your analytics service
        // Example: sendToAnalytics(metric);
      });
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
