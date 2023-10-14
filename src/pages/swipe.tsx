import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import UserInfo from "@/components/UserInfo";
import { useFeed } from "@/hooks/useFeed";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    console.log("Changed current post", currentPost);
    console.log("Changed next post", nextPost);
    console.log("Changed previous post", previousPost);
  }, [currentPost]);

  const cardData = [
    {
      author: "GloriousPenguin#125",
      income: "$15,000",
      content:
        "“Just invested 80% of my paycheck into a local artisanal avocado toast subscription service 🥑🍞, because who needs a savings account when you've got gourmet breakfast for days? 🤷🏻‍♂️ Now seeking advice on how to explain to my landlord that avocados are the new gold 🥇🏠. #SanFrancisco #MillennialProblems #SendHelpAndRentMoney”",
    },
  ];

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

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 gap-20">
        <div className="relative col-span-2 h-screen">
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
        <div className="col-span-3 mt-6 text-3xl font-light">
          {currentPost && (
            <>
              <UserInfo
                title="Hard Coded title"
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
    </>
  );
};
export default Swipe;
