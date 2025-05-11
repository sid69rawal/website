
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle'; 
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react'; 
import { siteConfig } from '@/config/site';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinks = siteConfig.headerNavLinks;

  return (
    <motion.header 
      id="header"
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-1" : "py-3", 
      )}
      initial={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className={cn(
        "container mx-auto px-6 flex items-center justify-between",
        isScrolled ? "h-12" : "h-16" // h-12 is 48px, fits within 50px
      )}>
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary transition-transform duration-200 transform hover:scale-105">
              {siteConfig.name}<span className="text-accent">.</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => {
            let isActive = pathname === link.href;
            if (link.href.startsWith('/#') && pathname === '/') {
              if (typeof window !== 'undefined') {
                // For initial load or if hash changes programmatically
                isActive = window.location.hash === link.href.substring(1);
              }
            }
            
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "font-medium text-sm hover:text-primary transition-colors duration-200 py-2",
                  isActive ? "text-primary font-semibold underline decoration-primary underline-offset-4" : "text-foreground" 
                )}
                onClick={() => {
                  // No special onClick for closeMobileMenu needed here as it's desktop
                  if (link.href.startsWith('/#')) {
                    // Smooth scroll for hash links
                    const elementId = link.href.substring(2); // remove '/#'
                    const element = document.getElementById(elementId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild size="sm" className="ml-2 hidden lg:inline-flex btn-effect">
            <Link href={siteConfig.mainHero.ctaPrimaryLink}>
              {siteConfig.mainHero.ctaPrimaryText}
            </Link>
          </Button>
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden fixed inset-0 bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button 
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close mobile menu"
            >
              <X className="h-7 w-7" />
            </button>
            <div className="flex flex-col items-center space-y-6 text-center">
              {navLinks.map((link) => {
                let isActive = pathname === link.href;
                if (link.href.startsWith('/#') && pathname === '/') {
                   if (typeof window !== 'undefined') {
                     isActive = window.location.hash === link.href.substring(1);
                   }
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block font-medium text-xl py-3 hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center justify-center",
                    isActive ? "text-primary font-semibold underline decoration-primary underline-offset-4" : "text-foreground"
                  )}
                  onClick={() => {
                    closeMobileMenu();
                    if (link.href.startsWith('/#')) {
                      // Smooth scroll for hash links
                      const elementId = link.href.substring(2); // remove '/#'
                      const element = document.getElementById(elementId);
                      if (element) {
                        // Timeout to allow menu to close before scrolling
                        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 300);
                      }
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
              })}
              <Button asChild size="lg" className="mt-6 btn-effect">
                <Link href={siteConfig.mainHero.ctaPrimaryLink} onClick={closeMobileMenu}>
                  {siteConfig.mainHero.ctaPrimaryText}
                </Link>
              </Button>
              <div className="pt-4 mt-4 border-t border-border w-3/4">
                 <ThemeToggle isMobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
