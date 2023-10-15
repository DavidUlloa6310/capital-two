import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { createPost } from "@/util/createPost";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a valid authorId in the session.
    const authorId = Number(session.data?.user.id);

    if (authorId) {
      const postData = {
        title,
        content,
        authorId,
      };

      // Call your createPost function with postData.
      const createdPost = await createPost(postData);

      // Handle the result as needed.
      if (createdPost) {
        // Post was created successfully.
        // You can reset the form if desired.
        setTitle("");
        setContent("");
      } else {
        // Handle any errors.
      }
    }
  };

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
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

        <div className="flex justify-end">
          <button
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
