import z from "zod";

export const newCommentSchema = z.object({
  postId: z.number().int(),
  content: z.string().min(1).max(1000),
});

export type NewComment = z.infer<typeof newCommentSchema>;
