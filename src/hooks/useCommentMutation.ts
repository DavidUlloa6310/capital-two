import { useMutation, useQueryClient } from "react-query";
import type { Post, Comment } from "@prisma/client";

interface PostWithComments extends Post {
  comments: Comment[];
}

const addComment = ({
  content,
  postId,
}: {
  content: string;
  postId: number;
}) => {
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
      const previousPosts = queryClient.getQueryData(["posts"]) as Post[];

      // Optimistically add the comment to the correct post
      queryClient.setQueryData(["posts"], (old: any) => {
        return old.map((post: PostWithComments) => {
          if (post.id === newComment.postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        });
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onSuccess: () => {
      console.log("Comment mutation successful");
    },
  });
};
