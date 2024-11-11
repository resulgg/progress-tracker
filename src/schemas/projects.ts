import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 300 characters" }),
  coverImage: z
    .string()
    .min(1, { message: "Cover image is required" })
    .max(1000, { message: "Cover image must be less than 1000 characters" }),
  frequency: z.number().min(1, { message: "Frequency is required" }),
  endDate: z.date(),
  categoryId: z.string().min(1, { message: "Category is required" }),
});
