import React, { useState } from "react";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { PostWithRelations } from "@/types/PostWithRelations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BiCake } from "react-icons/bi";
import { getUserNickname } from "@/util/nicknames";
import { BsCash } from "react-icons/bs";

dayjs.extend(relativeTime);

function PostItem({ post, key }: { post: PostWithRelations; key: number }) {
  const formattedDate = dayjs(post.createdAt).fromNow();
  const comments = post.comments;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="my-4 w-[500px] transform cursor-pointer rounded-md border-2 border-gray-200 p-4 transition-transform hover:scale-[102%]"
      onClick={toggleExpand}
    >
      <div className="flex-between flex flex-row gap-10">
        <p className="w-[70%] truncate">{post.title}</p>
        <p className="whitespace-nowrap font-bold">{formattedDate}</p>
      </div>
      {isExpanded && (
        <div>
          <div className="mt-7 flex items-center justify-start gap-4"></div>
          <div>{post.content}</div>
          {comments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comments:</h3>
              <ul>
                {comments
                  .map((comment, index) => (
                    <li key={index}>
                      {comment.content} - {getUserNickname(comment.author.name)}
                    </li>
                  ))
                  .slice(0, 5)}
              </ul>
            </div>
          )}
        </div>
      )}
      <div>
        <div className="mt-7 flex items-center justify-start gap-4">
          <Data
            Icon={BsCash}
            data={`Number of Upvotes: ${post.upvotes}`}
            className="bg-capital_blue bg-opacity-80"
          />
          <Data
            Icon={BiCake}
            data={`Number of Downvotes: ${post.downvotes}`}
            className="bg-[#ff374f] bg-opacity-80"
          />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
