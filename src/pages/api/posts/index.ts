import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../lib/posts";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const posts = await getPosts();
  res.status(200).json(posts);
}
