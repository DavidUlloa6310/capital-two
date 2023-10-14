import z from "zod";

export const newVoteSchema = z.object({
  postId: z.number().int(),
  //make sure the value is either 1 or -1
  direction: z.number().int().min(-1).max(1),
});

export type NewVote = z.infer<typeof newVoteSchema>;
