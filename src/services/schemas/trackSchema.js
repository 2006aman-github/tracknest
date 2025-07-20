import { z } from "zod";

export const TrackItemSchema = z.object({
  type: z.enum(["module", "course", "seminar"]),
  refId: z.string().min(1),
  title: z.string().min(1),
  duration: z.number().positive(),
  completed: z.boolean().optional().default(false),
  order: z.number().optional()
});

export const TrackSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  items: z.array(TrackItemSchema),
  createdAt: z.any().optional() // serverTimestamp is not zod-validated here
});
