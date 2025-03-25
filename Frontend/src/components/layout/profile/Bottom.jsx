import React, { useState } from "react";
import RemixIconComponent from "../../ui/RemixIconComponent";

const Bottom = () => {
    const [gridIcon, setGridIcon] = useState("layout-grid-fill")
    const [tagIcon, setTagIcon] = useState("file-user-line")

    const shiftIcon1 = ()=>{
        setGridIcon("layout-grid-fill")
        setTagIcon("file-user-line")
    }
    const shiftIcon2 = ()=>{
        setGridIcon("layout-grid-line")
        setTagIcon("file-user-fill")
    }
  return (
    <div className="bg-emerald-500">
      <div className="top flex items-center justify-center gap-5">
        <button className="transition-all duration-300 ease-in-out" onClick={shiftIcon1}>
          <RemixIconComponent name={gridIcon} className="text-3xl" />
        </button>
        <button onClick={shiftIcon2}>
          <RemixIconComponent name={tagIcon} className="text-3xl" />
        </button>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Bottom;
