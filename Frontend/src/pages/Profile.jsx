import React from "react";
import ToggleDarkMode from "../components/ui/ToggleDarkMode";
import Top from "../components/layout/profile/Top";
import Middle from "../components/layout/profile/Middle";
import Bottom from "../components/layout/profile/Bottom";

const Profile = () => {
  return (
    <div className="bg- min-h-screen sm:w-[40%]  max-w-md mx-auto">
      <ToggleDarkMode />
      <div className="top">
        <Top />
      </div>
      <div className="middle">
        <Middle />
      </div>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  );
};

export default Profile;
