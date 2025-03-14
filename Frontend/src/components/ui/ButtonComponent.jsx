import React from "react";

const ButtonComponent = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition-all duration-300 cursor-pointer focus:ring-2 active:scale-95 hover:ring-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
