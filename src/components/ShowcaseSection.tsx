/** @jsxImportSource react */
"use client";

import { useEffect, useRef } from 'react';
import type { ElementType } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Award, Users, BarChart3 as BarChartIcon } from 'lucide-react'; 
import { siteConfig } from '@/config/site';
import { LazyImage } from '@/components/ui/lazy-image'; // Import LazyImage
import { AspectRatio } from '@/components/ui/aspect-ratio';


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
  buttonLink: string;
  buttonColor: string;
  imageSrc: string;
  imageAlt: string;
  type: 'parallax' | 'card3d' | 'gradient';
  dataAiHint?: string;
  icon?: ElementType; 
  imageAspectRatio?: number;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: siteConfig.showcaseSection.projects[0].title,
    subtitle: siteConfig.showcaseSection.projects[0].subtitle,
    description: siteConfig.showcaseSection.projects[0].description,
    tags: siteConfig.showcaseSection.projects[0].tags,
    buttonText: siteConfig.showcaseSection.projects[0].buttonText,
    buttonLink: siteConfig.showcaseSection.projects[0].buttonLink,
    buttonColor: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    imageSrc: siteConfig.showcaseSection.projects[0].imageSrc,
    imageAlt: siteConfig.showcaseSection.projects[0].imageAlt,
    type: 'parallax',
    dataAiHint: siteConfig.showcaseSection.projects[0].dataAiHint,
    icon: Users,
    imageAspectRatio: siteConfig.showcaseSection.projects[0].imageAspectRatio || 16/9,
  },
  {
    id: 2,
    title: siteConfig.showcaseSection.projects[1].title,
    subtitle: siteConfig.showcaseSection.projects[1].subtitle,
    description: siteConfig.showcaseSection.projects[1].description,
    tags: siteConfig.showcaseSection.projects[1].tags,
    buttonText: siteConfig.showcaseSection.projects[1].buttonText,
    buttonLink: siteConfig.showcaseSection.projects[1].buttonLink,
    buttonColor: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    imageSrc: siteConfig.showcaseSection.projects[1].imageSrc,
    imageAlt: siteConfig.showcaseSection.projects[1].imageAlt,
    type: 'card3d',
    dataAiHint: siteConfig.showcaseSection.projects[1].dataAiHint,
    icon: BarChartIcon,
    imageAspectRatio: siteConfig.showcaseSection.projects[1].imageAspectRatio || 4/3,
  },
  {
    id: 3,
    title: siteConfig.showcaseSection.projects[2].title,
    subtitle: siteConfig.showcaseSection.projects[2].subtitle,
    description: siteConfig.showcaseSection.projects[2].description,
    tags: siteConfig.showcaseSection.projects[2].tags,
    buttonText: siteConfig.showcaseSection.projects[2].buttonText,
    buttonLink: siteConfig.showcaseSection.projects[2].buttonLink,
    buttonColor: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    imageSrc: siteConfig.showcaseSection.projects[2].imageSrc,
    imageAlt: siteConfig.showcaseSection.projects[2].imageAlt,
    type: 'gradient',
    dataAiHint: siteConfig.showcaseSection.projects[2].dataAiHint,
    icon: Award,
    imageAspectRatio: siteConfig.showcaseSection.projects[2].imageAspectRatio || 4/3,
  }
];

