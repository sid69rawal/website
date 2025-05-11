/** @jsxImportSource react */
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Twitter, Github, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: siteConfig.links.twitter, icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: siteConfig.links.github, icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { href: siteConfig.links.linkedin, icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
  ];

  const legalLinks = [
    { href: siteConfig.legal.privacyPolicy, label: "Privacy Policy" },
    { href: siteConfig.legal.termsOfService, label: "Terms of Service" },
  ];

  const { addressParts, phoneParts, email } = siteConfig.contact;

  return (
    <footer className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 theme-transition">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Column 1: Brand and Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-bold flex items-center mb-4 text-foreground dark:text-white">
                {siteConfig.name}<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs">
              {siteConfig.description.substring(0, 150) + "..."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-base font-semibold text-foreground dark:text-white mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {siteConfig.footerServiceLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-base font-semibold text-foreground dark:text-white mb-4">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm">
              {addressParts.map((part, index) => (
                <li key={`address-${index}`} className="flex items-start text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2.5 mt-0.5 shrink-0 text-primary" />
                  <span>{part.location}</span>
                </li>
              ))}
              {phoneParts.map((part, index) => (
                <li key={`phone-${index}`} className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2.5 shrink-0 text-primary" />
                  <a href={`tel:${part.number.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200 hover:underline">
                    {part.number} ({part.country})
                  </a>
                </li>
              ))}
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2.5 shrink-0 text-primary" />
                {/* Changed mailto link to plain text */}
                <span>{email}</span>
              </li>
            </ul>
             <p className="text-xs text-muted-foreground mt-3">For inquiries, please use our <Link href="/#contact" className="text-primary hover:underline">contact form</Link>.</p>
          </div>

          {/* Column 4: Newsletter or other info */}
           <div>
            <h4 className="text-base font-semibold text-foreground dark:text-white mb-4">Stay Informed</h4>
            <p className="text-sm text-muted-foreground mb-3">Get tips on improving your online presence and our latest offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2.5 text-sm bg-background dark:bg-gray-700 border border-input rounded-l-md focus:ring-primary focus:border-primary outline-none text-foreground dark:text-white placeholder-muted-foreground" />
                <button type="submit" className="px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-r-md hover:bg-primary/90 transition-colors">Subscribe</button>
            </form>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex space-x-5">
            {legalLinks.map(link => (
              <li key={link.label}>
                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
