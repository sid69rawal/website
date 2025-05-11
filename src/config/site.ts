// src/config/site.ts
import type { LucideIcon } from 'lucide-react'; // Ensure LucideIcon is available if used for typing

export const siteConfig = {
  name: "GetUrBizOnline",
  title: "GetUrBizOnline | Web Design & SEO Experts",
  description: "We build Google-friendly websites that attract customers and grow your business. Based in Toronto, ON Canada & India.",
  url: "https://geturbiz.online",
  ogImage: "https://geturbiz.online/og-image.png",

  links: {
    twitter: "#",
    github: "https://github.com/yourbusinessonline",
    linkedin: "https://linkedin.com/company/yourbusinessonline",
  },
  contact: {
    addressParts: [
      { location: "Toronto, ON Canada", fullAddress: "Toronto, ON Canada" },
      { location: "India", fullAddress: "India" }
    ],
    phoneParts: [
      { number: "+1 416-857-8831", country: "Canada" },
      { number: "+91 92594-18994", country: "India" }
    ],
    email: "sidrawal1200@gmail.com",
    jurisdiction: "Canada & India", // For legal pages
  },
  formSubmit: {
    email: "sidrawal1200@gmail.com",
    subject: "New Project Inquiry from GetUrBizOnline Website",
    thankYouPage: "/", // Redirect to homepage after submission
  },
  legal: {
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
  },
  headerNavLinks: [
    { href: "/services", label: "Services" }, // Points to the new services overview page
    { href: "/#showcase", label: "Our Work" },
    { href: "/#features", label: "Why Us" },
    { href: "/#contact", label: "Contact" },
  ],
  allServices: [
    {
      slug: "custom-website-design",
      iconName: "LayoutTemplate",
      title: "Custom Website Design",
      shortDescription: "Professionally designed, user-friendly websites tailored to your brand, built to convert visitors into customers.",
      link: "/services/custom-website-design",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=1",
        heroImageAlt: "Laptop displaying a custom website design interface",
        heroImageAiHint: "website design laptop",
        longDescription: "We craft bespoke websites that perfectly reflect your brand identity and business goals. Our custom designs are not just visually stunning but also strategically built for optimal user experience, ensuring your visitors are engaged and guided towards conversion. We focus on intuitive navigation, responsive layouts, and performance.",
        keyBenefits: [
          "Unique brand representation that stands out.",
          "User-centric design for higher engagement.",
          "Optimized for conversions and business growth.",
          "Scalable solutions that grow with your business.",
          "Mobile-first approach for all devices."
        ],
        features: [
          { title: "Tailored UI/UX Design", description: "Crafting interfaces that are intuitive and delightful to use.", iconName: "Palette" },
          { title: "Responsive Across Devices", description: "Ensuring a flawless experience on desktops, tablets, and mobiles.", iconName: "Smartphone" },
          { title: "Performance Optimization", description: "Building fast-loading websites to reduce bounce rates.", iconName: "Gauge" },
          { title: "CMS Integration", description: "Easy content management with popular CMS platforms.", iconName: "Settings" },
        ],
        cta: { text: "Start Your Custom Design", link: "/#contact" }
      }
    },
    {
      slug: "seo-google-visibility",
      iconName: "Search",
      title: "SEO & Google Visibility",
      shortDescription: "Improve your search engine rankings and get found by more customers on Google with our expert SEO strategies.",
      link: "/services/seo-google-visibility",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=2",
        heroImageAlt: "Graph showing upward trend in SEO ranking",
        heroImageAiHint: "seo graph trend",
        longDescription: "Our SEO services are designed to elevate your website's visibility on search engines like Google. We employ proven strategies, from keyword research and on-page optimization to technical SEO and content marketing, to drive organic traffic and connect you with customers actively searching for your products or services.",
        keyBenefits: [
          "Higher rankings on Google search results.",
          "Increased organic website traffic.",
          "Better brand visibility and authority.",
          "Targeted reach to your ideal customers.",
          "Measurable results and ROI."
        ],
        features: [
          { title: "Keyword Research & Strategy", description: "Identifying high-value keywords to target.", iconName: "Target" },
          { title: "On-Page Optimization", description: "Optimizing content and HTML for search engines.", iconName: "FileText" },
          { title: "Technical SEO Audits", description: "Ensuring your site is technically sound for crawling.", iconName: "ShieldCheck" },
          { title: "Local SEO Focus", description: "Boosting visibility for local searches (Toronto & India).", iconName: "MapPin" },
        ],
        cta: { text: "Improve Your SEO", link: "/#contact" }
      }
    },
    {
      slug: "responsive-web-development",
      iconName: "Smartphone",
      title: "Responsive Web Development",
      shortDescription: "Websites that look and perform beautifully on all devices – desktops, tablets, and smartphones – for a seamless user experience.",
      link: "/services/responsive-web-development",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=3",
        heroImageAlt: "Website shown on multiple devices: desktop, tablet, mobile",
        heroImageAiHint: "responsive design devices",
        longDescription: "In today's multi-device world, a responsive website is crucial. We develop websites that automatically adapt to any screen size, providing an optimal viewing and interaction experience for every user, whether they're on a desktop, tablet, or smartphone. This enhances usability and is a key factor for SEO.",
        keyBenefits: [
          "Optimal user experience on any device.",
          "Improved mobile SEO rankings.",
          "Wider audience reach.",
          "Lower bounce rates and higher engagement.",
          "Future-proof design adaptable to new devices."
        ],
        features: [
          { title: "Fluid Grid Layouts", description: "Designs that adapt smoothly to screen sizes.", iconName: "Grid" },
          { title: "Flexible Images & Media", description: "Media that scales appropriately without distortion.", iconName: "Image" },
          { title: "Mobile-First Approach", description: "Prioritizing mobile experience in design and development.", iconName: "Smartphone" },
          { title: "Cross-Browser Compatibility", description: "Ensuring consistent performance across all major browsers.", iconName: "Globe" },
        ],
        cta: { text: "Get a Responsive Site", link: "/#contact" }
      }
    },
    {
      slug: "conversion-rate-optimization",
      iconName: "TrendingUp",
      title: "Conversion Rate Optimization (CRO)",
      shortDescription: "We analyze user behavior and optimize your website design and content to turn more visitors into paying customers.",
      link: "/services/conversion-rate-optimization",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=4",
        heroImageAlt: "Analytics dashboard showing conversion rate improvements",
        heroImageAiHint: "conversion analytics dashboard",
        longDescription: "Getting traffic to your website is only half the battle. Our Conversion Rate Optimization (CRO) services focus on turning those visitors into customers. We use data-driven insights, A/B testing, and UX best practices to identify and eliminate friction points in your conversion funnel, maximizing your website's effectiveness.",
        keyBenefits: [
          "Increased lead generation and sales.",
          "Improved return on investment (ROI) from traffic.",
          "Better understanding of your customers.",
          "Enhanced user experience.",
          "Data-backed decisions for website improvements."
        ],
        features: [
          { title: "User Behavior Analysis", description: "Understanding how users interact with your site.", iconName: "Users" },
          { title: "A/B & Multivariate Testing", description: "Testing variations to find what works best.", iconName: "ListChecks" },
          { title: "Landing Page Optimization", description: "Designing high-converting landing pages.", iconName: "FileImage" },
          { title: "Call-to-Action Enhancement", description: "Crafting compelling and effective CTAs.", iconName: "MousePointerClick" },
        ],
        cta: { text: "Boost Your Conversions", link: "/#contact" }
      }
    },
    {
      slug: "lead-generation-websites",
      iconName: "Users", // Changed from UsersIcon to Users as per lucide-react
      title: "Lead Generation Websites",
      shortDescription: "Strategically designed websites focused on capturing leads and growing your customer base effectively.",
      link: "/services/lead-generation-websites",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=5",
        heroImageAlt: "Diagram showing a sales funnel for lead generation",
        heroImageAiHint: "sales funnel diagram",
        longDescription: "Our lead generation websites are built with one primary goal: to capture qualified leads for your business. We strategically design every element, from compelling content and clear calls-to-action to optimized forms and landing pages, to maximize your ability to attract and convert potential customers.",
        keyBenefits: [
          "Steady stream of qualified leads.",
          "Increased sales opportunities.",
          "Improved marketing ROI.",
          "Grow your customer database.",
          "Measurable lead generation performance."
        ],
        features: [
          { title: "Strategic Landing Pages", description: "Highly focused pages designed for specific campaigns.", iconName: "Target" },
          { title: "Optimized Contact Forms", description: "Easy-to-use forms that encourage submissions.", iconName: "FileSignature" },
          { title: "Compelling Call-to-Actions", description: "CTAs that motivate users to take the next step.", iconName: "Zap" },
          { title: "Integration with CRM/Email Marketing", description: "Seamlessly funnel leads into your sales process.", iconName: "Link" },
        ],
        cta: { text: "Generate More Leads", link: "/#contact" }
      }
    },
    {
      slug: "ecommerce-solutions",
      iconName: "ShoppingCart", // Using ShoppingCart
      title: "E-commerce Solutions",
      shortDescription: "Build a powerful online store that drives sales, with secure payments, product management, and a great user experience.",
      link: "/services/ecommerce-solutions",
      pageDetails: {
        heroImage: "https://picsum.photos/1200/600?random=6",
        heroImageAlt: "Modern e-commerce website interface showcasing products",
        heroImageAiHint: "ecommerce website interface",
        longDescription: "Launch or elevate your online store with our comprehensive e-commerce solutions. We design and develop secure, scalable, and user-friendly online shops that make it easy for customers to browse, select, and purchase your products. From product catalogs and inventory management to secure payment gateways and shipping integration, we cover all aspects of your e-commerce needs.",
        keyBenefits: [
          "Increased online sales and revenue.",
          "Expanded market reach, globally or locally.",
          "Secure and reliable payment processing.",
          "Efficient product and inventory management.",
          "Enhanced customer shopping experience."
        ],
        features: [
          { title: "Custom Store Design", description: "Unique and branded online storefront.", iconName: "Store" },
          { title: "Secure Payment Gateway Integration", description: "Safe and seamless transactions.", iconName: "CreditCard" },
          { title: "Product Catalog & Inventory Management", description: "Easy management of your products.", iconName: "Package" },
          { title: "Mobile-Optimized Shopping", description: "Flawless shopping experience on all devices.", iconName: "Smartphone" },
        ],
        cta: { text: "Build Your Online Store", link: "/#contact" }
      }
    }
    // "Website Maintenance & Support" is excluded for now
  ],
  footerServiceLinks: [ // Updated to use new slugs
    { href: "/services/custom-website-design", label: "Custom Web Design" },
    { href: "/services/seo-google-visibility", label: "SEO & Google Ranking" },
    { href: "/services/responsive-web-development", label: "Responsive Development" },
    { href: "/services/lead-generation-websites", label: "Lead Generation Sites" },
    { href: "/services/ecommerce-solutions", label: "E-commerce Solutions" },
  ],
  mainHero: {
    titlePart1: "Get Your Business ",
    titleHighlight: "Found on Google",
    subtitle: "We build professional websites designed to attract customers, enhance your online presence, and drive business growth through effective SEO strategies.",
    ctaPrimaryText: "Get Your Free Quote",
    ctaPrimaryLink: "/#contact",
    ctaSecondaryText: "Explore Our Services",
    ctaSecondaryLink: "/services", // Points to the new services overview page
  },
  servicesSection: { // This section on the homepage will now source from `allServices`
    title: "Grow Your Business Online",
    subtitle: "We provide comprehensive web solutions to help you attract customers, enhance your Google presence, and achieve your business goals."
  },
  showcaseSection: {
    title: "Websites That Deliver Results",
    subtitle: "Explore our portfolio of custom websites designed to attract customers and grow businesses.",
    projects: [
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
      projectOptions: [ // These can also be dynamically generated from allServices titles
        { value: "custom-website-design", label: "Custom Website Design" },
        { value: "seo-google-visibility", label: "SEO & Google Visibility" },
        { value: "responsive-web-development", label: "Responsive Web Development" },
        { value: "conversion-rate-optimization", label: "Conversion Rate Optimization" },
        { value: "lead-generation-websites", label: "Lead Generation Websites" },
        { value: "ecommerce-solutions", label: "E-commerce Solutions" },
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
export type ServiceConfig = (typeof siteConfig.allServices)[number];
export type ServiceFeatureConfig = ServiceConfig["pageDetails"]["features"][number];

// Helper to get icon component by name string (used in service pages)
// This will be moved or duplicated if needed in other files.
// For now, it's here to colocate with allServices definition.
export const serviceIconMap = {
  LayoutTemplate: "LayoutTemplate",
  Search: "Search",
  Smartphone: "Smartphone",
  TrendingUp: "TrendingUp",
  Users: "Users",
  Settings: "Settings",
  Palette: "Palette",
  Gauge: "Gauge",
  Target: "Target",
  FileText: "FileText",
  ShieldCheck: "ShieldCheck",
  MapPin: "MapPin",
  Grid: "Grid",
  Image: "Image",
  Globe: "Globe",
  ListChecks: "ListChecks",
  FileImage: "FileImage",
  MousePointerClick: "MousePointerClick",
  FileSignature: "FileSignature",
  Zap: "Zap",
  Link: "Link",
  ShoppingCart: "ShoppingCart",
  Store: "Store",
  CreditCard: "CreditCard",
  Package: "Package",
  CheckCircle: "CheckCircle", // Added for features
  // Add any other icons used in pageDetails.features
} as const;

export type ServiceIconName = keyof typeof serviceIconMap;