import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="bg-primary/10 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already tracking their progress and
          achieving their goals.
        </p>
        <Button asChild size="lg">
          <Link href="/auth/signup">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
} 