import React, { useState } from "react";
import RemixIconComponent from "./RemixIconComponent";

const BottomDock = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    {
      id: "home",
      activeIcon: "home-5-fill",
      inactiveIcon: "home-5-line",
    },
    {
      id: "search",
      activeIcon: "search-2-fill",
      inactiveIcon: "search-2-line",
    },
    {
      id: "add",
      activeIcon: "add-box-fill",
      inactiveIcon: "add-box-line",
    },
    {
      id: "heart",
      activeIcon: "heart-fill",
      inactiveIcon: "heart-line",
    },
    {
      id: "profile",
      activeIcon: "user-3-fill",
      inactiveIcon: "user-3-line",
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark h-[4rem] px-5 fixed bottom-0 left-0 right-0 flex justify-around items-center">
      {tabs.map((tab) => (
        <RemixIconComponent
          key={tab.id}
          name={activeTab === tab.id ? tab.activeIcon : tab.inactiveIcon}
          className={`text-3xl ${
            activeTab === tab.id
              ? "text-red-500"
              : "text-textLight dark:text-textDark"
          }`}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
    </div>
  );
};

export default BottomDock;
