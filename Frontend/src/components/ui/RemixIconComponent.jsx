import React from "react";

const RemixIconComponent = ({
  name,
  className = "",
  size = 24,
  onClick,
  onDoubleClick,
  isActive,
  activeColor = "text-red-500",
  defaultColor = "text-textLight dark:text-textDark"
}) => {
  const iconClass = isActive ? activeColor : defaultColor
  return (
    <i
      className={`ri-${name} ${className} ${iconClass}`}   
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default RemixIconComponent;
