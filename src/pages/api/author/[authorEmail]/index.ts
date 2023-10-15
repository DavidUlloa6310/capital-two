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
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).end();
  }
  const { authorEmail } = req.query;
  const author = await prisma.user.findUnique({
    where: { email: authorEmail as string },
  });

  switch (req.method) {
    case "GET":
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
    case "POST":
      if (!author) {
        return res.status(404).end();
      }
      let income: number, age: number, location: string;

      if (typeof req.body === "string") {
        ({ income, age, location } = JSON.parse(req.body));
      } else {
        ({ income, age, location } = req.body);
      }

      const updateAuthor = await prisma.user.update({
        where: {
          email: authorEmail as string,
        },
        data: { income, age, location },
        select: {
          income: true,
          age: true,
          location: true,
        },
      });

      return updateAuthor;
    default:
      return res.status(405).end();
  }
}
