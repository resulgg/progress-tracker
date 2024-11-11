"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children:
    | React.ReactNode
    | ((props: { setOpen: (open: boolean) => void }) => React.ReactNode);
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const FormDialog = ({
  trigger,
  title,
  description,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  className,
}: FormDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  const childContent =
    typeof children === "function"
      ? children({ setOpen: onOpenChange })
      : children;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={className ?? "max-w-[900px]"}>
          <DialogHeader>
            <DialogTitle className="border-b-0 text-2xl">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {childContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-[80vh] w-full rounded-md">
          <div className="p-8">
            <DrawerHeader className="mb-4 mt-2 gap-0 space-y-0 p-0">
              <DrawerTitle className="mb-0 border-b-0 text-4xl font-bold">
                {title}
              </DrawerTitle>
              {description && (
                <DrawerDescription className="mt-0 p-0">
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
            {childContent}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDialog;
