"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import FormDialog from "@/components/ui/form-dialog";
import { Track } from "@/db/schema";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteTrack from "./delete-track";

type Metadata = {
  measurement: string;
  value: string;
}[];

interface ReviewTrackProps {
  track: Track & { metadata: Metadata };
}

const ReviewTrack = ({ track }: ReviewTrackProps) => {
  return (
    <FormDialog
      trigger={
        <Button
          variant="secondary"
          size="icon"
          aria-label="Review track details"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </Button>
      }
      title="Review Track"
      description="Review your progress track details and analysis."
    >
      {() => (
        <div className="space-y-6">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${track.image}`}
                  alt={`Progress photo taken on ${format(new Date(track.createdAt), "PPP")}${track.note ? ` - ${track.note}` : ""}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </CardContent>
          </Card>

          {track.note && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {track.note}
                </p>
              </CardContent>
            </Card>
          )}

          {track.metadata.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Measurements</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {format(
                    new Date(track.createdAt),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {track.metadata.map((item) => (
                    <div
                      key={item.measurement}
                      className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-4"
                    >
                      <div className="font-medium capitalize">
                        {item.measurement}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <span>Danger zone - This action cannot be undone</span>
            <DeleteTrack trackId={track.id} projectId={track.projectId} />
          </div>
        </div>
      )}
    </FormDialog>
  );
};

export default ReviewTrack;
