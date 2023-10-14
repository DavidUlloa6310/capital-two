import { useMutation, useQueryClient, type InfiniteData } from "react-query";
import type { PostWithRelations } from "@/types/PostWithRelations";
import type { Comment } from "@prisma/client";

const addComment = ({
  content,
  postId,
}: {
  content: string;
  postId: number;
}) => {
  return fetch(`/api/posts/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ content, postId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["addComment"], addComment, {
    onMutate: async (newComment) => {
      const completeNewComment: Comment = {
        ...newComment,
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: 1,
      };

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<PostWithRelations[]>([
        "feed",
      ]);

      queryClient.setQueryData<
        InfiniteData<Array<PostWithRelations>> | undefined
      >(["feed"], (oldData) => {
        if (!oldData) {
          return {
            pages: [[]], // Initialize with empty data
            pageParams: [],
          };
        }

        const newData = oldData?.pages.map((page) =>
          page.map((item) => {
            if (item.id === newComment.postId) {
              return {
                ...item,
                comments: [...item.comments, completeNewComment],
              };
            } else {
              return item;
            }
          }),
        );
        return {
          ...oldData,
          pages: newData,
        };
      });

      console.log("previousPosts", previousPosts);
      console.log("New data", queryClient.getQueryData(["feed"]));

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onSuccess: () => {
      console.log("Comment mutation successful");
    },
  });
};
