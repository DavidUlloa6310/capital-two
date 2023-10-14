import { NextApiRequest, NextApiResponse } from "next";
import { votePost } from "@/util/posts";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const vote = await votePost(
      parseInt(req.query.postId as string),
      req.body.value,
    );
    return res.status(405).json(vote);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
