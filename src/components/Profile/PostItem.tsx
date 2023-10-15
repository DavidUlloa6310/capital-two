import React from "react";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { Post } from "@prisma/client";
import { PostWithRelations } from "@/types/PostWithRelations";

import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

function PostItem({ post }: { post: PostWithRelations }) {
  return (
    <div className="my-4 rounded-md border-2 border-gray-200 p-4">
      <div className="flex-between flex flex-row">
        <p className=" w-[80%]">{post.content}</p>
        <p className=" font-bold">{String(post.createdAt)}</p>
      </div>
      <div>
        <div className="mt-7 flex items-center justify-start gap-4">
          <Data
            Icon={BsCash}
            data={`Number of Upvotes: ${post.upvotes}`}
            className="bg-capital_blue  bg-opacity-80"
          />
          <Data
            Icon={BiCake}
            data={`Number of Downvotes: ${post.downvotes}`}
            className="bg-[#ff374f]  bg-opacity-80"
          />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
