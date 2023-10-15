import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const { authorId } = req.query;

      const userInfo = await prisma.user.findUnique({
        where: {
          id: +authorId!,
        },
        include: {
          posts: true,
        },
      });

      return res.status(200).json(userInfo);
    default:
      return res.status(405).end();
  }
}
