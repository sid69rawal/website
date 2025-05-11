// src/config/site.ts

export const siteConfig = {
  name: "GetUrBizOnline",
  title: "GetUrBizOnline | Web Design & SEO Experts", 
  description: "We build Google-friendly websites that attract customers and grow your business.", 
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
    subject: "New Project Inquiry from GetUrBizOnline Website",
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
    ctaPrimaryText: "Get Your Free Quote", 
    ctaPrimaryLink: "#contact",            
    ctaSecondaryText: "Explore Our Services", 
    ctaSecondaryLink: "#services",         
  },
  servicesSection: {
    title: "Grow Your Business Online",
    subtitle: "We provide comprehensive web solutions to help you attract customers, enhance your Google presence, and achieve your business goals."
  },
  showcaseSection: {
    title: "Websites That Deliver Results",
    subtitle: "Explore our portfolio of custom websites designed to attract customers and grow businesses.",
    projects: [ // This structure might be better if showcaseProjects is directly part of siteConfig
      {
        id: 1,
        title: 'Elevated E-Commerce Platform',
        subtitle: 'Luxury Brand Website Redesign',
        description: 'Transformed an online fashion store with a sophisticated redesign, focusing on user experience and product showcasing to boost engagement and sales. Implemented custom features and a mobile-first approach.',
        tags: ['Web Development', 'UX/UI Design', 'E-Commerce', 'Mobile Responsive'],
        buttonText: 'View Case Study',
        buttonLink: '/case-studies/luxury-retail',
        imageSrc: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
        imageAlt: 'Team collaborating on a website design project for a luxury brand',
        dataAiHint: 'web design team',
        imageAspectRatio: 16/9,
      },
      {
        id: 2,
        title: 'Data-Driven SaaS Dashboard',
        subtitle: 'Analytics Platform UI/UX',
        description: 'Developed a user-friendly and intuitive dashboard for a SaaS analytics platform, enabling users to easily understand complex data and gain actionable insights. Focused on performance and scalability.',
        tags: ['Web Application', 'UI/UX Design', 'Data Visualization', 'SaaS'],
        buttonText: 'Explore Dashboard',
        buttonLink: '/case-studies/interactive-dashboard',
        imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80',
        imageAlt: 'Modern data dashboard showing charts and graphs on a computer screen',
        dataAiHint: 'saas dashboard',
        imageAspectRatio: 4/3,
      },
      {
        id: 3,
        title: 'Tech Product Launch Microsite',
        subtitle: 'Interactive Web Experience',
        description: 'Created a captivating microsite for a new technology product launch, designed to generate excitement, clearly communicate features, and drive pre-orders through an engaging user journey.',
        tags: ['Web Design', 'Lead Generation', 'Interactive Content', 'Product Marketing'],
        buttonText: 'Discover Product Site',
        buttonLink: '/case-studies/product-launch',
        imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80',
        imageAlt: 'Futuristic technology product interface on a sleek device',
        dataAiHint: 'tech product',
        imageAspectRatio: 4/3,
      }
    ]
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
  caseStudies: { // For individual case study pages
    interactiveDashboard: {
      title: "Data-Driven SaaS Dashboard",
      description: "Learn how GetUrBizOnline developed an interactive SaaS dashboard to improve data understanding and user engagement.",
    },
    luxuryRetail: {
      title: "Elevated E-Commerce Platform",
      description: "Discover how GetUrBizOnline developed a luxury e-commerce platform that increased sales and customer engagement.",
    },
    productLaunch: {
      title: "Tech Product Launch Microsite",
      description: "See how GetUrBizOnline created an interactive microsite for a product launch that boosted pre-orders and brand visibility.",
    }
  }
};

export type SiteConfig = typeof siteConfig;