const ShowcaseSection = () => {
  const sectionControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { entry, isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.05, 
    rootMargin: '-50px',
    freezeOnceVisible: true,
  });
  
  useEffect(() => {
    if (isIntersecting) {
      sectionControls.start('visible');
    }
  }, [sectionControls, isIntersecting]);
  
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  projectRefs.current = []; 

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
        const parallaxLayer = projectRef.querySelector('.parallax-layer-image') as HTMLElement;
        if (!parallaxLayer) return;
        
        const stInstance = gsap.to(parallaxLayer, { 
          yPercent: 20, 
          ease: 'none',
          scrollTrigger: {
            trigger: projectRef,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
        // No need to push stInstance directly if not using its scrollTrigger property
      }
    });
    return () => {
      triggers.forEach(trigger => trigger.kill()); 
    }
  }, [isIntersecting]); 
  
  return (
    <section id="showcase" className="py-20 md:py-24 lg:py-28 bg-muted/30 dark:bg-gray-950 theme-transition relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-16 md:mb-20 lg:mb-24"
          variants={slideUpVariants}
          initial="hidden"
          animate={sectionControls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-foreground">{siteConfig.showcaseSection.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteConfig.showcaseSection.subtitle}
          </p>
        </motion.div>
        
        <div className="space-y-20 md:space-y-24 lg:space-y-28">
          {showcaseProjects.map((project, index) => {
            const IconComponent = project.icon;
            const aspectRatio = project.imageAspectRatio || 16/9;
            return (
            <motion.div 
              key={project.id}
              ref={addToRefs}
              className="showcase-item card-hover"
              variants={slideUpVariants}
              initial="hidden"
              animate={sectionControls}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              {project.type === 'parallax' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="relative h-auto overflow-hidden group"> 
                     <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-t-lg">
                        <LazyImage
                            src={project.imageSrc}
                            alt={project.imageAlt}
                            data-ai-hint={project.dataAiHint}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="parallax-layer-image transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            priority={index === 0}
                        />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                      {IconComponent && <IconComponent className="h-8 w-8 text-white/90 mb-2" />}
                      <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">{project.subtitle}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 lg:p-10">
                    <h4 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h4>
                    <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold",
                            "bg-primary/10 text-primary dark:bg-primary/20"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={project.buttonLink}
                      className={cn(
                        "inline-block px-8 py-3 rounded-lg font-semibold text-base btn-effect", 
                        "transition-all duration-300 shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1",
                        project.buttonColor
                      )}
                    >
                      {project.buttonText}
                    </Link>
                  </div>
                </div>
              )}
              
              {project.type === 'card3d' && (
                <div 
                  className="card-3d bg-card dark:bg-gray-800 rounded-xl shadow-2xl perspective-1000 hover:shadow-secondary/40"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="card-3d-content transform-gpu transition-transform duration-500 ease-out" 
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                      <div className="p-6 md:p-8 lg:p-10 order-2 md:order-1">
                        {IconComponent && <IconComponent className="h-7 w-7 text-secondary mb-3" />}
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h3>
                        <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-semibold",
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
                            "inline-block px-8 py-3 rounded-lg font-semibold text-base w-fit btn-effect", 
                            "transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                            project.buttonColor
                          )}
                        >
                          {project.buttonText}
                        </Link>
                      </div>
                      <div className="order-1 md:order-2 rounded-t-lg md:rounded-r-lg md:rounded-t-none overflow-hidden group">
                         <AspectRatio ratio={aspectRatio} className="rounded-lg md:rounded-r-lg md:rounded-t-none">
                            <LazyImage 
                              src={project.imageSrc}
                              alt={project.imageAlt}
                              data-ai-hint={project.dataAiHint}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 500px"
                            />
                        </AspectRatio>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {project.type === 'gradient' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                    <div className="md:col-span-3 relative group rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
                        <AspectRatio ratio={aspectRatio}>
                            <LazyImage 
                                src={project.imageSrc}
                                alt={project.imageAlt}
                                data-ai-hint={project.dataAiHint}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 500px"
                            />
                       </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                         {IconComponent && (
                            <div className="inline-flex items-center px-4 py-2 bg-accent/80 backdrop-blur-sm rounded-full mb-3 text-sm font-semibold text-accent-foreground shadow-md">
                                <IconComponent className="mr-2 h-4 w-4" />
                                <span>Featured Project</span>
                            </div>
                         )}
                        <h3 className="text-2xl md:text-3xl font-semibold drop-shadow-lg">{project.subtitle}</h3>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8 lg:p-10">
                      <h4 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h4>
                      <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                           <span 
                           key={tag}
                           className={cn(
                             "px-3 py-1.5 rounded-full text-xs font-semibold",
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
                          "inline-block px-8 py-3 rounded-lg font-semibold text-base w-fit btn-effect", 
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
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
