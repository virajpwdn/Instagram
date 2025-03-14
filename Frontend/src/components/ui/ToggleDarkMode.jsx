import React, { useEffect, useState } from "react";
import IconComponent from "./IconComponent";

const ToggleDarkMode = () => {
  const [darkMode, setdarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const darkModeToggle = () => {
    const newMode = !darkMode;
    setdarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button onClick={darkModeToggle}>
      {darkMode ? (
        <IconComponent name="Sun" size={24} color="yellow" />
      ) : (
        <IconComponent name="Moon" size={24} color="black" />
      )}
    </button>
  );
};

export default ToggleDarkMode;
