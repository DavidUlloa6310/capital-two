import { db } from "@/server/db";
import type { Post, Account, PostVote, Comment, User } from "@prisma/client";

async function main() {
  const numberOfPostsPerUser = 5; // Number of posts per user
  const numberOfCommentsPerPost = 3; // Number of comments per post

  // const userData = {
  //   email: `user@example.com`,
  //   name: "test name",
  //   age: 25, // You can adjust this as needed
  //   income: 50000, // You can adjust this as needed
  //   credit_score: 650,
  //   posts: {
  //     create: Array.from({ length: numberOfPostsPerUser }).map((_, j) => ({
  //       content: `Post ${j + 1} by User`,
  //       title: "An interesting title",
  //       comments: {
  //         create: Array.from({ length: numberOfCommentsPerPost }).map(
  //           (_, k) => ({
  //             content: `Comment ${k + 1} on Post ${j + 1} by User`,
  //             authorId: 1,
  //           }),
  //         ),
  //       },
  //     })),
  //   },
  // };

  // Create users with associated posts and comments
  // await db.user.create({ data: userData })

  const data = {
    users: [
      {
        email: "john.doe@example.com",
        name: "John Doe",
        age: 30,
        income: 60000,
        credit_score: 700,
      },
      {
        email: "jane.doe@example.com",
        name: "Jane Doe",
        age: 25,
        income: 50000,
        credit_score: 650,
      },
      {
        email: "sam.smith@example.com",
        name: "Sam Smith",
        age: 22,
        income: 40000,
        credit_score: 630,
      },
      {
        email: "lisa.brown@example.com",
        name: "Lisa Brown",
        age: 28,
        income: 70000,
        credit_score: 720,
      },
    ],
    posts: [
      {
        content: "Just paid off my student loan! Feeling free!",
        title: "Debt-Free at Last",
        authorId: 0,
      },
      {
        content: "My credit score dropped out of nowhere. Any clues?",
        title: "Credit Score Mystery",
        authorId: 0,
      },
      {
        content:
          "Saved up an emergency fund in just one year. It was tough but so rewarding.",
        title: "Financial Security",
        authorId: 1,
      },
      {
        content:
          "Unexpected medical bill wiped out my savings. What do I do now?",
        title: "Financial Hit",
        authorId: 1,
      },
      {
        content: "Started investing in stocks. Let's see how it goes!",
        title: "Into the Stock Market",
        authorId: 2,
      },
      {
        content:
          "Why are rent prices so high? It's getting impossible to save.",
        title: "Rent Frustration",
        authorId: 2,
      },
      {
        content:
          "Got a huge tax refund this year! Where should I put the money?",
        title: "Tax Refund Choices",
        authorId: 3,
      },
      {
        content: "Credit card debt is killing me. Need help to get out of it.",
        title: "Drowning in Debt",
        authorId: 3,
      },
    ],
    comments: [
      {
        authorId: 0,
        postId: 0,
        content: "Congratulations!",
      },
      {
        authorId: 0,
        postId: 0,
        content: "How did you manage it?",
      },
      {
        authorId: 0,
        postId: 0,
        content: "Lucky you. Still drowning in mine.",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Check for errors in your report.",
      },
      {
        authorId: 0,
        postId: 1,
        content: "This happened to me once, it's scary!",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Did you cancel a credit card recently?",
      },
      {
        authorId: 0,
        postId: 0,
        content: "That's impressive!",
      },
      {
        authorId: 0,
        postId: 0,
        content: "How much did you save?",
      },
      {
        authorId: 0,
        postId: 0,
        content: "A year? I'm still working on mine.",
      },
      {
        authorId: 0,
        postId: 1,
        content: "That's really tough.",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Can you set up a payment plan?",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Health is more important than money.",
      },
      {
        authorId: 0,
        postId: 0,
        content: "That's a smart move!",
      },
      {
        authorId: 0,
        postId: 0,
        content: "Be careful, it's risky.",
      },
      {
        authorId: 0,
        postId: 0,
        content: "Which stocks are you considering?",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Tell me about it!",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Have you looked into getting roommates?",
      },
      {
        authorId: 1,
        postId: 1,
        content: "It's a landlord's market, unfortunately.",
      },
      {
        authorId: 1,
        postId: 0,
        content: "Maybe invest it?",
      },
      {
        authorId: 2,
        postId: 0,
        content: "You should treat yourself!",
      },
      {
        authorId: 2,
        postId: 0,
        content: "Save it for a rainyday.",
      },
      {
        authorId: 2,
        postId: 1,
        content: "Consider a balance transfer.",
      },
      {
        authorId: 2,
        postId: 1,
        content: "I feel your pain, I'm in the same boat.",
      },
      {
        authorId: 0,
        postId: 1,
        content: "Maybe cut up that credit card.",
      },
    ],
  };

  await db.user.createMany({ data: data.users });
  await db.post.createMany({ data: data.posts });
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
