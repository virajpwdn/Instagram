import React from "react";
import Sidebar from "../components/layout/Sidebar";
import FeedView from "../components/layout/FeedView";

// This is Feed Page of our App
const Home = () => {
  return (
    <div className="flex overflow-y-auto ">
      <div className="p-5 left border-r-[1px] border-zinc-200  w-1/4">
        <Sidebar />
      </div>
      <div className="right border-2 border-secondary flex-grow overflow-x-hidden"> 
        <FeedView />
      </div>
    </div>
  );
};

export default Home;
