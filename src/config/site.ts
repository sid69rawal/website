// src/config/site.ts

export const siteConfig = {
  name: "GetUrBizOnline",
  title: "GetUrBizOnline | Web Design & SEO Experts", // Updated title format
  description: "We build Google-friendly websites that attract customers and grow your business.", // Refined tagline
  url: "https://geturbiz.online", 
  ogImage: "https://geturbiz.online/og-image.png", 

  links: {
    twitter: "#", 
    github: "https://github.com/yourbusinessonline", 
    linkedin: "https://linkedin.com/company/yourbusinessonline", 
  },
  contact: {
    address: "Toronto, ON Canada & India",
    phone: "+1 416-857-8831 & +91 92594-18994",
    email: "sidrawal1200@gmail.com", 
    jurisdiction: "Canada & India",
  },
  formSubmit: {
    email: "sidrawal1200@gmail.com", 
    subject: "New Project Inquiry from GetUrBizOnline Website", // Updated site name in subject
    thankYouPage: "/", 
  },
  legal: {
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
  },
  headerNavLinks: [
    { href: "/#services", label: "Services" },
    { href: "/#showcase", label: "Our Work" },
    { href: "/#features", label: "Why Us" },
    { href: "/#contact", label: "Contact" },
  ],
  footerServiceLinks: [
    { href: "/#services", label: "Custom Web Design" },
    { href: "/#services", label: "SEO & Google Ranking" },
    { href: "/#services", label: "Responsive Development" },
    { href: "/#features", label: "Lead Generation Sites" },
    { href: "/#contact", label: "E-commerce Solutions" },
  ],
  mainHero: {
    titlePart1: "Get Your Business ",
    titleHighlight: "Found on Google",
    subtitle: "We build professional websites designed to attract customers, enhance your online presence, and drive business growth through effective SEO strategies.",
    ctaPrimaryText: "Get Your Free Quote", // Updated to prominent CTA
    ctaPrimaryLink: "#contact",             // Link for prominent CTA
    ctaSecondaryText: "Explore Our Services", // Updated secondary CTA
    ctaSecondaryLink: "#services",          // Link for secondary CTA
  },
  servicesSection: {
    title: "Grow Your Business Online",
    subtitle: "We provide comprehensive web solutions to help you attract customers, enhance your Google presence, and achieve your business goals."
  },
  showcaseSection: {
    title: "Websites That Deliver Results",
    subtitle: "Explore our portfolio of custom websites designed to attract customers and grow businesses."
  },
  featuresSection: {
    title: "Why Choose Us for Your Website?",
    subtitle: "We build high-performance websites that not only look great but are optimized to attract customers through Google and drive your business forward."
  },
  ctaSection: {
    title: "Ready to Grow Your Business Online?",
    subtitle: "Let's build a powerful website that attracts your ideal customers through Google, boosts your visibility, and drives measurable results.",
    buttonText: "Get Your Free Quote",
    buttonLink: "/#contact",
  },
  contactSection: {
    title: "Let's Build Your Success Online",
    subtitle: "Interested in a new website or improving your Google visibility? Fill out the form, and we'll be in touch to discuss how we can help.",
    formFields: {
      name: "Full Name",
      email: "Email Address",
      projectInterest: "I'm interested in...",
      message: "Your Message",
      projectOptions: [
        { value: "new_website", label: "New Website Development" },
        { value: "website_redesign", label: "Website Redesign & SEO" },
        { value: "seo_services", label: "SEO & Google Visibility Improvement" },
        { value: "ecommerce_solution", label: "E-commerce Website Solution" },
        { value: "consultation", label: "General Consultation / Undecided" },
        { value: "other", label: "Other Specific Project" },
      ],
      submitButtonText: "Send Project Inquiry"
    }
  },
  notFoundPage: {
    title: "404 - Page Not Found",
    description: "Oops! The page you are looking for does not exist. It might have been moved or deleted.",
    contactSupportText: "If you believe this is an error, please contact support.",
    buttonText: "Go back to Homepage",
    buttonLink: "/",
  },
  caseStudies: {
    interactiveDashboard: {
      title: "Data-Driven SaaS Dashboard",
      description: "Learn how GetUrBizOnline developed an interactive SaaS dashboard to improve data understanding and user engagement.", // Updated site name
    },
    luxuryRetail: {
      title: "Elevated E-Commerce Platform",
      description: "Discover how GetUrBizOnline developed a luxury e-commerce platform that increased sales and customer engagement.", // Updated site name
    },
    productLaunch: {
      title: "Tech Product Launch Microsite",
      description: "See how GetUrBizOnline created an interactive microsite for a product launch that boosted pre-orders and brand visibility.", // Updated site name
    }
  }
};

export type SiteConfig = typeof siteConfig;
