"use client"; // Required for onClick event handler

import { Button } from "@/components/ui/button";

export default function SimpliPage() {
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="space-y-8 max-w-md w-full">
        <header>
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Welcome to SimpliPage
          </h1>
        </header>
        <section>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            This is a demonstration of a simple, single-page application.
            It features minimal content and a basic interactive element.
          </p>
        </section>
        <footer className="mt-8">
          <Button 
            onClick={handleButtonClick} 
            size="lg"
            className="px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            aria-label="Click this button to see an alert"
          >
            Click Me
          </Button>
        </footer>
      </div>
    </main>
  );
}
