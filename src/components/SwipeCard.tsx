import Image from "next/image";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface SwipeCardProps {
  author: string;
  content: string;
  handleSwipe: (direction: 1 | -1) => void;
  zIndex: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  author,
  content,
  handleSwipe,
  zIndex,
}) => {
  const removeThreshold = 300;
  const [isSwiped, setIsSwiped] = useState<-1 | 1 | null>(null);

  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    // onRest: () => {
    //   console.log("On rest running");
    //   if (isSwiped !== null) {
    //     console.log("isSwiped is not null", isSwiped);
    //     handleSwipe(isSwiped);
    //   }
    // },
  }));

  const bind = useDrag(({ down, movement: [mx, my], velocity, last }) => {
    const overThreshold = Math.abs(mx) > removeThreshold;
    //if over the threshold and mouse is up, then remove the card
    if (overThreshold) {
      setIsSwiped(mx < 0 ? -1 : 1);
    }

    const rotation = mx / 25;
    api.start({
      x: down ? mx : overThreshold ? mx * 2 : 0,
      y: down ? my : 0,
      rotate: down ? rotation : overThreshold ? mx / 12 : 0,
      opacity: down ? 1 - Math.abs(mx) ** 1.08 / 1000 : overThreshold ? 0 : 1,
    });

    if (!down && overThreshold) {
      //maybe add timeout?
      setTimeout(() => {
        handleSwipe(mx < 0 ? -1 : 1);
      }, 400);
    }
  });

  return (
    <animated.div
      className="absolute left-0 top-0 h-[700px] w-[500px] rounded-md bg-[#0f395a]"
      style={{
        zIndex,
        ...springs,
      }}
      {...bind()}
    >
      <div
        className={`relative top-5 ml-5 mr-4 h-[84%] w-[93%] transform rounded-md border bg-white p-4 shadow-md`}
      >
        <p className="w-full text-3xl font-light leading-normal">{content}</p>
        <Image
          priority
          src={"/content_triangle_ish.png"}
          alt=""
          width={40}
          height={40}
          className="absolute -bottom-11 right-0"
        />
      </div>
      <div className="mb-2 ml-6 mt-11 text-3xl font-light text-white">
        {author} says...
      </div>
    </animated.div>
  );
};

export default SwipeCard;
