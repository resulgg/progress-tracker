"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitCompare, Check, ImageIcon } from "lucide-react";
import FormDialog from "@/components/ui/form-dialog";
import ImageComparison from "@/components/image-comparison";
import { type Track } from "@/db/schema";
import Image from "next/image";

interface CompareTracksProps {
  tracks: Track[];
}

const CompareTracks = ({ tracks }: CompareTracksProps) => {
  const [beforeTrack, setBeforeTrack] = useState<Track | null>(null);
  const [afterTrack, setAfterTrack] = useState<Track | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleImageSelect = (track: Track) => {
    // If no track is selected, set as beforeTrack
    if (!beforeTrack) {
      setBeforeTrack(track);
    }
    // If beforeTrack exists but no afterTrack, and clicked track is different
    else if (!afterTrack && track.id !== beforeTrack.id) {
      setAfterTrack(track);
    }
    // If both tracks are selected and clicked on a new track, update afterTrack
    else if (
      beforeTrack &&
      afterTrack &&
      track.id !== beforeTrack.id &&
      track.id !== afterTrack.id
    ) {
      setAfterTrack(track);
    }
  };

  const resetSelection = () => {
    setBeforeTrack(null);
    setAfterTrack(null);
    setShowComparison(false);
  };

  const handleDoubleClick = (track: Track) => {
    if (track.id === beforeTrack?.id) {
      setBeforeTrack(null);
      // If there's an afterTrack, make it the beforeTrack
      if (afterTrack) {
        setBeforeTrack(afterTrack);
        setAfterTrack(null);
      }
    } else if (track.id === afterTrack?.id) {
      setAfterTrack(null);
    }
  };

  const canCompare = beforeTrack && afterTrack;

  return (
    <FormDialog
      trigger={
        <Button variant="outline" className="flex items-center gap-2">
          <GitCompare className="h-4 w-4" />
          <span className="hidden md:block">Compare Photos</span>
        </Button>
      }
      title="Compare Progress Photos"
      description={
        !beforeTrack
          ? "Select first photo"
          : !afterTrack
            ? "Select second photo"
            : "Your photo comparison"
      }
    >
      <div className="space-y-6">
        {tracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon className="mb-4 h-12 w-12" />
            <h3 className="text-lg font-medium">No photos available</h3>
            <p className="mt-2 text-center text-sm">
              Add some progress photos to start comparing your journey
            </p>
          </div>
        ) : showComparison && canCompare ? (
          <div className="space-y-4">
            <ImageComparison
              beforeImage={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${beforeTrack.image}`}
              afterImage={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${afterTrack.image}`}
              className="mt-4"
            />
            <Button onClick={resetSelection} className="h-14 w-full text-xl">
              Compare Different Photos
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleImageSelect(track)}
                  onDoubleClick={() => handleDoubleClick(track)}
                  className={`relative aspect-square w-full overflow-hidden rounded-md border-2 ${
                    track.id === beforeTrack?.id
                      ? "border-blue-500"
                      : track.id === afterTrack?.id
                        ? "border-green-500"
                        : "border-transparent"
                  } transition-colors hover:border-primary/50`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${track.image}`}
                    alt={track.note || "Track image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {(track.id === beforeTrack?.id ||
                    track.id === afterTrack?.id) && (
                    <div
                      className={`absolute right-2 top-2 ${
                        track.id === beforeTrack?.id
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } rounded-full p-1`}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-base text-white">
                    {new Date(track.createdAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex flex-col-reverse gap-4">
              {canCompare && (
                <Button
                  onClick={() => setShowComparison(true)}
                  className="h-14 w-full text-xl"
                >
                  Compare Selected Photos
                </Button>
              )}
              {(beforeTrack || afterTrack) && (
                <Button
                  onClick={resetSelection}
                  variant="outline"
                  className="h-14 w-full text-xl"
                >
                  Reset Selection
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </FormDialog>
  );
};

export default CompareTracks;
