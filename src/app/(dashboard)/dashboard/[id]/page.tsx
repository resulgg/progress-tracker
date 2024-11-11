import { getTracksByProjectId } from "@/data/tracks";
import { Track } from "@/db/schema";
import currentUser from "@/lib/current-user";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import CreateTrack from "@/components/tracks/create-track";
import CompareTracks from "@/components/tracks/compare-tracks";
import ReviewTrack from "@/components/tracks/review-track";
import DeleteProject from "@/components/projects/delete-project";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}
type Metadata = {
  measurement: string;
  value: string;
}[];

type TrackCardProps = Track & { metadata: Metadata };

const TrackCard = ({ track }: { track: TrackCardProps }) => (
  <div className="relative h-[550px] w-full overflow-hidden rounded-md md:h-[600px]">
    <div className="absolute right-3 top-3 z-30 rounded-lg">
      <ReviewTrack track={track} />
    </div>
    <Image
      src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${track.image}`}
      alt={track.note || "Track image"}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);

const TrackPage = async ({ params }: TrackPageProps) => {
  const projectId = (await params).id;
  const user = await currentUser();
  if (!user?.id) {
    redirect("/auth/login");
  }

  const tracks = (await getTracksByProjectId(
    projectId,
    user.id
  )) as TrackCardProps[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-3xl font-bold">Your Progress Journey</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage your progress photos and measurements over time.
          </p>
        </div>
        <div className="flex gap-4">
          <CompareTracks tracks={tracks} />
          <CreateTrack projectId={projectId} />
          <DeleteProject projectId={projectId} />
        </div>
      </div>
      {tracks.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            No tracks found for this project.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackPage;
