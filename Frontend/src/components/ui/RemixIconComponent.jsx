import React from "react";

const RemixIconComponent = ({
  name,
  className = "",
  size = 24,
//   color = "currentColor",
  onClick,
}) => {
  return (
    <i
      className={`ri-${name} ${className}`}
    //   style={{ color }}
      onClick={onClick}
    />
  );
};

export default RemixIconComponent;
