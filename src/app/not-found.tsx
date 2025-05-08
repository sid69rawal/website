import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-3 pb-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-muted-foreground">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            If you believe this is an error, please contact support.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/">Go back to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
