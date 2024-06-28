import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../store/slices/User";
import Success from "../components/Success";
import { setError } from "../store/slices/User";
const label = "text-[#1DBE60] font-semibold text-[12px]";
const text = "вы успешно изменили данные профиля";

const PassordChange = () => {
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm();
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const { user } = useSelector((state) => state);
  const back = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 900);
    setTimeout(() => {
      navigate(-1);
    }, 900);
  };
  const changePassword = () => {
    if (watch().newPassword == watch().newPasswordСonfirmed) {
      const password = {
        old_password: watch().oldPasswor,
        new_password: watch().newPassword,
      };
      dispatch(changeUserPassword(password, back));
    } else {
      setErrorNewPassword(true);
    }
  };

  const clear = () =>{
    dispatch(setError(false))

    console.log(user.error);
    navigate(-1)
  }

  return (
    <div className="flex-1">
      <div className="profile bg-[#1b1d31] w-full flex-1 px-[10px]">
        <div className="w-[100vw] z-[0] bg-[#1b1d31ad] h-[100vh] absolute top-0 left-0"></div>{" "}
        {popup ? (
          <Success text={text} />
        ) : (
          <div
            className="bg-[#d5e0da1a] relative  z-10 max-w-[500px] max-h-[700px] h-[60vh] px-7 py-5 mx-auto rounded-[24px] flex flex-col"
          >
            <span
              onClick={() => navigate(-1)}
              className="absolute top-7 right-5 text-[#b2b4bc] material-symbols-outlined"
            >
              close
            </span>
            <h3 className="text-[#1DBE60] text-3xl font-semibold pb-5">
              Изменения пароль
            </h3>
            <div className="flex-1 flex flex-col gap-6 ">
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">
                  Ведите старый пароль
                </h4>

                <input
                  {...register("oldPasswor", { required: false })}
                  placeholder="пароль"
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.old_password}</span>
              </div>
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">
                  Ведите новый пароль
                </h4>

                <input
                  {...register("newPassword", { required: false })}
                  placeholder="пароль"
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.new_password}</span>
              </div>
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">
                  Подтвердите новый пароль
                </h4>

                <input
                  {...register("newPasswordСonfirmed", { required: false })}
                  placeholder="пароль"
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>
                  {errorNewPassword && "Введенный пароль не совпадает с новым"}
                </span>
              </div>
            </div>
            <span className={`${label}`}>{user?.error?.massage}</span>

            <div className="button flex justify-between">
              <button
                onClick={handleSubmit(changePassword)}
                className="border border-[#1DBE60] py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
              >
                изменить дынные
              </button>
              <button
                onClick={clear}
                className="border border-[#1DBE60] py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
              >
                отменить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassordChange;
