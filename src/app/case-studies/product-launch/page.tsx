
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Lightbulb, Share2, Zap } from "lucide-react"; 

export default function ProductLaunchCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80"
            alt="Interactive tech product launch website interface on a screen"
            data-ai-hint="tech launch"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
             <Badge variant="destructive" className="mb-2 text-sm bg-accent/90 text-accent-foreground">Interactive Web Experience</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              Tech Product Launch Microsite
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <CardDescription className="text-lg text-muted-foreground">
          Developed an engaging and interactive microsite for a cutting-edge technology product launch. The project aimed to create a memorable online experience that effectively showcased product features, told a compelling story, and maximized pre-order conversions.
        </CardDescription>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Core Ambitions</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Generate significant online buzz and media attention for the new product.</li>
            <li>Clearly communicate unique product benefits and features to the target audience.</li>
            <li>Create a highly shareable and memorable digital experience.</li>
            <li>Drive pre-order sign-ups and build an early adopter community.</li>
            <li>Position the brand as an innovator in its market.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Key Technologies & Strategies</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React / Next.js</Badge>
            <Badge variant="outline">Interactive Storytelling</Badge>
            <Badge variant="outline">Lead Capture Forms</Badge>
            <Badge variant="outline">Performance Optimization</Badge>
            <Badge variant="outline">Social Media Integration</Badge>
            <Badge variant="outline">Analytics Tracking</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Highlight Features & User Journey</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Rocket className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Engaging Product Reveal</h4>
                <p className="text-sm text-muted-foreground">A dynamic, interactive sequence that unveiled the product, allowing users to explore its design and core value propositions.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Story-Driven Content Sections</h4>
                <p className="text-sm text-muted-foreground">Guided users through the product's narrative with compelling content and visuals, highlighting key benefits and use cases.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Target className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Clear Call-to-Actions for Pre-Orders</h4>
                <p className="text-sm text-muted-foreground">Strategically placed CTAs and a streamlined pre-order form made it easy for interested users to sign up.</p>
              </div>
            </li>
            <li className="flex items-start">
               <Share2 className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Social Sharing Integration</h4>
                <p className="text-sm text-muted-foreground">Encouraged users to share the excitement with integrated social media sharing options, amplifying reach.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Outcomes & Impact</h3>
          <p className="text-muted-foreground">
            The product launch microsite was a major success, exceeding pre-order targets by 40%. It generated significant social media buzz, was featured on prominent tech blogs, and substantially boosted brand visibility. The interactive experience effectively educated potential customers, leading to a higher quality of leads.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Add metadata export for static pages
export const metadata = {
  title: "Case Study: Tech Product Launch Microsite - YourBusinessOnline",
  description: "See how YourBusinessOnline created an interactive microsite for a product launch that boosted pre-orders and brand visibility.",
};
