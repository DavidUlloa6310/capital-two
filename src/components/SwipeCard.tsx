import Image from "next/image";
import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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
  const [hasSwiped, setHasSwiped] = useState(false);
  const [offset, setOffset] = useState(0);

  // const handleSwipe = (direction: string) => {
  //   if (direction === "left") {
  //     onSwipeLeft();
  //   } else if (direction === "right") {
  //     onSwipeRight();
  //   }
  // };

  const handleStop = (_: DraggableEvent, data: DraggableData) => {
    if (Math.abs(offset) > removeThreshold) {
      return;
    }

    //If the user didn't swipe far enough, animate the card back to the center
    setOffset(0);
  };

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setOffset(data.x);
    console.log(offset);

    if (Math.abs(offset) > removeThreshold) {
      setHasSwiped(true);

      setTimeout(() => {
        handleSwipe(offset < 0 ? -1 : 1);
      }, 400);
    }
  };

  return (
    <Draggable
      bounds={{ right: 500, left: -500, top: -100, bottom: 100 }}
      position={{ x: offset, y: 0 }}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: zIndex,
          animation: hasSwiped
            ? `${
                offset > 0 ? "fadeOutAndFallRight" : "fadeAndFallOutLeft"
              } 0.4s linear`
            : "none",
        }}
      >
        <div
          className={`h-[700px] w-[500px] rounded-md bg-[#0f395a]`}
          style={{
            opacity: `${100 - 0.1 * Math.abs(offset) ** 1.2}%`,
            transform: `translateX(${offset}px) rotate(${offset / 20}deg)`,
          }}
        >
          <div
            className={`relative top-5 ml-5 mr-4 h-[84%] w-[93%] transform rounded-md border bg-white p-4 shadow-md`}
          >
            <p className="w-full text-3xl font-light leading-normal">
              {content}
            </p>
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
        </div>
      </div>
    </Draggable>
  );
};

export default SwipeCard;
