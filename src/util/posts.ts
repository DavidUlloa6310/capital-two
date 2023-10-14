import { PrismaClient, Post } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.count();
};
