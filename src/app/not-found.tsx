
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-3 pb-2">
          <>
            <AlertCircle className="h-8 w-8 text-destructive" />
            <CardTitle className="text-2xl">{siteConfig.notFoundPage.title}</CardTitle>
          </>
        </CardHeader>
        <CardContent className="pt-4">
          <>
            <p className="text-muted-foreground">
              {siteConfig.notFoundPage.description}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.notFoundPage.contactSupportText}
            </p>
            <Button asChild className="mt-6 w-full btn-effect">
              <Link href={siteConfig.notFoundPage.buttonLink}>{siteConfig.notFoundPage.buttonText}</Link>
            </Button>
          </>
        </CardContent>
      </Card>
    </div>
  );
}

