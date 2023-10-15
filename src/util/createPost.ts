export const createPost = ({
  title,
  authorId,
  content,
}: {
  content: string;
  authorId: number;
  title: string;
}) => {
  return fetch(`/api/posts/createPost/`, {
    method: "POST",
    body: JSON.stringify({ content, authorId, title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
