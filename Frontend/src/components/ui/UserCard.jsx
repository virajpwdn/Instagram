import React, { useState } from "react";
import NameCard from "./NameCard";
import ButtonComponent from "./ButtonComponent";
import IconComponent from "./IconComponent";
import RemixIconComponent from "./RemixIconComponent";

const UserCard = () => {
  const [isLikedPost, setIsLikedPost] = useState(false);

  const likeHandler = () =>{
    setIsLikedPost(!isLikedPost);
  }

  return (
    <div className="h-full">
      <div className="border-2 border-zinc-300 dark:border-backgroundDark">
        <div className="top flex items-center justify-between pt-2 px-2 pb-[4px]">
          <div className="left w-[70%]">
            <NameCard />
          </div>
          <div className="right flex items-center gap-4 w-[28%]">
            <ButtonComponent className={`bg-emerald-600 px-2 py-1 text-xs`}>
              Following
            </ButtonComponent>
            <IconComponent name="Ellipsis" size={20} />
          </div>
        </div>
        <div className="center ">
          <div className="image-continer relative w-full aspect-[4/5]">
            <img
              src="https://imgs.search.brave.com/Gu21Q-zRX8_9eRTY7zKTA3TDj5Nk5Csmku17KH-Ilfg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYmF0/c21hbi12aXJhdC1r/b2hsaS16YmtzOWgz/bjA0YXBmOW45Lmpw/Zw"
              alt="profile picture"
              className="h-auto max-h-[40rem] w-full object-cover object-top"
            />
          </div>
        </div>
        <div className="bottom h-10 py-5 flex justify-between items-center px-2">
          <div className="left flex gap-2  w-2/3">
            <div className="icon-text flex items-center gap-1">
              <RemixIconComponent
                // onClick={likeHandler}
                onDoubleClick={likeHandler}
                name={`${isLikedPost ? "heart-fill" : "heart-line"}`}
                className={`md:text-[1.8em] text-xl`}
                isActive={isLikedPost}
              />
              <h3 className="text-sm font-poppins font-semibold text-gray-500 dark:text-gray-100">
                500M
              </h3>
            </div>
            <div className="icon-text flex items-center gap-1">
              <RemixIconComponent
                name="chat-3-line"
                className="md:text-[1.5em] text-xl"
              />
              <h3 className="text-sm font-poppins font-semibold text-gray-500 dark:text-gray-100">
                500M
              </h3>
            </div>
            <div className="icon-text flex items-center gap-1">
              <RemixIconComponent
                name="telegram-2-line"
                className="md:text-[1.7em] text-xl"
                color="white"
              />
              <h3 className="text-sm font-poppins font-semibold text-gray-500 dark:text-gray-100">
                500M
              </h3>
            </div>
          </div>
          <div className="right">
            <div className="save-icon">
              <RemixIconComponent
                name="bookmark-line"
                className="rotate-[45deg] text-[1.5em]"
              />
            </div>
          </div>
        </div>
        <div className="caption"></div>
      </div>
    </div>
  );
};

export default UserCard;

// h-[24rem] md:h-[28rem] lg:h-[38rem]
