import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import { useFeed } from "@/hooks/useFeed";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SigninWarning from "@/components/SigninWarning";
import { getUserNickname } from "@/util/nicknames";
import LoadingSpinner from "@/components/LoadingSpinner";

const Swipe = () => {
  const {
    performSwipe,
    currentPost,
    nextPost,
    previousPost,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useFeed();

  const { data: session } = useSession();

  useEffect(() => {
    console.log("Changed current post", currentPost);
    console.log("Changed next post", nextPost);
    console.log("Changed previous post", previousPost);
  }, [currentPost]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (session == null) {
    return <SigninWarning />;
  }

  return (
    <main>
      <Navbar />
      <div className="mt-10 grid grid-cols-9 gap-8 p-5">
        <div className="align-center col-span-4 flex items-center justify-center">
          <div className="relative h-[700px] w-[500px]">
            {[
              { data: nextPost, zIndex: 1 },
              { data: currentPost, zIndex: 2 },
            ].map(
              (card, index) =>
                card.data && (
                  <SwipeCard
                    key={card.data.id}
                    zIndex={card.zIndex}
                    content={card.data.content}
                    author={getUserNickname(card.data.author.name) as string}
                    handleSwipe={performSwipe}
                    hasNext={nextPost != null}
                  />
                ),
            )}
          </div>
        </div>
        <div className="col-span-5 text-3xl font-light">
          {currentPost && (
            <>
              <UserInfo
                title={currentPost.title || "a post without a title"}
                author={`${getUserNickname(currentPost.author.name)}`}
                income={currentPost.author.income ?? 0}
                location={currentPost.author.location ?? "Hidden"}
                age={currentPost.author.age ?? 0}
              />
              <CommentSection {...currentPost} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};
export default Swipe;
