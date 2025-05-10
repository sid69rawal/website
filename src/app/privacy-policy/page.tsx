
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - YourBusinessOnline",
  description: "Read the Privacy Policy of YourBusinessOnline.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-center">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <h2>1. Introduction</h2>
              <p>
                Welcome to YourBusinessOnline (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at info@yourbusinessonline.dev.
              </p>
              <p>
                This privacy notice describes how we might use your information if you visit our website at [Your Website URL] or otherwise use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, and any other information you choose to provide.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6">
                <li>To send you marketing and promotional communications.</li>
                <li>To respond to your inquiries and solve any potential issues you might have with the use of our Services.</li>
                <li>To protect our Services.</li>
                <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services, products, marketing and your experience.</li>
              </ul>

              <h2>4. Will Your Information Be Shared With Anyone?</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>

              <h2>5. How Long Do We Keep Your Information?</h2>
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
              </p>

              <h2>6. How Do We Keep Your Information Safe?</h2>
              <p>
                We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>

              <h2>7. Your Privacy Rights</h2>
              <p>
                In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
              </p>

              <h2>8. Updates to This Notice</h2>
              <p>
                We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date and the updated version will be effective as soon as it is accessible.
              </p>

              <h2>9. How Can You Contact Us About This Notice?</h2>
              <p>
                If you have questions or comments about this notice, you may email us at info@yourbusinessonline.dev or by post to:
              </p>
              <p>
                YourBusinessOnline<br />
                123 Web Success Ave<br />
                SEO City, Digitaland
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
