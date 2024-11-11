import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          Welcome to Progress Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Track your progress, achieve your goals, and become the best version of
          yourself.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 