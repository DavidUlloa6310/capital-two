import { type NewComment } from "@/schemas/commentSchemas";
import { db } from "@/server/db";
import { Session } from "next-auth";

export const createComment = async (
  comment: NewComment,
  session: Session | null,
) => {
  // Get the user session
  console.log("\n\nGetting session\n\n");

  // const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    throw new Error("User not authenticated");
  }

  console.log("session:", session);

  const authorEmail = session.user?.email;
  const user = await db.user.findUnique({
    where: {
      email: "jschuster8765@gmail.com",
    },
    select: {
      id: true,
    },
  });

  console.log("user:", user);

  if (!user) {
    throw new Error("User not found");
  }

  const result = await db.comment.create({
    data: {
      ...comment,
      authorId: user.id,
    },
  });

  return result;
};
