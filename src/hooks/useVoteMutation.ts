import { useMutation } from "react-query";

const votePost = ({
  postId,
  direction,
}: {
  postId: number;
  direction: number;
}) => {
  return fetch(`/api/posts/${postId}/vote`, {
    method: "POST",
    body: JSON.stringify({ direction }),
  });
};

export const useVoteMutation = () => {
  return useMutation(["votePost"], votePost, {
    onSuccess: () => {
      console.log("Vote mutation successful");
    },
  });
};
