
'use client'; // Required for usePathname

import type { Metadata } from "next"; // Metadata can still be exported from client components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

// export const metadata: Metadata = { // Metadata needs to be defined in a server component or page.tsx
//   title: "Client Success Stories - YourBusinessOnline",
//   description: "Discover how we've helped businesses like yours succeed online with our expert web design and SEO services.",
// };


// Helper function to capitalize words and replace hyphens
const formatBreadcrumbSegment = (segment: string) => {
  if (!segment) return '';
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  const caseStudySlug = pathSegments[pathSegments.length -1];
  const caseStudyTitle = formatBreadcrumbSegment(caseStudySlug);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button asChild variant="outline" className="group">
              <Link href="/#showcase">
                <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Our Work
              </Link>
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/#showcase">Our Work</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {caseStudyTitle && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{caseStudyTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
