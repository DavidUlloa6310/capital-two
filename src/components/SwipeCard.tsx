import Image from "next/image";
import React, { useState } from "react";
import Draggable from "react-draggable";

interface SwipeCardProps {
  author: string;
  content: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  author,
  content,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [isSwiped, setSwiped] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleSwipe = (direction: string) => {
    if (direction === "left") {
      onSwipeLeft();
    } else if (direction === "right") {
      onSwipeRight();
    }
    setSwiped(true);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
    const deltaX = e.clientX - startX;
    const cardWidth = e.currentTarget.clientWidth;

    if (deltaX < -cardWidth / 4) {
      handleSwipe("left");
    } else if (deltaX > cardWidth / 4) {
      handleSwipe("right");
    }
  };

  return (
    <Draggable bounds={{ right: 175, left: -175, top: -25, bottom: 20 }}>
      <div
        className={`ml-6 mt-6 h-[700px] w-[500px] rounded-md bg-[#0f395a] active:opacity-100
        `}
        // draggable="true"
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
      >
        <div
          className={`relative top-5 ml-5 mr-4 h-[84%] w-[93%] transform rounded-md border bg-white p-4 shadow-md active:opacity-100 `}
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
      </div>
    </Draggable>
  );
};

export default SwipeCard;
