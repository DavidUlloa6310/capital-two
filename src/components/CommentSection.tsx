import { useState, FormEvent, useEffect, useRef } from "react";
import Comment from "./Comment";
import { Comment as TComment } from "@prisma/client";
import { IoArrowRedoOutline } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { useCommentMutation } from "@/hooks/useCommentMutation";

interface CommentSectionProps {
  author: {
    first_name: string;
    last_name: string;
  };
  comments: TComment[];
  id: number;
}

const CommentSection = ({
  id: postId,
  author,
  comments,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const commentMutation = useCommentMutation();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const commentWrapperRef = useRef<HTMLDivElement | null>(null);

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionLoading(true);

    if (!newComment) {
      return;
    }

    commentMutation.mutate({
      content: newComment,
      postId,
    });
    setSubmissionLoading(false);
    setNewComment("");
  }

  // scroll to the top if you add a new comment
  useEffect(() => {
    if (!commentWrapperRef.current) {
      return;
    }

    commentWrapperRef.current.scrollTo({
      top: commentWrapperRef.current.scrollTop,
      behavior: "smooth",
    });
  }, [comments]);

  return (
    <div className="mr-8 mt-10 h-fit rounded border border-gray-300 p-4">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>
      <div
        className="flex h-[24rem] flex-col-reverse gap-3 overflow-y-scroll"
        ref={(e) => (commentWrapperRef.current = e)}
      >
        {comments.map(({ authorId, content }, index) => (
          <div
            key={index}
            className="w-full rounded-lg bg-gray-100 p-3 hover:bg-gray-200 hover:shadow-md"
          >
            <Comment authorId={authorId} content={content} />
          </div>
        ))}
      </div>
      <form onSubmit={submitComment} className="mt-4 flex space-x-2">
        <input
          type="text"
          className="bg-mainGray w-full rounded border border-gray-300 bg-opacity-5 p-2 text-lg focus:outline-none disabled:bg-opacity-20"
          disabled={submissionLoading}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="rounded bg-[#0f395a] px-3 py-0 text-white enabled:active:translate-y-1 disabled:bg-opacity-70"
          disabled={submissionLoading}
          type="submit"
        >
          <IoArrowRedoOutline />
        </button>
      </form>
      <span className="text-mainGray mt-2 flex items-center justify-start gap-1 text-base">
        <GoCommentDiscussion />
        <p>{comments.length}</p>
      </span>
    </div>
  );
};

export default CommentSection;
