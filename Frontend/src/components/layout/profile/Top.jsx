import React from "react";
import RemixIconComponent from "../../ui/RemixIconComponent";
import IconComponent from "../../ui/IconComponent";

const Top = () => {
  return (
    <div className="flex justify-between items-center px-5 border-2">
      <div className="section-1 flex items-center gap-2">
        <div className="left">
          <RemixIconComponent
            className="font-semibold text-xl"
            name="lock-line"
          ></RemixIconComponent>
        </div>
        <div className="right">
          <h2 className="font-semibold sm:text-sm">virat.kholi</h2>
        </div>
      </div>
      <div className="section-2 flex gap-2 items-center ">
        <div className="left">
          <IconComponent name="Bell" size={22} />
        </div>
        <div className="right">
          <IconComponent name="Menu" size={26} />
        </div>
      </div>
    </div>
  );
};

export default Top;

