import { useMutation, useQueryClient, type InfiniteData } from "react-query";
import type {
  CommentWithAuthor,
  PostWithRelations,
} from "@/types/PostWithRelations";
import type { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";

type AddComment = Pick<Comment, "id" | "content" | "postId">;

const addComment = ({ content, postId }: AddComment) => {
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
  const session = useSession();

  return useMutation(["addComment"], addComment, {
    onMutate: async (data) => {
      const newComment: CommentWithAuthor = {
        ...data,
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: 1,
        author: {
          email: session.data!.user.email || "",
          name: session.data!.user.name || "Anonymous",
          id: 1,
          age: 0,
          last_login: new Date(),
          emailVerified: null,
          credit_score: null,
          income: null,
          location: null,
          job_title: null,
          image: "",
        },
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
                comments: [...item.comments, newComment],
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
