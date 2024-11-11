"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { tracks } from "@/db/schema";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Track schema based on DB schema
const trackSchema = z.object({
  note: z.string().min(1, "Note is required"),
  image: z.string().optional(),
  metadata: z.any().optional(),
  projectId: z.string().uuid(),
});

type TrackInput = z.infer<typeof trackSchema>;

/**
 * Creates a new track in the database
 * @param data Track data matching trackSchema
 * @returns Created track or error message
 */
export const createTrack = async (data: TrackInput) => {
  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized Access" };
  }

  // Validate track data
  const validation = trackSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  try {
    const { note, image, metadata, projectId } = validation.data;
    const track = await db
      .insert(tracks)
      .values({
        note,
        image,
        metadata,
        projectId,
        userId: session.user.id,
      })
      .returning();

    revalidatePath(`/dashboard/${projectId}`);
    return track;
  } catch (error) {
    console.error("Error creating track:", error);
    return { error: "Failed to create track" };
  }
};
// Initialize S3 client with R2 configuration
const s3Client = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
/**
 * Deletes a track and its associated image from the database and R2 storage
 * @param trackId The UUID of the track to delete
 * @param projectId The UUID of the project containing the track
 * @returns Success message or error
 */
export const deleteTrack = async (trackId: string, projectId: string) => {
  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized Access" };
  }

  try {
    // Verify track belongs to user before deletion
    const track = await db.query.tracks.findFirst({
      where: and(eq(tracks.id, trackId), eq(tracks.userId, session.user.id)),
    });

    if (!track) {
      return { error: "Track not found or unauthorized" };
    }

    // Delete track image from R2 if it exists
    if (track.image) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: track.image,
        })
      );
    }

    // Delete the track from database
    await db.delete(tracks).where(eq(tracks.id, trackId));

    revalidatePath(`/dashboard/${projectId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting track:", error);
    return { error: "Failed to delete track" };
  }
};
