import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants/links";
import ToggleDarkMode from "../ui/ToggleDarkMode";

const Sidebar = () => {
  return (
    <div className="text-textLight dark:text-textDark flex flex-col justify-between min-h-screen">
      <div className="top">
        <div className="flex justify-between items-start">
          <div className="img-fit-div h-24 w-24 rounded-full border-2 border-textLight dark:border-textDark">
            <img
              className="w-full h-full rounded-full object-top object-cover"
              src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww"
              alt="user profile picture"
            />
          </div>
          <ToggleDarkMode />
        </div>

        <div className="right">
          <h2 className="pt-3 font-inter tracking-wide font-medium text-[0.9rem] md:text-xl">
            Christiano Ronaldo
          </h2>
        </div>
      </div>
      <div className="bottom font-inter font-medium tracking-normal leading-none dark:text-textDark">
        <ul className="flex flex-col gap-6 list-none">
          {navLinks.map((elem, idx) => (
            <li key={idx} className="inline-block">
              <Link
                className="relative before:opacity-0 hover:before:opacity-100 inline-block p-2 text-inherit before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-secondary before:transition-all before:duration-300 hover:before:w-full"
                to={elem.path}
              >
                {elem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
