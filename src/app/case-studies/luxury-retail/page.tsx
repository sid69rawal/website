
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function LuxuryRetailCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Luxury Retail Experience"
            data-ai-hint="team collaboration"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-2 text-sm">E-Commerce Animation Suite</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              Luxury Retail Experience
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <CardDescription className="text-lg text-muted-foreground">
          A complete animation system for a high-end fashion brand, featuring scroll-triggered product reveals, micro-interactions on all UI elements, and a 3D product viewer. This project aimed to elevate the online shopping experience to match the brand's luxurious in-store atmosphere.
        </CardDescription>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Project Goals</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Enhance user engagement and perceived value through sophisticated animations.</li>
            <li>Improve product discovery with visually appealing reveal animations.</li>
            <li>Maintain 60fps performance across all devices, including mobile.</li>
            <li>Integrate a seamless 3D product viewer for key items.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">GSAP</Badge>
            <Badge variant="outline">Three.js</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Performance Optimization</Badge>
            <Badge variant="outline">UI/UX Micro-interactions</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Key Features & Animations</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Scroll-Triggered Product Reveals</h4>
                <p className="text-sm text-muted-foreground">Products elegantly fade and slide into view as the user scrolls, creating a dynamic browsing experience.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Interactive 3D Product Viewer</h4>
                <p className="text-sm text-muted-foreground">Allows users to rotate and zoom into select products, providing a tactile and engaging way to explore details.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Fluid Add-to-Cart Animations</h4>
                <p className="text-sm text-muted-foreground">Subtle yet satisfying animations confirm user actions, like adding items to the cart or wishlist.</p>
              </div>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Optimized Page Transitions</h4>
                <p className="text-sm text-muted-foreground">Smooth and quick transitions between pages and product views to maintain user flow and reduce perceived loading times.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Results</h3>
          <p className="text-muted-foreground">
            The new animation system led to a 25% increase in average session duration and a 15% uplift in conversion rates. User feedback highlighted the enhanced visual appeal and a more premium feel to the online store. Performance metrics remained excellent, with LCP under 2 seconds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
