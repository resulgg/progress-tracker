"use client";

import { customerPortalUrl } from "@/actions/checkout";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";

const PortalButton = ({ className }: { className?: string }) => {
  const [isPending, startTransition] = useTransition();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const onClick = () => {
    startTransition(async () => {
      const result = await customerPortalUrl();
      if (result.url) {
        setRedirectUrl(result.url);
      }
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={isPending || redirectUrl !== null}
      size={"lg"}
      className={className}
    >
      {isPending || redirectUrl !== null ? "Loading..." : "Manage Subscription"}
    </Button>
  );
};

export default PortalButton;
