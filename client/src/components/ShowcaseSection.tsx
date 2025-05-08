import { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';

interface ShowcaseProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  buttonText: string;
  buttonColor: string;
  imageSrc: string;
  type: 'parallax' | 'card3d' | 'gradient';
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'Luxury Retail Experience',
    subtitle: 'E-Commerce Animation Suite',
    description: 'A complete animation system for a high-end fashion brand, featuring scroll-triggered product reveals, micro-interactions on all UI elements, and a 3D product viewer.',
    tags: ['GSAP', 'Three.js', '60fps Performance'],
    buttonText: 'View Case Study',
    buttonColor: 'bg-primary hover:bg-primary/90 hover:shadow-primary/50',
    imageSrc: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    type: 'parallax'
  },
  {
    id: 2,
    title: 'Interactive Dashboard',
    subtitle: '',
    description: 'Data visualization animations that bring complex analytics to life with fluid transitions, responsive charts, and interactive filtering controls.',
    tags: ['Framer Motion', 'D3.js', 'GPU Acceleration'],
    buttonText: 'View Case Study',
    buttonColor: 'bg-secondary hover:bg-secondary/90 hover:shadow-secondary/50',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80',
    type: 'card3d'
  },
  {
    id: 3,
    title: 'Immersive Product Launch',
    subtitle: '',
    description: 'A WebGL-powered 3D experience showcasing a new tech product with interactive elements, gesture controls, and seamless page transitions.',
    tags: ['Three.js', 'GSAP', 'Lottie'],
    buttonText: 'View Case Study',
    buttonColor: 'bg-accent hover:bg-accent/90 hover:shadow-accent/50',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80',
    type: 'gradient'
  }
];

const ShowcaseSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '-50px',
  });
  
  useEffect(() => {
    if (entry?.isIntersecting) {
      controls.start('visible');
    }
  }, [controls, entry]);
  
  useEffect(() => {
    // Setup parallax effect for each project
    projectRefs.current.forEach((projectRef, index) => {
      if (!projectRef) return;
      
      const project = showcaseProjects[index];
      
      if (project.type === 'parallax') {
        const parallaxLayer = projectRef.querySelector('.parallax-layer');
        if (!parallaxLayer) return;
        
        gsap.to(parallaxLayer, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: projectRef,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }, []);
  
  return (
    <section id="showcase" className="py-24 theme-transition relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Animation Showcase</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of performant, engaging web animations that drive results.
          </p>
        </motion.div>
        
        {showcaseProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            ref={el => projectRefs.current[index] = el}
            className="mb-24 last:mb-0"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 * index }}
          >
            {project.type === 'parallax' && (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="parallax-container relative h-[500px] overflow-hidden">
                  <div 
                    className="parallax-layer absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.imageSrc})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: 'translateZ(0)',
                      willChange: 'transform' // Add will-change for better GPU acceleration
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-8 py-4 bg-white/80 dark:bg-black/70 backdrop-blur-md rounded-lg">
                      <h3 className="text-2xl font-bold">{project.subtitle}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={cn(
                          "px-3 py-1 rounded-full text-sm",
                          tagIndex % 3 === 0 ? "bg-primary/10 text-primary" :
                          tagIndex % 3 === 1 ? "bg-secondary/10 text-secondary" :
                          "bg-accent/10 text-accent"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="#" 
                    className={cn(
                      "inline-block px-6 py-3 text-white rounded-lg font-medium",
                      "transition-all duration-200 shadow-lg transform hover:-translate-y-1",
                      project.buttonColor
                    )}
                  >
                    {project.buttonText}
                  </a>
                </div>
              </div>
            )}
            
            {project.type === 'card3d' && (
              <div className="card-3d bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl transform-gpu hover:rotate-y-5 hover:rotate-x-5 transition-transform duration-600">
                <div className="card-3d-content transform-gpu translate-z-20 transition-transform duration-600">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={cn(
                              "px-3 py-1 rounded-full text-sm",
                              tagIndex % 3 === 0 ? "bg-primary/10 text-primary" :
                              tagIndex % 3 === 1 ? "bg-secondary/10 text-secondary" :
                              "bg-accent/10 text-accent"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href="#" 
                        className={cn(
                          "inline-block px-6 py-3 text-white rounded-lg font-medium w-fit",
                          "transition-all duration-200 shadow-lg transform hover:-translate-y-1",
                          project.buttonColor
                        )}
                      >
                        {project.buttonText}
                      </a>
                    </div>
                    <div className="h-80 md:h-auto order-1 md:order-2">
                      <img 
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {project.type === 'gradient' && (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 h-80 md:h-auto relative">
                    <img 
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full mb-4">
                        <i className="fas fa-trophy mr-2"></i>
                        <span>Awwwards Nominee</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={cn(
                            "px-3 py-1 rounded-full text-sm",
                            tagIndex % 3 === 0 ? "bg-primary/10 text-primary" :
                            tagIndex % 3 === 1 ? "bg-secondary/10 text-secondary" :
                            "bg-accent/10 text-accent"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href="#" 
                      className={cn(
                        "inline-block px-6 py-3 text-white rounded-lg font-medium w-fit",
                        "transition-all duration-200 shadow-lg transform hover:-translate-y-1",
                        project.buttonColor
                      )}
                    >
                      {project.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShowcaseSection;
