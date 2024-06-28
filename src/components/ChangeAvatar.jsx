import React, { useState } from "react";

const ChangeAvatar = ({ data, avatar, setAvatar }) => {
  const handelFileChange = (e) => {
    if (e.target.files.length) setAvatar(e.target.files[0]);
  };

  return (
    <div className="ChangeAvatar text-center  mb-2">
      <div className=" w-[70px]  mx-auto">
        {data?.avatar || avatar ? (
          avatar ? (
            <div
              className="rounded-full imgee border border-[#1DBE60] w-[70px] h-[70px]"
              style={{
                backgroundImage: `url('${URL.createObjectURL(avatar)}')`,
              }}
            ></div>
          ) : (
            <div
              className="rounded-full imgee border border-[#1DBE60] w-[70px] h-[70px]"
              style={{ backgroundImage: `url('${data?.avatar}')` }}
            ></div>
          )
        ) : (
          <span className="absolute top-7 right-5 text-[#b2b4bc] material-symbols-outlined">
            close
          </span>
        )}
      </div>
      <label className={` relative custom-file-input`}>
        <input onChange={handelFileChange} type="file" hidden />
        <span className="custom-file-input-label font-medium text-[#1DBE60] transition duration-150 ease-in-out hover:underline ">
          {avatar ? "фотка выбрано" : "изменить аву"}
        </span>
      </label>
    </div>
  );
};

export default ChangeAvatar;
