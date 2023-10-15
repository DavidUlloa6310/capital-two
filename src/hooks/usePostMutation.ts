import { useMutation } from "react-query";

const createPost = ({ content, title }: { content: string; title: string }) => {
  return fetch(`/api/posts/`, {
    method: "POST",
    body: JSON.stringify({ content, title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const usePostMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation(["createPost"], createPost, {
    onSuccess,
  });
};
