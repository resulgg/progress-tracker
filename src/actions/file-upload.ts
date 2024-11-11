"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import { auth } from "@/auth";
import { z } from "zod";

// File validation schema
const fileSchema = z.object({
  type: z.string(),
  size: z.number(),
});

type FileType = z.infer<typeof fileSchema>;

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
 * Generates a presigned URL for file upload to R2 storage
 * @param data File metadata including type and size
 * @returns Presigned URL and file key or error message
 */
export const getPresignedUrl = async (data: FileType) => {
  // Authenticate user
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized Access" };
  }

  // Validate file data
  const fileValidation = fileSchema.safeParse(data);
  if (!fileValidation.success) {
    return { error: fileValidation.error.flatten().fieldErrors };
  }

  const { type, size } = fileValidation.data;
  const fileExtension = type.split("/")[1];
  const key = `${crypto.randomUUID()}.${fileExtension}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: type,
      ContentLength: size,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    if (!signedUrl) throw new Error("Failed to generate presigned URL");

    return { signedUrl, key };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return { error: "Failed to get presigned url" };
  }
};
