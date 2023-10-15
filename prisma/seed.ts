import { db } from "@/server/db";
import type { Post, Account, PostVote, Comment, User } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data.json");

async function main() {
  const data = JSON.parse(readFileSync(DATA_FILE, "utf-8"));

  // const data = {
  //   users: [
  //     {
  //       email: "john.doe@example.com",
  //       name: "John Doe",
  //       age: 30,
  //       income: 60000,
  //       credit_score: 700,
  //     },
  //     {
  //       email: "jane.doe@example.com",
  //       name: "Jane Doe",
  //       age: 25,
  //       income: 50000,
  //       credit_score: 650,
  //     },
  //     {
  //       email: "sam.smith@example.com",
  //       name: "Sam Smith",
  //       age: 22,
  //       income: 40000,
  //       credit_score: 630,
  //     },
  //     {
  //       email: "lisa.brown@example.com",
  //       name: "Lisa Brown",
  //       age: 28,
  //       income: 70000,
  //       credit_score: 720,
  //     },
  //   ],
  //   posts: [
  //     {
  //       content: "Just paid off my student loan! Feeling free!",
  //       title: "Debt-Free at Last",
  //       authorId: 1,
  //     },
  //     {
  //       content: "My credit score dropped out of nowhere. Any clues?",
  //       title: "Credit Score Mystery",
  //       authorId: 1,
  //     },
  //     {
  //       content:
  //         "Saved up an emergency fund in just one year. It was tough but so rewarding.",
  //       title: "Financial Security",
  //       authorId: 2,
  //     },
  //     {
  //       content:
  //         "Unexpected medical bill wiped out my savings. What do I do now?",
  //       title: "Financial Hit",
  //       authorId: 2,
  //     },
  //     {
  //       content: "Started investing in stocks. Let's see how it goes!",
  //       title: "Into the Stock Market",
  //       authorId: 3,
  //     },
  //     {
  //       content:
  //         "Why are rent prices so high? It's getting impossible to save.",
  //       title: "Rent Frustration",
  //       authorId: 3,
  //     },
  //     {
  //       content:
  //         "Got a huge tax refund this year! Where should I put the money?",
  //       title: "Tax Refund Choices",
  //       authorId: 4,
  //     },
  //     {
  //       content: "Credit card debt is killing me. Need help to get out of it.",
  //       title: "Drowning in Debt",
  //       authorId: 4,
  //     },
  //   ],
  //   comments: [
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "Congratulations!",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "How did you manage it?",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "Lucky you. Still drowning in mine.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Check for errors in your report.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "This happened to me once, it's scary!",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Did you cancel a credit card recently?",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "That's impressive!",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "How much did you save?",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "A year? I'm still working on mine.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "That's really tough.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Can you set up a payment plan?",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Health is more important than money.",
  //     },
  //     {
  //       authorId: 2,
  //       postId: 1,
  //       content: "That's a smart move!",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "Be careful, it's risky.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 1,
  //       content: "Which stocks are you considering?",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Tell me about it!",
  //     },
  //     {
  //       authorId: 2,
  //       postId: 2,
  //       content: "Have you looked into getting roommates?",
  //     },
  //     {
  //       authorId: 2,
  //       postId: 2,
  //       content: "It's a landlord's market, unfortunately.",
  //     },
  //     {
  //       authorId: 3,
  //       postId: 1,
  //       content: "Maybe invest it?",
  //     },
  //     {
  //       authorId: 2,
  //       postId: 1,
  //       content: "You should treat yourself!",
  //     },
  //     {
  //       authorId: 3,
  //       postId: 1,
  //       content: "Save it for a rainyday.",
  //     },
  //     {
  //       authorId: 3,
  //       postId: 2,
  //       content: "Consider a balance transfer.",
  //     },
  //     {
  //       authorId: 3,
  //       postId: 2,
  //       content: "I feel your pain, I'm in the same boat.",
  //     },
  //     {
  //       authorId: 1,
  //       postId: 2,
  //       content: "Maybe cut up that credit card.",
  //     },
  //   ],
  // };

  await db.user.createMany({ data: data.users });
  await db.post.createMany({ data: data.posts });
  await db.comment.createMany({ data: data.comments });
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
