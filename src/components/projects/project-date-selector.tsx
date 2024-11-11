"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProjectDateSelectorProps {
  defaultValue: Date;
  onChange: (date: Date) => void;
}

const ProjectDateSelector = ({
  defaultValue,
  onChange,
}: ProjectDateSelectorProps) => {
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal gap-2",
            !defaultValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {defaultValue ? (
            format(defaultValue, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={defaultValue}
          onSelect={handleSelect}
          disabled={(date) => date < new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default ProjectDateSelector;
