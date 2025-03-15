import React from "react";
import Stories from "../ui/Stories";
import UserCard from "../ui/UserCard";

const FeedView = () => {
  return (
    <div className="min-h-screen text-textLight dark:text-textDark ">
      <div className="top h-[1.5em] bg-secondary"></div>
      <div className="middle h-1/6 border-b-2 border-zinc-200 dark:border-zinc-800 px-10 py-2 flex gap-6 overflow-x-auto scrollbar-hide cursor-pointer">
        <Stories />
      </div>
      <div className="bottom flex items-start justify-center border-2 border-green-500 overflow-y-auto min-h-screen scrollbar-hide">
        <div className="center-container w-1/2 lg:w-[38%] border-2 h-screen">
          <UserCard />
        </div>
      </div>
    </div>
  );
};

export default FeedView;
