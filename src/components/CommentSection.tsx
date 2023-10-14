import { useState, FormEvent } from "react";
import Comment from "./Comment";
import { Comment as TComment } from "@prisma/client";
import { IoArrowRedoOutline } from "react-icons/io5";

interface CommentSectionProps {
  author: {
    first_name: string;
    last_name: string;
  };
  comments: TComment[];
}

const CommentSection = ({ author, comments }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("submitted");
  }

  return (
    <div className="mr-8 mt-10 h-fit rounded border border-gray-300 p-4">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>
      <div className="space-y-4">
        {comments.map(({ authorId, content }, index) => (
          <div key={index} className="rounded bg-gray-100 p-3">
            <Comment authorId={authorId} content={content} />
          </div>
        ))}
      </div>
      <form onSubmit={submitComment} className="mt-4 flex space-x-2">
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="rounded bg-[#0f395a] px-3 py-0 text-white"
          type="submit"
        >
          <IoArrowRedoOutline />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
