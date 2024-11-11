"use server";

import { auth } from "@/auth";
import { z } from "zod";

import { projects } from "@/db/schema";
import db from "@/db";
import { projectSchema } from "@/schemas/projects";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { S3Client } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * Creates a new project in the database
 * @param data Project data matching projectSchema
 * @returns Created project or error message
 */
export const createProject = async (data: z.infer<typeof projectSchema>) => {
  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized Access" };
  }

  // Validate project data
  const validation = projectSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  try {
    const { title, coverImage, frequency, endDate, categoryId } =
      validation.data;
    const project = await db
      .insert(projects)
      .values({
        title,
        coverImage,
        frequency,
        endDate,
        userId: session.user.id,
        categoryId,
      })
      .returning();

    revalidatePath("/dashboard");
    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: "Failed to create project" };
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
 * Deletes a project and its associated images from the database and R2 storage
 * @param projectId UUID of the project to delete
 * @returns Success message or error
 */
export const deleteProject = async (projectId: string) => {
  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized Access" };
  }

  try {
    // Verify project belongs to user and get image keys
    const project = await db.query.projects.findFirst({
      where: and(
        eq(projects.id, projectId),
        eq(projects.userId, session.user.id)
      ),
      with: {
        tracks: true,
      },
    });

    if (!project) {
      return { error: "Project not found or unauthorized" };
    }

    // Delete cover image and track images from R2
    if (project.coverImage) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: project.coverImage,
        })
      );
    }

    // Delete all track images
    for (const track of project.tracks) {
      if (track.image) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: track.image,
          })
        );
      }
    }

    // Delete project from database
    await db.delete(projects).where(eq(projects.id, projectId));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
};
