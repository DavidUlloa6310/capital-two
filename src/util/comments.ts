import { type NewComment } from "@/schemas/commentSchemas";
import { db } from "@/server/db";
import { Session } from "next-auth";
import { getUserId } from "./getUserId";

export const createComment = async (
  comment: NewComment,
  session: Session | null,
) => {
  const userId = await getUserId(session);

  const result = await db.comment.create({
    data: {
      ...comment,
      authorId: userId,
    },
  });

  return result;
};
