
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Removed CardTitle import
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import React from "react";

export const metadata: Metadata = {
  title: `Terms of Service - ${siteConfig.name}`,
  description: `Review GetUrBizOnline's Terms of Service. Understand the terms and conditions for using our web design and SEO services in Toronto & India.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Card className="shadow-lg">
            <CardHeader>
              {/* Changed CardTitle to a direct h1 tag */}
              <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground">Terms of Service</h1>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              
                <p className="text-muted-foreground text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                  By using our website ({siteConfig.url}) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h2>2. Services Provided</h2>
                <p>
                  {siteConfig.name} provides web design, web development, SEO services, and related digital marketing services. Specifics of services provided will be outlined in individual client agreements or statements of work.
                </p>

                <h2>3. User Responsibilities</h2>
                <p>
                  You agree to provide accurate information when requested and to use our services in compliance with all applicable laws. You are responsible for any content you provide or upload.
                </p>

                <h2>4. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of {siteConfig.name} or its content suppliers and protected by international copyright laws. For client projects, intellectual property rights for the final deliverables will be transferred to the client upon full payment, as specified in the client agreement. We retain the right to showcase work in our portfolio unless otherwise agreed.
                </p>

                <h2>5. Payment Terms</h2>
                <p>
                  Payment terms for services will be detailed in the project proposal or client agreement. Typically, this involves an upfront deposit and milestone payments or full payment upon completion. Late payments may incur interest charges.
                </p>

                <h2>6. Limitation of Liability</h2>
                <p>
                  {siteConfig.name} will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangibles, arising from your use of our services or website. Our total liability for any claim arising out of or relating to these terms or our services will not exceed the amount paid by you for the services in question.
                </p>

                <h2>7. Disclaimer of Warranties</h2>
                <p>
                  Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied. We do not guarantee that our services will be error-free, uninterrupted, or secure. While we strive for high search engine rankings, we do not guarantee specific SEO results as search engine algorithms are subject to change.
                </p>

                <h2>8. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to our services at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                </p>

                <h2>9. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of {siteConfig.contact.jurisdiction}, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in {siteConfig.contact.jurisdiction}.
                </p>

                <h2>10. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date. We encourage you to review these terms periodically.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at {siteConfig.contact.email} or by post to:
                </p>
                <address className="not-italic"> {/* Use address tag for contact info */}
                  {siteConfig.name}<br />
                  {siteConfig.contact.address}
                </address>
              
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

