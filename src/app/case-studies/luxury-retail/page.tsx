import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Gem, ShoppingCart, Palette, Smartphone, CheckCircle } from "lucide-react"; 
import { siteConfig } from "@/config/site";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function LuxuryRetailCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
              alt="Luxury fashion e-commerce website displayed on a laptop, showcasing elegant design"
              data-ai-hint="luxury ecommerce"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-2 text-sm">E-Commerce Web Development</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              {siteConfig.caseStudies.luxuryRetail.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-8"> {/* Increased space-y for more whitespace */}
        
          <CardDescription className="text-lg text-muted-foreground">
            A comprehensive website redesign and e-commerce solution for a high-end fashion brand. The project focused on creating a luxurious online shopping experience that mirrored the brand's exclusive in-store atmosphere, ultimately aiming to increase customer engagement and online sales.
          </CardDescription>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Project Goals</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground"> {/* Increased space-y */}
              <li>Enhance the brand's online prestige and user perception of luxury.</li>
              <li>Improve product discovery and showcase items with high-quality visuals.</li>
              <li>Increase online conversion rates and average order value.</li>
              <li>Deliver a seamless and performant shopping experience across all devices.</li>
              <li>Attract new high-value customers through an improved online presence.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Technologies & Strategies</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Next.js (React)</Badge>
              <Badge variant="outline">Custom E-commerce Backend</Badge>
              <Badge variant="outline">UX/UI Design</Badge>
              <Badge variant="outline">Mobile-First Development</Badge>
              <Badge variant="outline">Conversion Rate Optimization (CRO)</Badge>
              <Badge variant="outline">High-Resolution Image Optimization</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Key Features & Enhancements</h3>
            <ul className="space-y-4"> {/* Increased space-y */}
              <li className="flex items-start">
                <Palette className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Sophisticated Visual Design</h4>
                  <p className="text-sm text-muted-foreground">Crafted a visually stunning interface with elegant typography and high-quality imagery to reflect the brand's luxury status.</p>
                </div>
              </li>
              <li className="flex items-start">
                <ShoppingCart className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Streamlined Checkout Process</h4>
                  <p className="text-sm text-muted-foreground">Redesigned the checkout flow to be intuitive and quick, reducing cart abandonment and improving conversion rates.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Gem className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Enhanced Product Pages</h4>
                  <p className="text-sm text-muted-foreground">Developed detailed product pages with multiple views, zoom functionality, and rich descriptions to provide an immersive shopping experience.</p>
                </div>
              </li>
               <li className="flex items-start">
                <Smartphone className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Flawless Mobile Experience</h4>
                  <p className="text-sm text-muted-foreground">Ensured the entire site was perfectly responsive and optimized for mobile users, catering to on-the-go luxury shoppers.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Results & Client Growth</h3>
            <p className="text-muted-foreground">
              The new e-commerce platform led to a 35% increase in online sales within the first six months. Average session duration grew by 25%, and customer feedback consistently praised the site's elegance and ease of use. The client also saw a significant rise in organic search traffic due to improved site structure and performance.
            </p>
          </div>
        
      </CardContent>
    </Card>
  );
}

export const metadata = {
  title: `Case Study: ${siteConfig.caseStudies.luxuryRetail.title} - ${siteConfig.name}`,
  description: siteConfig.caseStudies.luxuryRetail.description,
};
