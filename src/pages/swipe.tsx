import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import UserInfo from "@/components/UserInfo";

const Swipe = () => {
  const cardData = [
    {
      author: "GloriousPenguin#125",
      income: "$15,000",
      content:
        "“Just invested 80% of my paycheck into a local artisanal avocado toast subscription service 🥑🍞, because who needs a savings account when you've got gourmet breakfast for days? 🤷🏻‍♂️ Now seeking advice on how to explain to my landlord that avocados are the new gold 🥇🏠. #SanFrancisco #MillennialProblems #SendHelpAndRentMoney”",
    },
    {
      author: "GloriousPenguin#126",
      income: "$15,000",
      content:
        "“Just invested 80% of my paycheck into a local artisanal avocado toast subscription service 🥑🍞, because who needs a savings account when you've got gourmet breakfast for days? 🤷🏻‍♂️ Now seeking advice on how to explain to my landlord that avocados are the new gold 🥇🏠. #SanFrancisco #MillennialProblems #SendHelpAndRentMoney”",
    },
  ];

  const handleSwipeLeft = () => {
    console.log("Swiped Left");
  };

  const handleSwipeRight = () => {
    console.log("Swiped Right");
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-20">
        <div className="h-screen">
          {cardData.map((data, index) => (
            <SwipeCard
              key={index}
              content={data.content}
              author={data.author}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </div>
        <div className="ml-4 mt-6 w-60 flex-1 text-3xl font-light">
          <UserInfo />
          <CommentSection />
        </div>
      </div>
    </>
  );
};
export default Swipe;
