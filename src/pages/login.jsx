import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login, setError } from "../store/slices/User";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
const label = "text-[#1DBE60] font-semibold";
const stayleIput =
  "w-full flex border-[#1DBE60] gap-2 border rounded-[30px] p-[10px]";
const Login = () => {
  const [stateInput, setStateInput] = useState(false);
  const dispach = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state);

  const { register, handleSubmit, watch, reset } = useForm();

  const createUser = () => {
    const user = {
      email: watch().email,
      password: watch().password,
    };
    dispach(login(user));
  };

  return (
    <>
      <div className="auth bg-[#1b1d31] w-full h-[100vh] px-[10px]">
        <div className="bg-[#d5e0da1a] max-w-[400px] max-h-[700px] h-[60vh] px-7 py-10 mx-auto rounded-[24px] flex flex-col relative">
          <h3 className="text-[#b2b4bc] text-3xl font-semibold	">Войти</h3>
          <form
            onSubmit={handleSubmit(createUser)}
            className="pt-[30px] flex flex-col flex-1"
          >
            <div className={`${stayleIput} relative`}>
              <input
                {...register("email", { required: false })}
                type="email"
                placeholder="Email"
                className="flex-1 font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <label className={label}>{user.error?.email}</label>

            <div className={`${stayleIput} mt-[20px] relative`}>
              <span
                onClick={() => setStateInput(!stateInput)}
                className="material-symbols-outlined text-[#b2b4bc]"
              >
                {stateInput ? "visibility" : "visibility_off"}
              </span>
              <input
                {...register("password", { required: false })}
                type={stateInput ? "text" : "password"}
                placeholder="Password"
                className="flex-1  font-semibold text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <label className={label}>{user.error?.password}</label>

            <button
              type="submit"
              className="bg-[#1DBE60] mt-[20px]  rounded-[30px] text-[#b2b4bc] text-base font-semibold p-[10px] "
            >
              Войти
            </button>
            <span className={`${label} mt-[30px]`}>{user.error?.massage}</span>
          </form>

          <div>
            <div className="flex justify-between pt-5">
              <span className="text-[#b2b4bc]">У вас нет учетной записи?</span>
              <span className="text-[#1DBE60]">
                <Link to={"/registration"}>Регистрация</Link>
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
        <div className="absolute bg-[#d5e0da1af0] top-0 left-0 flex z-10 pt-10  justify-center items-start h-[100vh] w-[100vw] px-[15px] ">
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

export default Login;
