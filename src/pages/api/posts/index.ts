import { NextApiRequest, NextApiResponse } from "next";
import { getPosts, createPost } from "@/util/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createPostSchema } from "@/schemas/postSchemas";
import z from "zod";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { author } = req.body;

  if (req.method === "GET") {
    const posts = await getPosts({
      limit: 10,
      cursor: parseInt(req.query.cursor as string) || 0,
      authorId: author,
    });
    return res.status(200).json(posts);
  } else if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const data = createPostSchema.parse(req.body);
      const post = await createPost(data, session);
      return res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request", error });
      }

      return res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
