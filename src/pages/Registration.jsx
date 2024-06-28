import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registration, setError } from "../store/slices/User";
const label = "text-[#1DBE60] font-semibold text-[12px]";
const inputRadio = "w-full h-full opacity-0 absolute left-0 top-0";
const stayleIput =
  "w-full flex border-[#1DBE60] gap-2 border rounded-[30px] p-[10px]";
const Registration = () => {
  const { user } = useSelector((state) => state);
  const dispach = useDispatch();

  const [stateInput, setStateInput] = useState(false);
  const [stateInput2, setStateInput2] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const { loading } = useSelector((state) => state.user);

  const [passwors, setpasswors] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    reset();
  }, []);

  const createUser = () => {
    if (watch().password != watch().conPassword) {
      setpasswors("the identity of these passwords is not valid");
      return;
    }
    if (!avatar) {
      setErrorAvatar(true);
      return;
    }
    const user = {
      email: watch().email,
      phone: watch().phone,
      first_name: watch().firstName,
      last_name: watch().lastName,
      password: watch().password,
      avatar: avatar ? avatar : "",
    };
    setpasswors("")
    setErrorAvatar(null)
    dispach(registration(user));
  };

  const handelFileChange = (e) => {
    if (e.target.files.length) setAvatar(e.target.files[0]);
  };
  return (
    <>
      <div className="auth bg-[#1b1d31] w-full  h-[100vh] px-[10px]">
        <div className="bg-[#d5e0da1a] max-w-[400px] px-7 py-10 mx-auto rounded-[24px] flex flex-col relative">
          <h3 className="text-[#b2b4bc] sm:text-3xl text-2xl absolute top-2 left-3 font-semibold">
            Зарегистрироваться
          </h3>
          <form
            onSubmit={handleSubmit(createUser)}
            className="pt-[20px] flex flex-col gap-5 flex-1"
            encType="multipart/form-data"
          >
            <div>
              <label className={` h-[100px]  block custom-file-input`}>
                <input onChange={handelFileChange} type="file" hidden />
                <div className="custom-file-input-label flex flex-col items-center">
                  {avatar ? (
                    <div
                      style={{
                        backgroundImage: `url('${URL.createObjectURL(
                          avatar
                        )}')`,
                      }}
                      className="material-symbols-outlined w-[70px] border border-[#1DBE60] h-[70px] bg-center bg-no-repeat bg-cover rounded-full text-[#1DBE60]"
                    ></div>
                  ) : (
                    <span
                      to="/"
                      className="text-[70px] material-symbols-outlined text-[#b2b4bc] "
                    >
                      account_circle
                    </span>
                  )}

                  {errorAvatar ? (
                    <span className={label}>обязатеоно нужно выбрать аву</span>
                  ) : (
                    <label>{avatar ? "выбрать аву" : "Фотка авы"}</label>
                  )}
                </div>
              </label>
            </div>
            <div>
              <div className="w-full flex  gap-4  relative ">
                <input
                  autoComplete="off"
                  {...register("firstName", { required: false })}
                  placeholder="Имя"
                  className="border-[#1DBE60] w-[50%] border rounded-[30px] p-[10px] pl-4 flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
                <input
                  {...register("lastName", { required: false })}
                  placeholder="Фамилия"
                  className="border-[#1DBE60] w-[50%] border rounded-[30px] p-[10px] pl-4 flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
              </div>
              <span className={`${label}`}>{user?.error?.first_name}</span>
            </div>
            <div>
              <div className={`${stayleIput} relative`}>
                <span
                  onClick={() => setStateInput2(!stateInput2)}
                  className="material-symbols-outlined text-[#b2b4bc]"
                >
                  mail
                </span>
                <input
                  {...register("email", { required: false })}
                  type="email"
                  placeholder="Email"
                  className="flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
              </div>
              <span className={`${label}`}>{user?.error?.email}</span>
            </div>
            <div>
              {" "}
              <div className={`${stayleIput} relative`}>
                <span
                  onClick={() => setStateInput2(!stateInput2)}
                  className="material-symbols-outlined text-[#b2b4bc]"
                >
                  call
                </span>
                <input
                  {...register("phone", { required: false })}
                  type="tel"
                  placeholder="Номер телефона"
                  className="flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
              </div>
              <span className={`${label}`}>{user?.error?.phone}</span>
            </div>

            <div>
              {" "}
              <div className={`${stayleIput} relative`}>
                <span
                  onClick={() => setStateInput(!stateInput)}
                  className="material-symbols-outlined text-[#b2b4bc]"
                >
                  {stateInput ? "visibility" : "visibility_off"}
                </span>
                <input
                  {...register("password", { required: false })}
                  type={stateInput ? "text" : "password"}
                  placeholder="Пароль"
                  className="flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
              </div>
              <span className={`${label}`}>{user?.error?.password}</span>
            </div>
            <div>
              {" "}
              <div className={`${stayleIput} relative`}>
                <span
                  onClick={() => setStateInput2(!stateInput2)}
                  className="material-symbols-outlined text-[#b2b4bc]"
                >
                  {stateInput2 ? "visibility" : "visibility_off"}
                </span>
                <input
                  {...register("conPassword", { required: false })}
                  type={stateInput2 ? "text" : "password"}
                  placeholder="Повтарите пароль"
                  className="flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
                />
              </div>
              <span className={`${label}`}>{passwors}</span>
            </div>

            <button
              type="submit"
              className="bg-[#1DBE60]  rounded-[30px] text-white text-base font-semibold p-[10px] "
            >
              log in
            </button>
          </form>

          <div>
            <div className="flex justify-between pt-5">
              <span className="text-[#b2b4bc]">Увас уже есть аккаунт?</span>
              <span className="text-[#1DBE60]">
                {" "}
                <Link to={"/login"}> Войти</Link>
              </span>
            </div>
          </div>

          <div onClick={() => dispach(setError(false))}>
            <Link
              to="/"
              className="material-symbols-outlined text-[#b2b4bc] absolute right-4 top-4"
            >
              close
            </Link>
          </div>
        </div>
      </div>
      {loading?.payload ? (
        <div className="absolute bg-[#d5e0da1a7f] top-0 left-0 flex z-10 pt-10  justify-center items-start h-[100vh] w-[100vw] px-[15px] ">
          <img
            className="w-[100px] mt-[250px]"
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt=""
          />
        </div>
      ) : null}
    </>
  );
};

export default Registration;
