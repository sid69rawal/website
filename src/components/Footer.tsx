
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

  const phoneNumbers = siteConfig.contact.phone.split(' & ');
  const locations = siteConfig.contact.address.split(' & ');

  return (
    <footer className="py-16 bg-gray-800 dark:bg-gray-900 text-gray-300 theme-transition">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand and Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-bold flex items-center mb-4 text-white">
                {siteConfig.name}<span className="text-accent">.</span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-xs">
              {siteConfig.description.substring(0, 150) + "..."} {/* Shortened description */}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
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
            <h4 className="text-lg font-semibold text-white mb-5">Our Services</h4>
            <ul className="space-y-3">
              {siteConfig.footerServiceLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              {locations.map((location, index) => (
                <li key={index} className="flex items-start text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 shrink-0 text-primary" />
                  <span>{location.trim()}</span>
                </li>
              ))}
              {phoneNumbers.map((phone, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3 shrink-0 text-primary" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200 hover:underline">
                    {phone.trim()}
                  </a>
                </li>
              ))}
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors duration-200 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter or other info */}
           <div>
            <h4 className="text-lg font-semibold text-white mb-5">Stay Informed</h4>
            <p className="text-sm text-gray-400 mb-3">Get tips on improving your online presence and our latest offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-l-md focus:ring-primary focus:border-primary outline-none text-white placeholder-gray-500" />
                <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-r-md hover:bg-primary/90 transition-colors">Subscribe</button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex space-x-6">
            {legalLinks.map(link => (
              <li key={link.label}>
                <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors duration-200 hover:underline">
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

