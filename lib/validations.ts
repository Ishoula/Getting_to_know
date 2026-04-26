import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  techStack: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  image: z.string().optional(),
  featured: z.boolean().optional().default(false),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please provide a valid email"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
