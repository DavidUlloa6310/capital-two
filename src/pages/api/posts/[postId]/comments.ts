import { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@/util/comments";

export default async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const comment = createComment(req.body);
    return res.status(405).json(comment);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
