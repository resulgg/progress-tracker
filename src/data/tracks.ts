import db from "@/db";
import { tracks } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import "server-only";

/**
 * Retrieves all tracks for a specific project and user
 * @param projectId - The ID of the project to fetch tracks for
 * @param userId - The ID of the user who owns the tracks
 * @returns Promise containing array of tracks
 */
export const getTracksByProjectId = async (
  projectId: string,
  userId: string
) => {
  if (!projectId || !userId) {
    throw new Error("Project ID and User ID are required");
  }

  try {
    const userTracks = await db.query.tracks.findMany({
      where: and(eq(tracks.projectId, projectId), eq(tracks.userId, userId)),
      orderBy: (tracks, { desc }) => [desc(tracks.createdAt)],
    });

    return userTracks;
  } catch (error) {
    console.error("Failed to fetch tracks:", error);
    throw new Error("Failed to fetch tracks");
  }
};
