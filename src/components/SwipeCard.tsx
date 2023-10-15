import Image from "next/image";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface SwipeCardProps {
  author: string;
  content: string;
  handleSwipe: (direction: 1 | -1) => void;
  zIndex: number;
  hasNext: boolean;
}

const removeThreshold = 300;

const calculateColor = (mx: number) => {
  // Determine the percentage of swipe progress
  const progress =
    Math.min(Math.abs(mx) * 0.6, removeThreshold) / removeThreshold;
  // console.log("Progress", progress);

  // Define the color stops
  const defaultColor = [14, 57, 90];
  const green = [34, 197, 94];
  const red = [255, 55, 79];

  // Determine which color stop to use (red or green)
  const targetColor = mx < 0 ? red : green;

  // Calculate the interpolated color based on progress
  const interpolatedColor = defaultColor.map((component, index) =>
    Math.round(
      (1 - progress) * defaultColor[index]! + progress * targetColor[index]!,
    ),
  );

  // Convert the color values to RGB format
  const rgbColor = {
    red: interpolatedColor[0],
    green: interpolatedColor[1],
    blue: interpolatedColor[2],
  };

  const str = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
  return str;
};

const SwipeCard: React.FC<SwipeCardProps> = ({
  author,
  content,
  handleSwipe,
  zIndex,
  hasNext,
}) => {
  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    config: {
      tension: 500,
      friction: 30,
    },
  }));

  const bind = useDrag(({ down, movement: [mx, my], velocity, last }) => {
    const overThreshold =
      (hasNext && Math.abs(mx) > removeThreshold) || velocity[0] > 2;
    //if over the threshold and mouse is up, then remove the card

    const rotation = mx / 25;
    api.start({
      x: down ? mx : overThreshold ? mx * 3 : 0,
      y: down ? my : overThreshold ? my : 0,
      rotate: down ? rotation : overThreshold ? mx / 12 : 0,
      opacity: down ? 1 - Math.abs(mx) ** 1.13 / 2000 : overThreshold ? 0 : 1,
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
      className="absolute left-0 top-0 h-[700px] w-[500px] select-none overflow-y-scroll rounded-md"
      style={{
        zIndex,
        ...springs,
        backgroundColor: springs.x.to((x) => calculateColor(x)),
      }}
      {...bind()}
    >
      <div
        className={`relative top-5 ml-5 mr-4 h-[84%] w-[93%] transform rounded-md border bg-white p-4 shadow-md`}
      >
        <p className="h-full w-full overflow-y-scroll text-3xl font-light leading-normal">
          {content}
        </p>
        <Image
          priority
          src={"/content_triangle_ish.svg"}
          alt=""
          width={40}
          height={40}
          className="absolute -bottom-9 right-0"
        />
      </div>
      <div className="mb-2 ml-6 mt-11 text-3xl font-light text-white">
        {author} says...
      </div>
    </animated.div>
  );
};

export default SwipeCard;
