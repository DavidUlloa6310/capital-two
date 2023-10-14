import type { Post } from "@prisma/client";
import { db } from "@/server/db";
import { NewVote } from "@/schemas/voteSchemas";

//TODO: probably don't want an array of IDs, instead cursor based pagination
export const getPosts = async (
  { limit, cursor }: { limit: number; cursor: number } = {
    //default values
    limit: 10,
    cursor: 0,
  },
) => {
  const posts = await db.post.findMany({
    where: {
      id: {
        gt: cursor,
      },
    },
    include: {
      comments: {
        include: {
          author: true,
        },
      },
      author: true,
      post_votes: {
        select: {
          //postId: true,
          direction: true,
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
      (sum, vote) => (vote.direction === 1 ? sum + 1 : sum),
      0,
    );
    const downvotes = post.post_votes.reduce(
      (sum, vote) => (vote.direction === -1 ? sum + 1 : sum),
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

// `export const getPost = async (id: string) => {
//   return await getPosts(1);
// };`

//TODO: update to use next-auth
export const createPost = async (data: Post) => {
  const post = await db.post.create({
    data,
  });
  return post;
};

export const votePost = async (newVote: NewVote) => {
  const authorId = 1; //TODO: update to use next-auth

  let vote = await db.postVote.findFirst({
    where: { postId: newVote.postId, authorId },
  });

  if (vote) {
    const newDirection = newVote.direction * -1;
    return await db.postVote.update({
      where: { id: vote.id },
      data: {
        direction: newDirection,
      },
    });
  } else {
    return await db.postVote.create({
      data: {
        postId: newVote.postId,
        authorId: authorId,
        direction: newVote.direction,
      },
    });
  }
};
