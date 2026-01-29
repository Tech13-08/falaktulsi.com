import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-textSecondary border-t-transparent"></div>
    </div>
  );
};

export default Loading;
