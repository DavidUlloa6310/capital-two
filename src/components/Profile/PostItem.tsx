import React from "react";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { Post } from "@prisma/client";

import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

export interface PostDetailsProps {
  post: any;
  averageIncome: string;
  averageAge: string;
}

function PostItem({ post, averageIncome, averageAge }: PostDetailsProps) {
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
            data={`Average Income: ${averageIncome}`}
            className="bg-green-500  bg-opacity-80"
          />
          <Data
            Icon={BiCake}
            data={`Average Age: ${averageAge}`}
            className="bg-blue-400  bg-opacity-80"
          />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
