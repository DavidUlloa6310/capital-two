import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import { useFeed } from "@/hooks/useFeed";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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

  // const handleSwipeLeft = () => {
  //   performSwipe(-1);
  //   console.log("Swiped Left");
  // };

  // const handleSwipeRight = () => {
  //   performSwipe(1);
  //   console.log("Swiped Right");
  // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (session == null) {
    return (
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <h2 className="text-capital_blue textl-4xl">
          Make sure to login to view other's posts.
        </h2>
        <button>
          <Link href="/api/auth/signin">
            <button>Log In</button>
          </Link>
        </button>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-9 gap-8 p-5">
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
                    author={card.data.author.first_name}
                    handleSwipe={performSwipe}
                    // onSwipeLeft={handleSwipeLeft}
                    // onSwipeRight={handleSwipeRight}
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
                author={`${currentPost.author.first_name} ${currentPost.author.last_name}`}
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
