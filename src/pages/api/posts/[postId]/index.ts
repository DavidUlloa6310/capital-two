import { NextApiRequest, NextApiResponse } from "next";
import { getPost, createPost } from "@/util/posts";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const post = await getPost(req.query.postId as string);
    return res.status(405).json(post);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
