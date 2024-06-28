import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, setError } from "../store/slices/Orders";
import { removeCartApp } from "../store/slices/Cart";
const stayleIput =
  "w-full flex border-[#1DBE60] gap-2 border rounded-[30px] p-[10px]";
const label = "text-[red] font-semibold text-[12px]";

const Purchase = ({ setorderState, setSuccess }) => {
  const dispach = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { data } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.orders);
  const items = data.map((item) => ({
    product: item.id,
    quantity: item.count,
  }));

  const setFunc = () => {
    setorderState(false);
    setSuccess(false);
    dispach(removeCartApp());
    dispach(setError(false));
  };

  let a = () => {
    const orders = {
      items,
      name: watch().name,
      email: watch().email,
      phone: watch().phone,
      address: watch().address,
      home: watch().home,
      status: "waiting",
    };
    dispach(setOrders(orders, setFunc));
  };

  const ss = () => {
    dispach(setError(false));
    setorderState(false);
  };

  return (
    <div className="fixed z-10  bg-[#d5e0da1aba] px-4 top-0 left-0 w-full  h-[100vh]">
      <div className="border border-[#1DBE60] bg-[#fff] max-w-[400px]  mt-[100px] p-4  mx-auto rounded-[24px] flex flex-col relative">
        <h3 className="text-[#b2b4bc] text-3xl font-semibold">
          Заказать товар
        </h3>

        <span
          onClick={ss}
          className="top-4 right-4 absolute material-symbols-outlined text-2xl text-[#b2b4bc]"
        >
          close
        </span>
        <form
          onSubmit={handleSubmit(a)}
          className="pt-[30px] flex flex-col gap-5 flex-1"
        >
          <div>
            <div className={`${stayleIput} relative`}>
              <span className="material-symbols-outlined text-[#b2b4bc]">
                email
              </span>
              <input
                {...register("email", { required: false })}
                type="email"
                placeholder="Email"
                className="flex-1 font-semibold bg-[#d5e0da1a] text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <span className={`${label}`}>{error?.email}</span>
          </div>
          <div>
            <div className={`${stayleIput} relative`}>
              <span className="material-symbols-outlined text-[#b2b4bc]">
                person
              </span>
              <input
                {...register("name", { required: false })}
                type="text"
                placeholder="Name"
                className="flex-1 font-semibold bg-[#d5e0da1a] text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <span className={`${label}`}>{error?.name}</span>
          </div>
          <div>
            <div className={`${stayleIput} relative`}>
              <span className="material-symbols-outlined text-[#b2b4bc]">
                call
              </span>
              <input
                {...register("phone", { required: false })}
                type="tel"
                placeholder="Phone"
                className="flex-1 font-semibold bg-[#d5e0da1a] text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <span className={`${label}`}>{error?.phone}</span>
          </div>
          <div>
            <div className={`${stayleIput} relative`}>
              <span className="material-symbols-outlined text-[#b2b4bc]">
                location_on
              </span>
              <input
                {...register("address", { required: false })}
                type="text"
                placeholder="Address"
                className="flex-1 font-semibold bg-[#d5e0da1a] text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <span className={`${label}`}>{error?.address}</span>
          </div>
          <div>
            <div className={`${stayleIput} relative`}>
              <span className="material-symbols-outlined text-[#b2b4bc]">
                home
              </span>
              <input
                {...register("home", { required: false })}
                type="text"
                placeholder="Home"
                className="flex-1 font-semibold bg-[#d5e0da1a] text-[#b2b4bc] placeholder:text-[#b2b4bc]"
              />
            </div>
            <span className={`${label}`}>{error?.home}</span>
          </div>
          <button
            type="submit"
            className="bg-[#1DBE60]  rounded-[30px] text-white text-base font-semibold p-[10px] "
          >
            Order a product
          </button>
          <span className={`${label} mt-[30px]`}>{error?.massage}</span>
        </form>

        {loading.payload && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#d5e0da1aad] rounded-[24px] absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            <img
              className="w-[100px]"
              src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;
