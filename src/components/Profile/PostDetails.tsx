import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { Post } from "@prisma/client";
import PostItem from "@/components/Profile/PostItem";

import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

import { type PostDetailsProps } from "@/components/Profile/PostItem";

function PostDetails({ posts }: { posts: PostDetailsProps[] }) {
  return (
    <div className="mx-[50px] ">
      <h2 className=" text-roboto text-3xl font-bold">Your Posts</h2>
      {posts.map((itemData) => {
        return (
          <PostItem
            post={itemData.post}
            averageAge={itemData.averageAge}
            averageIncome={itemData.averageIncome}
          />
        );
      })}
    </div>
  );
}

export default PostDetails;
