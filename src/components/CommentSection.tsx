import React, { useState } from "react";
import Comment from "./Comment";
import { IoArrowRedoOutline } from "react-icons/io5";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      content:
        "“GloriousPenguin, you should really look into a retirement ETF and not avocado toast 🤣”",
      author: "StarryMiner#419",
      income: "$220,000",
      age: "41",
    },
    {
      content: "“You know, that's valid. Who doesn't love Avocado toast?”",
      author: "JuliusArmadillo#092",
      income: "$71,000",
      age: "25",
    },
    {
      content: "“Where can I sign up!? Avocado Toast to the moon!”",
      author: "PerryPlatypus#984",
      income: "$20,000",
      age: "19",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="mr-8 mt-10 h-fit rounded border border-gray-300 p-4">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="rounded bg-gray-100 p-3">
            <Comment comment={comment} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="rounded bg-[#0f395a] px-3 py-0 text-white">
          <IoArrowRedoOutline />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
