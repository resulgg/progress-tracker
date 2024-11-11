"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { getSubscriptionStatus } from "@/services/subscription";
import { useProDialog } from "@/stores/subscription";

const CoolProButton = () => {
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useProDialog();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { isPro: hasProSubscription } = await getSubscriptionStatus();
        setIsPro(hasProSubscription);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Sparkles className="h-4 w-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (isPro) {
    return (
      <Badge variant="secondary" className="px-3 py-2 text-sm">
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        Pro Member
      </Badge>
    );
  }

  return (
    <Button
      onClick={onOpen}
      variant="outline"
      size="sm"
      className="group hover:border-primary/50 transition-colors"
    >
      <Sparkles className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
      Upgrade to Pro
    </Button>
  );
};

export default CoolProButton;
