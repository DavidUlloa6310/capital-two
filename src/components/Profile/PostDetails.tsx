import { IconType } from "react-icons";
import { ReactNode } from "react";
import Data from "@/components/Data";
import { Post } from "@prisma/client";
import PostItem from "@/components/Profile/PostItem";

import { BiCake } from "react-icons/bi";
import { BsCash } from "react-icons/bs";

import { type PostWithRelations } from "@/types/PostWithRelations";

function PostDetails({ posts }: { posts: PostWithRelations[] }) {
  return (
    <>
      <h2 className=" text-roboto text-3xl font-bold">Your Posts</h2>
      <div className="flex w-full flex-wrap items-center justify-center gap-10 px-[50px]">
        {posts.length == 0 ? <h2>You have no posts!</h2> : null}
        {posts.map((post) => {
          return <PostItem post={post} />;
        })}
      </div>
    </>
  );
}

export default PostDetails;
