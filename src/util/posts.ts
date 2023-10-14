import type { Post } from "@prisma/client";
import { db } from "@/server/db";

//TODO: probably don't want an array of IDs, instead cursor based pagination
export const getPosts = async (limit = 10) => {
  const posts = await db.post.findMany({
    include: {
      comments: true,
      author: true,
      post_votes: {
        select: {
          postId: true,
          value: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  const postsWithVotes = posts.map((post) => {
    const upvotes = post.post_votes.reduce(
      (sum, vote) => (vote.value === 1 ? sum + 1 : sum),
      0,
    );
    const downvotes = post.post_votes.reduce(
      (sum, vote) => (vote.value === -1 ? sum + 1 : sum),
      0,
    );

    return {
      ...post,
      upvotes,
      downvotes,
    };
  });

  return postsWithVotes;
};

export const getPost = async (id: string) => {
  return await getPosts(1);
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

  let vote = await db.postVote.findFirst({
    where: { postId, authorId: userId },
  });

  if (vote) {
    return await db.postVote.update({
      where: { id: vote.id },
      data: {
        value: value * -1,
      },
    });
  } else {
    return await db.postVote.create({
      data: {
        postId,
        authorId: userId,
        value,
      },
    });
  }
};
