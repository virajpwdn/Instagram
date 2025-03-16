import React from "react";
import RemixIconComponent from "../components/ui/RemixIconComponent";
import IconComponent from "../components/ui/IconComponent";
import ToggleDarkMode from "../components/ui/ToggleDarkMode";
import Stories from "../components/ui/Stories";
import UserCard from "../components/ui/UserCard";

const MobileHome = () => {
  return (
    <div className="overflow-hidden relative">
      <div className="top border-2 p-3">
        <div className="left flex items-center justify-between">
          {/* <div className="img-container w-20 bg-primary">
            <img src="/Instagram_logo.PNG" alt="" />
          </div> */} 
          <h1 className="font-extrabold text-4xl font-caveat">Instagram</h1>
          <div className="right flex items-center gap-3">
            <ToggleDarkMode />
            <RemixIconComponent name="add-box-line" className="text-2xl" />
            <IconComponent name="MessageCircleMore" />
          </div>
        </div>
      </div>
      <div className="middle border-2 border-primary scrollbar-hide flex gap-4 overflow-x-auto px-4 pt-3">
            <Stories />
      </div>
      <div className="bottom">
        <UserCard />
      </div>
    </div>
  );
};

export default MobileHome;
