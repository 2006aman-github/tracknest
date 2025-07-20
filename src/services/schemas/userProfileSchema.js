import { z } from "zod";

export const userSchema = z.object({
  enrolledCourses: z.array(z.string()).default([]),        // course IDs
  ongoingTracks: z.array(z.string()).default([]),          // track IDs
  completedModules: z.array(z.string()).default([]),       // module IDs
  favouriteCourses: z.array(z.string()).default([]),       // course IDs
  skills: z.array(z.string()).default([]),                 // e.g. ["React", "Node.js"]
  createdAt: z.any().optional(),                           // Firestore timestamp
});
