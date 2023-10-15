import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPosts } from "@/util/posts";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).end();
      }

      const { authorEmail } = req.query;
      const author = await prisma.user.findUnique({
        where: { email: authorEmail as string },
      });

      if (!author) {
        return res.status(404).end();
      }

      const posts = await getPosts({
        limit: 100,
        cursor: parseInt(req.query.cursor as string) || 0,
        authorId: author.id,
      });

      return res.status(200).json({
        profile: author,
        posts,
      });
    default:
      return res.status(405).end();
  }
}
