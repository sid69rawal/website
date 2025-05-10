
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - YourBusinessOnline",
  description: "Thank you for your message. We'll be in touch soon!",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <Card className="w-full max-w-lg mx-auto shadow-xl text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Message Sent!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-muted-foreground mb-8">
                Thank you for reaching out to YourBusinessOnline. We have received your message and will get back to you as soon as possible, typically within 1-2 business days.
              </CardDescription>
              <Button asChild className="w-full max-w-xs mx-auto">
                <Link href="/">
                  Return to Homepage
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
