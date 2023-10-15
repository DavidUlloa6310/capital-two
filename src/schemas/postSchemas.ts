import z from "zod";

export const createPostSchema = z.object({
  content: z.string(),
  title: z.string(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
