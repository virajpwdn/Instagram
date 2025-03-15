import React from "react";

const NameCard = () => {
  return (
    <div className="flex items-center">
      <div className="w-[70px]">
        <div className="left h-16 w-16 border-[1px] border-zinc-200 rounded-full">
          <img
            src="https://imgs.search.brave.com/48zh3yLc6BacFsKwRIab9eS9Oueb06Yepez43Lu1hEU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80L2Ev/YS8xMDA5MTctMjU2/MHgxNDQwLWRlc2t0/b3AtaGQtY3Jpc3Rp/YW5vLXJvbmFsZG8t/d2FsbHBhcGVyLWlt/YWdlLmpwZw"
            alt="user profile picture"
            className="h-full w-full object-cover rounded-full p-[1px]"
          />
        </div>
      </div>
      <div className="right truncate">
        <h4 className="text-sm font-medium font-inter tracking-wide">
          Christiano
        </h4>
        <h4 className="text-xs font-medium font-inter tracking-wide">
          Christiano Ronaldo
        </h4>
      </div>
    </div>
  );
};

export default NameCard;
