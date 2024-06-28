import React from "react";

const Logout = ({ setstate }) => {
  const a = () => setstate(false);

  const clearData = () => {
    localStorage.clear();
    setstate(false);
    window.location.replace("/");
  };
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-[100vh] flex justify-center items-center px-[15px]">
      <div className="relative flex gap-6 flex-col justify-center items-center max-w-[400px] w-full h-[300px] bg-[#010101] rounded-[30px] p-4">
        <span
          onClick={a}
          className="absolute right-4 top-4 text-[#b2b4bc] material-symbols-outlined"
        >
          close
        </span>
        <h2 className="text-xl text-[#b2b4bc]">
        ты уверен, что хочешь выйти?
        </h2>
        <div className="flex gap-3">
          <button
            onClick={clearData}
            className="w-[100px] text-[#b2b4bc] font-medium py-1 rounded-[10px] border border-[#1DBE60]"
          >
           да
          </button>
          <button
            onClick={a}
            className="w-[100px] text-[#b2b4bc] font-medium py-1 rounded-[10px] bg-[#1DBE60]"
          >
            нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
