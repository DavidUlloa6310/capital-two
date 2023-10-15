import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "@/util/posts";
import { createPostSchema } from "@/schemas/createPost";
import z from "zod";

export default async function createPostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "POST":
        const { content, authorId, title } = createPostSchema.parse(req.body);
        const post = await createPost({ title, content, authorId });
        return res.status(200).json(post);
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
