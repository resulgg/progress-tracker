import "server-only";

import db from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Retrieves all projects for a specific user with their associated categories
 * @param userId - The ID of the user to fetch projects for
 * @returns Promise containing array of projects with categories
 */
export const getProjects = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const userProjects = await db.query.projects.findMany({
      where: eq(projects.userId, userId),
      with: {
        category: true,
      },
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    return userProjects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects");
  }
};
