import React from "react";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { PostWithRelations } from "@/types/PostWithRelations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

dayjs.extend(relativeTime);

function PostItem({ post }: { post: PostWithRelations }) {
  const formattedDate = dayjs(post.createdAt).fromNow();

  return (
    <div className="my-4 rounded-md border-2 border-gray-200 p-4">
      <div className="flex-between flex flex-row">
        <p className="w-[80%]">{post.content}</p>
        <p className="font-bold">{formattedDate}</p>{" "}
      </div>
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