// courseSchema.js
import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).nonempty(),
  instructor: z.string().min(1),
  launchDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid launchDate"
  }),
  startDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid startDate"
  }),
  endDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid endDate"
  }),
  durationDays: z.number().optional(),
  mode: z.enum(["online", "offline"]),
  registrationLink: z.string().url(),
  createdAt: z.any().optional(), // Can be Date or Timestamp
  approved: z.boolean().optional()
});
