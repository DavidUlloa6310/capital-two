import { useMutation, useQueryClient } from "react-query";
import type { Post, Comment } from "@prisma/client";

interface PostWithComments extends Post {
  comments: Comment[];
}

type AddComment = Pick<Comment, "id" | "content" | "postId">;

const addComment = ({ content, postId }: AddComment) => {
  return fetch(`/api/posts/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["addComment"], addComment, {
    onMutate: async (newComment) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Optimistically add the comment to the correct post
      queryClient.setQueryData<PostWithComments[]>(["posts"], (posts) => {
        return posts
          ? posts.map((post) => {
              if (post.id === newComment.postId) {
                post.comments.push({
                  ...newComment,
                  authorId: 0,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
              }
              return post;
            })
          : [];
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onSuccess: () => {
      console.log("Comment mutation successful");
    },
  });
};
