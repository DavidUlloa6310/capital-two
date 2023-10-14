import Image from "next/image";
import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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
  const removeThreshold = 70;
  const [hasSwiped, setHasSwiped] = useState(false);

  const handleSwipe = (direction: string) => {
    if (direction === "left") {
      onSwipeLeft();
    } else if (direction === "right") {
      onSwipeRight();
    }
  };

  const handleStop = (_: DraggableEvent, data: DraggableData) => {
    if (Math.abs(data.x) > removeThreshold) {
      setHasSwiped(true);
      handleSwipe(data.x < 0 ? "left" : "right");
    }
  };

  return (
    <Draggable
      bounds={{ right: 175, left: -175, top: -25, bottom: 20 }}
      onDrag={(_, { deltaX }) => {
        if (Math.abs(deltaX) > removeThreshold) {
          handleSwipe(deltaX < 0 ? "left" : "right");
        }
      }}
      onStop={handleStop}
    >
      <div className={`ml-6 mt-6 h-[700px] w-[500px] rounded-md bg-[#0f395a]`}>
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
      </div>
    </Draggable>
  );
};

export default SwipeCard;
