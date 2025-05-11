import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig, ServiceConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronLeft, Home } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Dynamically import Lucide icons
const IconComponents = LucideIcons as unknown as { [key: string]: React.FC<LucideIcons.LucideProps> };

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return siteConfig.allServices
    .filter(service => service.slug !== "website-maintenance-support")
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = siteConfig.allServices.find(s => s.slug === params.slug);

  if (!service) {
    return {
      title: `Service Not Found - ${siteConfig.name}`,
      description: 'The service you are looking for could not be found.',
    };
  }

  return {
    title: `${service.title} - Services | ${siteConfig.name}`,
    description: service.pageDetails.longDescription.substring(0, 160) + "..." || service.shortDescription,
    openGraph: {
      title: `${service.title} - ${siteConfig.name}`,
      description: service.pageDetails.longDescription.substring(0, 160) + "..." || service.shortDescription,
      images: [{ url: service.pageDetails.heroImage || siteConfig.ogImage, alt: service.pageDetails.heroImageAlt || service.title }],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = siteConfig.allServices.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const { title, pageDetails } = service;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    {/* Direct link to the main services page */}
                    <Link href="/services">Services</Link> 
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

          {/* Hero Section */}
          <section className="mb-16 md:mb-20 relative rounded-lg overflow-hidden shadow-xl">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={pageDetails.heroImage}
                alt={pageDetails.heroImageAlt}
                data-ai-hint={pageDetails.heroImageAiHint}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl drop-shadow-sm">
                {service.shortDescription}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-foreground">About {title}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground text-lg">
                  <p>{pageDetails.longDescription}</p>
                </CardContent>
              </Card>

              {pageDetails.features && pageDetails.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-6">
                      {pageDetails.features.map((feature, index) => {
                        const FeatureIcon = feature.iconName ? IconComponents[feature.iconName as keyof typeof IconComponents] || CheckCircle : CheckCircle;
                        return (
                          <li key={index} className="flex items-start">
                            <FeatureIcon className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                            <div>
                              <h4 className="font-semibold text-lg text-foreground">{feature.title}</h4>
                              <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar / Key Benefits */}
            <aside className="lg:col-span-1 space-y-8">
              {pageDetails.keyBenefits && pageDetails.keyBenefits.length > 0 && (
                <Card className="bg-primary/5 border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Key Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pageDetails.keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Ready to Get Started?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6 text-muted-foreground">
                    Let's discuss how our {title.toLowerCase()} services can help your business achieve its online goals.
                  </CardDescription>
                  <Button asChild size="lg" className="w-full btn-effect">
                    <Link href={pageDetails.cta.link}>{pageDetails.cta.text}</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
