import { db } from "@/server/db";
import type { Post, Account, PostVote, Comment, User } from "@prisma/client";

async function main() {
  const numberOfPostsPerUser = 5; // Number of posts per user
  const numberOfCommentsPerPost = 3; // Number of comments per post

  const userData = {
    email: `user@example.com`,
    first_name: `User`,
    last_name: `Lastname`,
    age: 25, // You can adjust this as needed
    posts: {
      create: Array.from({ length: numberOfPostsPerUser }).map((_, j) => ({
        content: `Post ${j + 1} by User`,
        comments: {
          create: Array.from({ length: numberOfCommentsPerPost }).map(
            (_, k) => ({
              content: `Comment ${k + 1} on Post ${j + 1} by User`,
              authorId: 1,
            }),
          ),
        },
      })),
    },
  };
  // Create users with associated posts and comments
  await db.user.create({ data: userData });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });