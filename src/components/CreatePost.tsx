import React, { useState } from "react";
import { usePostMutation } from "@/hooks/usePostMutation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPostMutation = usePostMutation({
    onSuccess: () => {
      console.log("Post was created!");
      setTitle("");
      setContent("");
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      title,
      content,
    };

    await createPostMutation.mutateAsync(postData);
  };

  return (
    <div className="h-full w-[50%] rounded-md border-2 border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter a title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            placeholder="Write your post content here"
          />
        </div>

        <div className="flex justify-start">
          <button
            disabled={createPostMutation.isLoading}
            type="submit"
            className="hover-bg-blue-600 rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
