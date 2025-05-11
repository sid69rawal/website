
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Zap, ShieldCheck, Eye } from "lucide-react"; 
import { siteConfig } from "@/config/site";
import React from "react";

export default function InteractiveDashboardCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80"
            alt="SaaS Analytics Dashboard Interface showing various charts and graphs"
            data-ai-hint="saas dashboard"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-2 text-sm">SaaS Platform UI/UX</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              {siteConfig.caseStudies.interactiveDashboard.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <>
          <CardDescription className="text-lg text-muted-foreground">
            This project involved designing and developing a highly interactive and user-friendly dashboard for a SaaS analytics platform. The primary goal was to make complex data easily understandable and actionable for their clients, thereby improving user retention and satisfaction.
          </CardDescription>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Project Objectives</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Enhance user understanding of complex data sets through intuitive visualizations.</li>
              <li>Improve overall user experience with a responsive and easy-to-navigate interface.</li>
              <li>Increase user engagement and time spent on the platform.</li>
              <li>Ensure high performance and quick data loading for a seamless experience.</li>
              <li>Boost client's ability to make data-informed decisions.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Core Technologies & Approach</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Data Visualization Libraries (e.g., Recharts)</Badge>
              <Badge variant="outline">API Integration</Badge>
              <Badge variant="outline">UX/UI Design Principles</Badge>
              <Badge variant="outline">Performance Optimization</Badge>
              <Badge variant="outline">Agile Development</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Key Features Delivered</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BarChart3 className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Intuitive Data Visualizations</h4>
                  <p className="text-sm text-muted-foreground">Developed clear and interactive charts that allow users to easily interpret trends and patterns in their data.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Eye className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Customizable Reporting</h4>
                  <p className="text-sm text-muted-foreground">Implemented features for users to create and save custom report views, tailored to their specific analytical needs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Zap className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Real-time Data Filtering</h4>
                  <p className="text-sm text-muted-foreground">Enabled dynamic filtering options that update visualizations instantly, providing quick access to relevant information.</p>
                </div>
              </li>
               <li className="flex items-start">
                  <Users className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">User-Centric Navigation</h4>
                  <p className="text-sm text-muted-foreground">Designed a streamlined navigation system making it easy for users to find the information they need efficiently.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Impact & Results</h3>
            <p className="text-muted-foreground">
              The new dashboard significantly improved user engagement metrics for the SaaS client. Users reported a 25% increase in ease of finding critical data, and task completion times for generating reports decreased by 30%. This led to higher client satisfaction and contributed to a 15% increase in user retention for the platform.
            </p>
          </div>
        </>
      </CardContent>
    </Card>
  );
}

export const metadata = {
  title: `Case Study: ${siteConfig.caseStudies.interactiveDashboard.title} - ${siteConfig.name}`,
  description: siteConfig.caseStudies.interactiveDashboard.description,
};
