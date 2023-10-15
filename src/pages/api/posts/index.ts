import { NextApiRequest, NextApiResponse } from "next";
import { getPosts, createPost } from "@/util/posts";
import { getServerAuthSession } from "@/server/auth";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { author } = req.body;

  if (req.method === "GET") {
    const posts = await getPosts({
      limit: 10,
      cursor: parseInt(req.query.cursor as string) || 0,
      author,
    });
    return res.status(200).json(posts);
  } else if (req.method === "POST") {
    const post = await createPost(req.body);
    return res.status(201).json(post);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
