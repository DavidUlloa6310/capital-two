import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="mt-20 flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
};

export default LoadingSpinner;
