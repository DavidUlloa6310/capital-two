import z from "zod";

export const createPost = z.object({
  authorId: z.string(),
  content: z.string(),
  title: z.string(),
});
