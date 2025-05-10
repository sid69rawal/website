
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react'; 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      setIsScrolled(scrollTop > 50);
      
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Only hide if not on a case study page or other specific deep links
        if (!pathname.startsWith('/case-studies') && !pathname.startsWith('/privacy-policy') && !pathname.startsWith('/terms-of-service')) {
             setIsHidden(true);
        }
      } else {
        setIsHidden(false);
      }
      
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop, pathname]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#showcase", label: "Our Work" },
    { href: "/#features", label: "Why Us" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <motion.header 
      id="header"
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "py-4",
      )}
      initial={{ y: 0 }}
      animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }} 
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary transition-transform duration-200 transform hover:scale-105">
              YourBusinessOnline<span className="text-accent">.</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            // Check if the link is active. For hash links, check if pathname is '/' and hash matches.
            const isActive = pathname === '/' && typeof window !== 'undefined' && window.location.hash === link.href.substring(1)
                              || pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "font-medium text-sm hover:text-primary transition-colors duration-200",
                  isActive ? "text-primary font-semibold" : "text-foreground" // Apply active styles
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="md:hidden bg-background dark:bg-gray-800 shadow-lg rounded-b-lg mx-0 overflow-hidden absolute w-full left-0 top-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => {
                 const isActive = pathname === '/' && typeof window !== 'undefined' && window.location.hash === link.href.substring(1)
                                 || pathname === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "block font-medium py-2 hover:text-primary transition-colors duration-200",
                      isActive ? "text-primary font-semibold" : "text-foreground"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
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
