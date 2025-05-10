
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Rocket, Film, Share2 } from "lucide-react"; // More relevant icons

export default function ProductLaunchCaseStudyPage() {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80"
            alt="Immersive Product Launch"
            data-ai-hint="abstract technology"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
             <Badge variant="destructive" className="mb-2 text-sm bg-accent/90 text-accent-foreground">WebGL & Storytelling</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              Immersive Product Launch
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <CardDescription className="text-lg text-muted-foreground">
          A WebGL-powered 3D experience designed for a cutting-edge tech product launch. This project focused on creating an unforgettable interactive journey, using animations to showcase product features, tell a compelling story, and drive pre-orders.
        </CardDescription>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Core Ambitions</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Generate significant buzz and media attention for the new product.</li>
            <li>Clearly communicate unique product features through interactive 3D animations.</li>
            <li>Create a shareable, memorable online experience.</li>
            <li>Maximize pre-order sign-ups through a seamless call-to-action.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Key Technologies</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Three.js</Badge>
            <Badge variant="outline">GSAP</Badge>
            <Badge variant="outline">Lottie (for UI elements)</Badge>
            <Badge variant="outline">WebGL Shaders</Badge>
            <Badge variant="outline">Interaction Design</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Highlight Animations & Interactions</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Rocket className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Dynamic 3D Product Reveal</h4>
                <p className="text-sm text-muted-foreground">An engaging animated sequence that unveils the product in 3D, allowing users to explore it from all angles as the story unfolds.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Film className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Story-Driven Scroll Animations</h4>
                <p className="text-sm text-muted-foreground">GSAP-powered scroll-telling that guides users through the product's narrative, with animations synchronized to scroll progress.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Share2 className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Interactive Feature Hotspots</h4>
                <p className="text-sm text-muted-foreground">Users can click on hotspots on the 3D model to trigger Lottie animations that explain specific features in a visually rich way.</p>
              </div>
            </li>
            <li className="flex items-start">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mr-3 mt-1 shrink-0"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M12 12a10 10 0 0 0-4 7.9A10 10 0 0 0 12 22Z"/></svg>
              <div>
                <h4 className="font-medium text-foreground">Gesture-Controlled Navigation</h4>
                <p className="text-sm text-muted-foreground">Intuitive swipe and drag gestures for navigating the 3D space and interacting with the product model on touch devices.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Outcomes</h3>
          <p className="text-muted-foreground">
            The immersive launch site was a viral success, featured on numerous tech blogs and Awwwards. It achieved a 40% higher pre-order rate compared to previous product launches and significantly boosted brand visibility and perception as an innovator in the space.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
