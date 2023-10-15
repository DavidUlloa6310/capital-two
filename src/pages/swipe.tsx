import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import UserInfo from "@/components/UserInfo";
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

  const handleSwipeLeft = () => {
    setHasSwipedLeft(true);
    performSwipe(-1);
    console.log("Swiped Left");

    setTimeout(() => {
      setHasSwipedLeft(false);
    }, 400);
  };

  const handleSwipeRight = () => {
    setHasSwipedRight(true);
    performSwipe(1);
    console.log("Swiped Right");

    setTimeout(() => {
      setHasSwipedRight(false);
    }, 400);
  };
  const [hasSwipedRight, setHasSwipedRight] = useState(false);
  const [hasSwipedLeft, setHasSwipedLeft] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (session == null) {
    return (
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <h2>Make sure to login to view other's posts</h2>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-8 gap-20 p-5">
        <div className="align-center col-span-3 flex items-center justify-center">
          <div className="relative h-[700px] w-[500px]">
            {[
              { data: nextPost, zIndex: 1 },
              { data: currentPost, zIndex: 2 },
            ].map(
              (card, index) =>
                card.data && (
                  <div
                    key={`${card.data.id}, ${index}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,

                      zIndex: card.zIndex,
                      animation: hasSwipedRight
                        ? "fadeOutAndFallRight 0.4s linear"
                        : hasSwipedLeft
                        ? "fadeOutAndFallLeft 0.4s linear"
                        : "none",
                    }}
                  >
                    <SwipeCard
                      content={card.data.content}
                      author={card.data.author.first_name}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </div>
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
                income={123123123123}
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
