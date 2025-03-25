import React from "react";
import RemixIconComponent from "../../ui/RemixIconComponent";

const Middle = () => {
  return (
    <div className="py-4 px-6 border-2">
      <div className="user-details flex gap-6">
        <div className="section-1">
          <div className="img-div h-20 w-20 rounded-full">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://imgs.search.brave.com/Gu21Q-zRX8_9eRTY7zKTA3TDj5Nk5Csmku17KH-Ilfg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYmF0/c21hbi12aXJhdC1r/b2hsaS16YmtzOWgz/bjA0YXBmOW45Lmpw/Zw"
              alt="profile photo"
            />
          </div>
        </div>
        <div className="section-2 w-full">
          <div className="top flex gap-2 items-center">
            <div className="left">
              <h2 className="text-xl font-semibold">Virat Kholi</h2>
            </div>
            <div className="right">
              <RemixIconComponent name="verified-badge-fill" className="text-blue-500 dark:text-blue-500"/>
            </div>
          </div>
          <div className="bottom flex gap-2 justify-between">
                <div className="left flex items-start justify-center flex-col">
                    <p className="text-2xl font-semibold sm:font-medium">12</p>
                    <p className="text-sm -mt-2">posts</p>
                </div>
                <div className="middle flex items-start justify-center flex-col">
                    <p className="text-2xl font-semibold sm:font-medium">1M</p>
                    <p className="text-sm -mt-2">followers</p>
                </div>
                <div className="right flex items-start justify-center flex-col">
                    <p className="text-2xl font-semibold sm:font-medium">180</p>
                    <p className="text-sm -mt-2">following</p>
                </div>
          </div>
        </div>
      </div>
      <div className="caption leading-none px-2 mt-4 font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima culpa.
      </div>
    </div>
  );
};

export default Middle;
// </RemixIconComponent>
