
"use client";

import { useEffect, useRef } from 'react';
import type { ElementType } from 'react'; 
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, BarChart3 as BarChartIcon } from 'lucide-react'; 

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
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'Elevated E-Commerce Platform',
    subtitle: 'Luxury Brand Website Redesign',
    description: 'Transformed an online fashion store with a sophisticated redesign, focusing on user experience and product showcasing to boost engagement and sales. Implemented custom features and a mobile-first approach.',
    tags: ['Web Development', 'UX/UI Design', 'E-Commerce', 'Mobile Responsive'],
    buttonText: 'View Case Study',
    buttonLink: '/case-studies/luxury-retail',
    buttonColor: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    imageAlt: 'Team collaborating on a website design project for a luxury brand',
    type: 'parallax',
    dataAiHint: 'web design team',
    icon: Users,
  },
  {
    id: 2,
    title: 'Data-Driven SaaS Dashboard',
    subtitle: 'Analytics Platform UI/UX',
    description: 'Developed a user-friendly and intuitive dashboard for a SaaS analytics platform, enabling users to easily understand complex data and gain actionable insights. Focused on performance and scalability.',
    tags: ['Web Application', 'UI/UX Design', 'Data Visualization', 'SaaS'],
    buttonText: 'Explore Dashboard',
    buttonLink: '/case-studies/interactive-dashboard',
    buttonColor: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80',
    imageAlt: 'Modern data dashboard showing charts and graphs on a computer screen',
    type: 'card3d',
    dataAiHint: 'saas dashboard',
    icon: BarChartIcon,
  },
  {
    id: 3,
    title: 'Tech Product Launch Microsite',
    subtitle: 'Interactive Web Experience',
    description: 'Created a captivating microsite for a new technology product launch, designed to generate excitement, clearly communicate features, and drive pre-orders through an engaging user journey.',
    tags: ['Web Design', 'Lead Generation', 'Interactive Content', 'Product Marketing'],
    buttonText: 'Discover Product Site',
    buttonLink: '/case-studies/product-launch',
    buttonColor: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80',
    imageAlt: 'Futuristic technology product interface on a sleek device',
    type: 'gradient',
    dataAiHint: 'tech product',
    icon: Award,
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
        const parallaxLayer = projectRef.querySelector('.parallax-layer') as HTMLElement;
        if (!parallaxLayer) return;
        
        const stInstance = gsap.to(parallaxLayer, { 
          yPercent: 20, 
          ease: 'none',
          scrollTrigger: {
            trigger: projectRef,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5, 
          }
        });
        if (stInstance.scrollTrigger) { 
            triggers.push(stInstance.scrollTrigger);
        }
      }
    });
    return () => {
      triggers.forEach(trigger => trigger.kill());
    }
  }, [isIntersecting]); 
  
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Websites That Deliver Results</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of custom websites designed to attract customers and grow businesses.
          </p>
        </motion.div>
        
        <div className="space-y-20 md:space-y-24">
          {showcaseProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
            <motion.div 
              key={project.id}
              ref={addToRefs}
              className="showcase-item"
              variants={slideUpVariants}
              initial="hidden"
              animate={sectionControls}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              {project.type === 'parallax' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl card-hover">
                  <div className="parallax-container relative h-[400px] md:h-[500px] overflow-hidden group">
                    <div 
                      className="parallax-layer absolute inset-0"
                      style={{ willChange: 'transform' }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                      {IconComponent && <IconComponent className="h-8 w-8 text-white/80 mb-2" />}
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
              
              {project.type === 'card3d' && (
                <div 
                  className="card-3d bg-card dark:bg-gray-800 rounded-xl shadow-2xl perspective-1000 hover:shadow-secondary/30"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="card-3d-content transform-gpu transition-transform duration-500 ease-out p-1"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                      <div className="p-6 md:p-8 order-2 md:order-1">
                        {IconComponent && <IconComponent className="h-7 w-7 text-secondary mb-3" />}
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
                      <div className="h-64 md:h-full order-1 md:order-2 rounded-t-lg md:rounded-r-lg md:rounded-t-none overflow-hidden group">
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
              
              {project.type === 'gradient' && (
                <div className="bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl card-hover">
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
                         {IconComponent && (
                            <div className="inline-flex items-center px-4 py-2 bg-accent/80 backdrop-blur-sm rounded-full mb-3 text-sm font-semibold text-accent-foreground">
                                <IconComponent className="mr-2 h-4 w-4" />
                                <span>Featured Project</span>
                            </div>
                         )}
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
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
