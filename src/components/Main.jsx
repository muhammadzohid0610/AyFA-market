import React, { useState } from "react";
import Cards from "./Cards";
import Images from "./Images";
import Filter from "./Filter";
import Saindbar from "./SideBar";
const Main = () => {
  const [ActiveBar, setActiveBar] = useState(false);
  return (
    <main className="flex-1  flex-col max-w-[1230px] w-full mx-auto px-[15px]">
      <Images />
      {/* <Filter /> */}
      <span
        onClick={() => setActiveBar((e) => !e)}
        className="fiiilter1 mb-4 h-10 material-symbols-outlined text-[#fff] text-[40px] bg-[#1DBE60] rounded-[10px]"
      >
        {!ActiveBar && "page_info "}
      </span>
      <div className="flex gap-4 relative">
        <Saindbar ActiveBar={ActiveBar} setActiveBar={setActiveBar} />
        <Cards />
      </div>
  
    </main>
  );
};

export default Main;
