import { db } from "@/server/db";
import type { Comment } from "@prisma/client";
import { newCommentSchema, type NewComment } from "@/schemas/commentSchemas";

//No method to get comments since that's included in the getPost method

export const createComment = async (comment: NewComment) => {
  const authorId = 1; //TODO: get authorId from session

  const result = await db.comment.create({
    data: {
      ...comment,
      authorId,
    },
  });

  return result;
};
