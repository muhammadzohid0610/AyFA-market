import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

const Profile = () => {
  const [state, setstate] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  let navigate = useNavigate();

  return (
    <div className="profile bg-[#1b1d31] w-full flex-1 px-[10px]">
      <div className="w-[100vw] z-[0] bg-[#3a3a3ce6] h-[100vh] absolute top-0 left-0"></div>
      {state ? (
        <Logout setstate={setstate} />
      ) : (
        <div className="bg-[#000000eb] relative  z-10 max-w-[500px]  h-[600px]  px-7 py-5 mx-auto rounded-[24px] flex flex-col">
          <span
            onClick={() => navigate("/")}
            className="absolute z-10 top-7 right-5 text-[#b2b4bc] material-symbols-outlined"
          >
            close
          </span>
          <span
            className="absolute cursor-pointer z-10 top-7 left-5 text-[#1DBE60] items-center flex"
            onClick={() => {
              setstate(true);
            }}
          >
            <span className=" material-symbols-outlined">logout</span>
            logout
          </span>

          <div className=" w-[100px] mx-auto">
            {user?.avatar ? (
              <img
                className="rounded-full border border-[#1DBE60] w-full"
                src={user?.avatar}
                alt=""
              />
            ) : (
              <span className="text-[100px] text-[#b2b4bc] material-symbols-outlined">
                account_circle
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-6 ">
            <div className="border-b border-[#1DBE60]">
              <h4 className="text-l text-[#b2b4bc] font-medium">Имя</h4>
              <h5 className="text-xl text-[#858892] font-normal pb-1">
                {user?.first_name}
              </h5>
            </div>
            <div className="border-b border-[#1DBE60]">
              <h4 className="text-l text-[#b2b4bc] font-medium">фамилия</h4>
              <h5 className="text-xl text-[#858892] font-normal pb-1">
                {user?.last_name}
              </h5>
            </div>
            <div className="border-b border-[#1DBE60]">
              <h4 className="text-l text-[#b2b4bc] font-medium">
                Номер телефона
              </h4>
              <h5 className="text-xl text-[#858892] font-normal pb-1">
                {user?.phone}
              </h5>
            </div>
            <div className="border-b border-[#1DBE60]">
              <h4 className="text-l text-[#b2b4bc] font-medium">
                Адрес электроный почты
              </h4>
              <h5 className="text-xl text-[#858892] font-normal pb-1">
                {user?.email}
              </h5>
            </div>
          </div>
          <div className="button flex justify-between">
            <Link
              to="/profile/change"
              className="border text-center border-[#1DBE60] py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
            >
              изменить профиль
            </Link>
            <Link
              to="/profile/change-assword"
              className="border text-center border-[#1DBE60] py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
            >
              изменить пароль
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
