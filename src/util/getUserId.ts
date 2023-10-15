import { Session } from "next-auth";
import { db } from "@/server/db";

export const getUserId = async (session: Session | null) => {
  if (!session || !session.user?.email) {
    throw new Error("User not authenticated");
  }

  const authorEmail = session.user?.email;
  const user = await db.user.findUnique({
    where: {
      email: authorEmail,
    },
    select: {
      id: true,
    },
  });

  console.log("user:", user);

  if (!user) {
    throw new Error("User not found");
  }

  return user.id;
};
