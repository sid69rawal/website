"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Award } from 'lucide-react'; // Using Lucide icon

if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  buttonText: string;
  buttonLink: string; // Added for Next.js Link
  buttonColor: string;
  imageSrc: string;
  imageAlt: string; // Added for accessibility
  type: 'parallax' | 'card3d' | 'gradient';
  dataAiHint?: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'Luxury Retail Experience',
    subtitle: 'E-Commerce Animation Suite',
    description: 'A complete animation system for a high-end fashion brand, featuring scroll-triggered product reveals, micro-interactions on all UI elements, and a 3D product viewer.',
    tags: ['GSAP', 'Three.js', '60fps Performance'],
    buttonText: 'View Case Study',
    buttonLink: '/case-studies/luxury-retail',
    buttonColor: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    imageAlt: 'Team collaborating on a project in a modern office',
    type: 'parallax',
    dataAiHint: 'team collaboration'
  },
  {
    id: 2,
    title: 'Interactive Dashboard UI',
    subtitle: 'Data Visualization Motion',
    description: 'Data visualization animations that bring complex analytics to life with fluid transitions, responsive charts, and interactive filtering controls.',
    tags: ['Framer Motion', 'D3.js', 'Accessibility'],
    buttonText: 'Explore Dashboard',
    buttonLink: '/case-studies/interactive-dashboard',
    buttonColor: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80',
    imageAlt: 'Interactive data dashboard on a screen',
    type: 'card3d',
    dataAiHint: 'data dashboard'
  },
  {
    id: 3,
    title: 'Immersive Product Launch',
    subtitle: 'WebGL & Storytelling',
    description: 'A WebGL-powered 3D experience showcasing a new tech product with interactive elements, gesture controls, and seamless page transitions for impactful storytelling.',
    tags: ['Three.js', 'GSAP', 'Lottie'],
    buttonText: 'Discover Product',
    buttonLink: '/case-studies/product-launch',
    buttonColor: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80',
    imageAlt: 'Abstract technology background with glowing lines',
    type: 'gradient',
    dataAiHint: 'abstract technology'
  }
];

const ShowcaseSection = () => {
  const sectionControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { entry, isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.05, // Lower threshold for earlier animation start
    rootMargin: '-50px',
    freezeOnceVisible: true,
  });
  
  useEffect(() => {
    if (isIntersecting) {
      sectionControls.start('visible');
    }
  }, [sectionControls, isIntersecting]);
  
  // Individual project refs for GSAP parallax
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  projectRefs.current = []; // Clear on re-renders before collecting refs

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };
  
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    projectRefs.current.forEach((projectRef, index) => {
      if (!projectRef) return;
      const project = showcaseProjects[index];
      if (project.type === 'parallax') {
        const parallaxLayer = projectRef.querySelector('.parallax-layer') as HTMLElement;
        if (!parallaxLayer) return;
        
        const st = gsap.to(parallaxLayer, {
          yPercent: 20, // Use yPercent for smoother parallax
          ease: 'none',
          scrollTrigger: {
            trigger: projectRef,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5, // Smoother scrubbing
            // markers: process.env.NODE_ENV === 'development',
          }
        });
        triggers.push(st.scrollTrigger!);
      }
    });
    return () => {
      triggers.forEach(trigger => trigger.kill());
    }
  }, [isIntersecting]); // Re-run if section becomes visible, in case refs weren't ready
  
  return (
    <section id="showcase" className="py-24 bg-muted/20 dark:bg-gray-950 theme-transition relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-20"
          variants={slideUpVariants}
          initial="hidden"
          animate={sectionControls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our Animation Showcase</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of performant, engaging web animations that drive results.
          </p>
        </motion.div>
        
        <div className="space-y-20 md:space-y-24">
          {showcaseProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              ref={addToRefs}
              className="showcase-item"
              variants={slideUpVariants} // Each project card animates up
              initial="hidden"
              animate={sectionControls} // Controlled by the main section intersection
              transition={{ delay: 0.15 * index, duration: 0.6 }} // Staggered delay
            >
              {/* Parallax Card */}
              {project.type === 'parallax' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="parallax-container relative h-[400px] md:h-[500px] overflow-hidden group">
                    <div 
                      className="parallax-layer absolute inset-0"
                      style={{ willChange: 'transform' }} // GPU acceleration hint
                    >
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        data-ai-hint={project.dataAiHint}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        priority={index === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md">{project.subtitle}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h4 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h4>
                    <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium",
                            "bg-primary/10 text-primary dark:bg-primary/20" // Simplified common tag style
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={project.buttonLink}
                      className={cn(
                        "inline-block px-8 py-3 rounded-lg font-semibold text-base",
                        "transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                        project.buttonColor
                      )}
                    >
                      {project.buttonText}
                    </Link>
                  </div>
                </div>
              )}
              
              {/* 3D Card */}
              {project.type === 'card3d' && (
                <div 
                  className="card-3d bg-card dark:bg-gray-800 rounded-xl shadow-2xl perspective-1000 hover:shadow-primary/30"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="card-3d-content transform-gpu transition-transform duration-500 ease-out p-1"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                      <div className="p-6 md:p-8 order-2 md:order-1">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h3>
                        <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium",
                                "bg-secondary/10 text-secondary dark:bg-secondary/20"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link 
                          href={project.buttonLink}
                          className={cn(
                            "inline-block px-8 py-3 rounded-lg font-semibold text-base w-fit",
                            "transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                            project.buttonColor
                          )}
                        >
                          {project.buttonText}
                        </Link>
                      </div>
                      <div className="h-64 md:h-full order-1 md:order-2 rounded-t-lg md:rounded-r-lg md:rounded-t-none overflow-hidden">
                        <Image 
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          data-ai-hint={project.dataAiHint}
                          width={500}
                          height={400}
                          style={{ objectFit: 'cover' }}
                          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gradient Card */}
              {project.type === 'gradient' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                    <div className="md:col-span-3 h-64 md:h-[450px] relative group">
                      <Image 
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        data-ai-hint={project.dataAiHint}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                        <div className="inline-flex items-center px-4 py-2 bg-accent/80 backdrop-blur-sm rounded-full mb-3 text-sm font-semibold text-accent-foreground">
                          <Award className="mr-2 h-4 w-4" />
                          <span>Awwwards Nominee</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold drop-shadow-md">{project.subtitle}</h3>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8">
                      <h4 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h4>
                      <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                           <span 
                           key={tag}
                           className={cn(
                             "px-3 py-1.5 rounded-full text-xs font-medium",
                             "bg-accent/10 text-accent dark:bg-accent/20"
                           )}
                         >
                           {tag}
                         </span>
                        ))}
                      </div>
                      <Link 
                        href={project.buttonLink}
                        className={cn(
                          "inline-block px-8 py-3 rounded-lg font-semibold text-base w-fit",
                          "transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                          project.buttonColor
                        )}
                      >
                        {project.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
