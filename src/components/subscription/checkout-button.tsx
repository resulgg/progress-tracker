"use client";

import { checkoutUrl } from "@/actions/checkout";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  productId: string;
  className?: string;
}

const CheckoutButton = ({ productId, className }: CheckoutButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const onClick = () => {
    startTransition(async () => {
      const result = await checkoutUrl(productId);
      if (result.url) {
        setRedirectUrl(result.url);
      }
    });
  };
  return (
    <Button
      onClick={onClick}
      disabled={isPending || redirectUrl !== null}
      className={className}
    >
      {isPending || redirectUrl !== null ? "Loading..." : "Subscribe"}
    </Button>
  );
};

export default CheckoutButton;
