import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().positive("Must be positive"),
  contentUrl: z.string().url().optional(),
  createdAt: z.any().optional(), // Firestore Timestamp
  resources: z.array(z.string().url()).optional(),
  isPublished: z.boolean().optional()
});
