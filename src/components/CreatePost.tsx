import React from "react";

const CreatePost = () => {
  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
      <form>
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
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            placeholder="Write your post content here"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
