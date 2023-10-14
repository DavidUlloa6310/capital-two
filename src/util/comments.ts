import { db } from "@/server/db";
import type { Comment } from "@prisma/client";

//No method to get comments since that's included in the getPost method

export const createComment = async (data: Comment) => {
  const comment = await db.comment.create({
    data,
  });
  return comment;
};
