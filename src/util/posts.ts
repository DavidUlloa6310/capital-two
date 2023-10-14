import type { Post } from "@prisma/client";
import { db } from "@/server/db";

export const getPosts = async () => {
  const posts = await db.post.findMany({
    include: {
      comments: true,
      author: true,
    },
  });
  return posts;
};

export const getPost = async (id: string) => {
  const post = await db.post.findUnique({
    where: { id },
    include: {
      comments: true,
      author: true,
    },
  });
  return post;
};

//TODO: update to use next-auth
export const createPost = async (data: Post) => {
  const post = await db.post.create({
    data,
  });
  return post;
};

export const votePost = async (postId: string, value: 1 | -1) => {
  const userId = "1"; //TODO: update to use next-auth

  let vote = await db.postUpvote.findFirst({
    where: { postId, authorId: userId },
  });

  if (vote) {
    return await db.postUpvote.update({
      where: { id: vote.id },
      data: {
        value: value * -1,
      },
    });
  } else {
    return await db.postUpvote.create({
      data: {
        postId,
        authorId: userId,
        value,
      },
    });
  }
};
