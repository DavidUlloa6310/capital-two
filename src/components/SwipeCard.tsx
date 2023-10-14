import React, { useState } from "react";

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
  const [isDragging, setDragging] = useState(false);
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
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    const deltaX = e.clientX - startX;
    const cardWidth = e.currentTarget.clientWidth;

    if (deltaX < -cardWidth / 4) {
      handleSwipe("left");
    } else if (deltaX > cardWidth / 4) {
      handleSwipe("right");
    }
  };

  return (
    <div
      className={`transform rounded-md border bg-white p-4 shadow-md ${
        isDragging ? "scale-105" : ""
      } ${isSwiped ? "hidden" : "block"}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ maxWidth: "300px" }}
    >
      <p>{content}</p>
      <div className="mb-2 text-xl font-semibold">{author}</div>
    </div>
  );
};

export default SwipeCard;
