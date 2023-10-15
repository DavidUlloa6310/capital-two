import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@/util/comments";
import { newCommentSchema } from "@/schemas/commentSchemas";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function createCommentsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "POST":
        const { content, postId } = newCommentSchema.parse(req.body);
        const session = await getServerSession(req, res, authOptions);
        const comment = await createComment({ content, postId }, session);
        console.log("session is done");
        return res.status(200).json(comment);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request", error });
    }

    return res.status(500).json({ message: "Internal server error", error });
  }
}
