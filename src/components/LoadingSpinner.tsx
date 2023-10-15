import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#3498db]"></div>
    </div>
  );
};

export default LoadingSpinner;
