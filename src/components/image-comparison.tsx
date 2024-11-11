"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

const ImageComparison = ({
  beforeImage,
  afterImage,
  className,
}: ImageComparisonProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt="Before image"
            className="object-cover w-full h-full"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt="After image"
            className="object-cover w-full h-full"
          />
        }
        handle={
          true && (
            <div className="flex items-center justify-center w-10 h-10 bg-background/50 rounded-full shadow-lg cursor-grab active:cursor-grabbing">
              <MoveHorizontal className="w-6 h-6 text-foreground" />
            </div>
          )
        }
        className="aspect-square md:aspect-video"
      />
    </Card>
  );
};

export default ImageComparison;
