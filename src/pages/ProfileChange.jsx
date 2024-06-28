import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeUserData, getProfile, setError } from "../store/slices/User";
import Success from "../components/Success";
import ChangeAvatar from "../components/ChangeAvatar";
const label = "text-[#1DBE60] font-semibold text-[12px]";
const text = "вы успешно изменили данные профиля";
const ProfileChange = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const { user } = useSelector((state) => state);
  const [userLocal, setUserLocal] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [avatar, setAvatar] = useState(null);

  const back = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      navigate(-1);
    }, 900);
  };

  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    dispatch(getProfile(userLocal?.id));
  }, []);

  const changeUser = (data) => {
    const newUser = {
      email: data.email,
      phone: data.phone,
      first_name: data.firsrName,
      last_name: data.lastName,
      password: user.data?.password,
      avatar: avatar ? avatar : "",
    };

    dispatch(changeUserData(newUser, userLocal?.id, back));
    dispatch(setError(false));
  };

  useEffect(() => {
    setValue("email", user.data?.email);
    setValue("phone", user.data?.phone);
    setValue("lastName", user.data?.last_name);
    setValue("firsrName", user.data?.first_name);
  }, []);
  return (
    <div className="flex-1">
      <div className="profile bg-[#1b1d31] w-full flex-1 px-[10px]">
        <div className="w-[100vw] z-[0] bg-[#1b1d31ad] h-[100vh] absolute top-0 left-0"></div>

        <div className="w-[100vw] z-[0] bg-[#1b1d31ad] h-[100vh] absolute top-0 left-0"></div>
        {popup ? (
          <Success text={text} />
        ) : (
          <div className="bg-[#d5e0da1a] relative  z-10 max-w-[500px] h-[600px]  px-7 py-5 mx-auto rounded-[24px] flex flex-col">
            <span
              onClick={() => {
                navigate(-1);
                dispatch(setError(false));
              }}
              className="absolute top-7 right-5 text-[#b2b4bc] material-symbols-outlined"
            >
              close
            </span>
            <h3 className="text-[#1DBE60] text-2xl font-semibold pb-5">
              Изменения профиля
            </h3>
            <ChangeAvatar
              avatar={avatar}
              setAvatar={setAvatar}
              data={user.data}
            />

            <div className="flex-1 flex flex-col gap-6 ">
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">Имя</h4>

                <input
                  {...register("firsrName", { required: false })}
                  type="text"
                  placeholder={"Пока пусто"}
                  defaultValue={user.data?.first_name}
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.first_name}</span>
              </div>
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">Фамилия</h4>

                <input
                  {...register("lastName", { required: false })}
                  type="text"
                  placeholder={"Пока пусто"}
                  defaultValue={user.data?.last_name}
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.last_name}</span>
              </div>
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">
                  Номе телефона{" "}
                </h4>

                <input
                  {...register("phone", { required: false })}
                  type="text"
                  placeholder={"Пока пусто"}
                  defaultValue={user.data?.phone}
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.phone}</span>
              </div>
              <div className="border-b border-[#1DBE60]">
                <h4 className="text-l text-[#b2b4bc] font-medium">Email</h4>

                <input
                  {...register("email", { required: false })}
                  type="email"
                  placeholder={"Пока пусто"}
                  defaultValue={user.data?.email}
                  className="flex-1 pb-1 bg-[#d5e0da1a] w-full text-xl text-[#858892] font-normal placeholder:text-[#b2b4bc]"
                />
                <span className={`${label}`}>{user?.error?.email}</span>
              </div>
            </div>
            <span className={`${label}`}>{user?.error?.massage}</span>

            <div className="button flex justify-between">
              <button
                onClick={handleSubmit(changeUser)}
                className="border border-[#1DBE60] py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
              >
                изменить дынные
              </button>

              <button
                onClick={() => {
                  navigate(-1);
                  dispatch(setError(false));
                }}
                className="border border-[#1DBE60]  py-2 w-[170px] rounded-[24px] text-[#b2b4bc] font-medium"
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

export default ProfileChange;
