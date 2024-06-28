import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 flex z-10 flex-1 pt-10  gap-[10px] justify-center items-center  max-w-[1200px] mx-auto w-full px-[15px] ">
      <img
        className="w-[100px]"
        src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
        alt=""
      />
    </div>
  );
};

export default Loading;
