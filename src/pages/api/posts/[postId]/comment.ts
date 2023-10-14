import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@/util/comments";
import { newCommentSchema } from "@/schemas/commentSchemas";
import z from "zod";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const { content, postId } = newCommentSchema.parse(req.body);
      const comment = await createComment({ content, postId });
      return res.status(405).json(comment);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request", error });
    }

    return res.status(500).json({ message: "Internal server error", error });
  }
}
