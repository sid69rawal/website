
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Zap, Accessibility } from "lucide-react"; // Using more specific icons

export default function InteractiveDashboardCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80"
            alt="Interactive Data Dashboard"
            data-ai-hint="data dashboard"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-2 text-sm">Data Visualization Motion</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              Interactive Dashboard UI
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <CardDescription className="text-lg text-muted-foreground">
          This project involved designing and implementing a highly interactive and animated dashboard for a SaaS analytics platform. The goal was to make complex data easily understandable and engaging through fluid transitions, responsive charts, and intuitive filtering controls.
        </CardDescription>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Project Objectives</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Simplify complex data sets through intuitive animated visualizations.</li>
            <li>Improve user experience with smooth transitions and immediate feedback.</li>
            <li>Ensure high performance and responsiveness, even with large data volumes.</li>
            <li>Maintain accessibility standards for all interactive elements.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Core Technologies</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Framer Motion</Badge>
            <Badge variant="outline">Recharts/D3.js</Badge>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Accessibility (ARIA)</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Key Animated Features</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BarChart3 className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Animated Chart Transitions</h4>
                <p className="text-sm text-muted-foreground">Charts animate smoothly when data filters are applied or time ranges change, helping users track changes visually.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Zap className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Real-time Data Updates</h4>
                <p className="text-sm text-muted-foreground">Incoming data points animate into charts, providing a live and dynamic feel to the dashboard.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Accessibility className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Accessible Micro-interactions</h4>
                <p className="text-sm text-muted-foreground">Tooltips, hover effects, and selection states are animated with ARIA attributes for full accessibility.</p>
              </div>
            </li>
             <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary mr-3 mt-1 shrink-0"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0-2 2c0 1.04.126 1.512.521 2.158a1.52 1.52 0 0 0 .479.518L20 20Z"/><path d="m17 15 3 3"/></svg>
              <div>
                <h4 className="font-medium text-foreground">Dynamic Layout Adjustments</h4>
                <p className="text-sm text-muted-foreground">Widgets and panels smoothly resize and reflow when the layout is customized by the user.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Impact</h3>
          <p className="text-muted-foreground">
            The animated dashboard received positive feedback for its modern feel and ease of use. User task completion times for data analysis decreased by 18%, and overall user satisfaction scores improved significantly. The animations made the platform feel more responsive and less intimidating for non-technical users.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
