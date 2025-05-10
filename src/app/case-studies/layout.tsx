
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Success Stories - YourBusinessOnline",
  description: "Discover how we've helped businesses like yours succeed online with our expert web design and SEO services.",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Button asChild variant="outline" className="mb-8 group">
            <Link href="/#showcase">
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Our Work
            </Link>
          </Button>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
