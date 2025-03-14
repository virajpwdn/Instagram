import * as Icons from "lucide-react";

import React from "react";

const IconComponent = ({
  name,
  size = 24,
  color = "currentColor",
  onClick,
}) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    console.error(`Icon "${name}" does not exist in Lucide React`);
    return null;
  }
  return <LucideIcon size={size} color={color} onClick={onClick} />;
};

export default IconComponent;
