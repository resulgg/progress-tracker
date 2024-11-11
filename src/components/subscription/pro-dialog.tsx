"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Star,
  Zap,
  BarChart2,
  MessageCircle,
  FileText,
} from "lucide-react";
import CheckoutButton from "./checkout-button";
import { useProDialog } from "@/stores/subscription";

export default function ProDialog() {
  const { isOpen, onClose } = useProDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Upgrade to Pro
          </DialogTitle>
        </DialogHeader>
        <div className="relative p-8 pt-4">
          <p className="mb-6 text-muted-foreground">
            Unlock premium features and take your progress tracking to the next
            level
          </p>

          <ul className="space-y-4 mb-8">
            {[
              {
                text: "Unlimited projects",
                icon: <Zap className="h-4 w-4 text-blue-400" />,
              },
              {
                text: "Advanced analytics",
                icon: <BarChart2 className="h-4 w-4 text-green-400" />,
              },
              {
                text: "Priority support",
                icon: <MessageCircle className="h-4 w-4 text-purple-400" />,
              },
              {
                text: "Custom measurements",
                icon: <Sparkles className="h-4 w-4 text-amber-400" />,
              },
              {
                text: "Export data",
                icon: <FileText className="h-4 w-4 text-rose-400" />,
              },
            ].map(({ text, icon }) => (
              <li
                key={text}
                className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-200"
              >
                {icon}
                <span className="text-foreground">{text}</span>
              </li>
            ))}
          </ul>

          <CheckoutButton
            productId={process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ID!}
            className="w-full h-12 text-xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
