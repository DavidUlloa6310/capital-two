import SwipeCard from "@/components/SwipeCard";
import Navbar from "@/components/Navbar";
import Interaction from "@/components/Interaction";
import UserInfo from "@/components/UserInfo";

const Swipe = () => {
  const cardData = [
    {
      author: "GloriousPenguin#125",
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
      <div className="flex">
        <div className="h-screen items-center justify-center">
          {cardData.map((data, index) => (
            <SwipeCard
              key={index}
              author={data.author}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <UserInfo />
          <Interaction />
        </div>
      </div>
    </>
  );
};
export default Swipe;
