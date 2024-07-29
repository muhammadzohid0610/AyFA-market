import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../store/slices/Cart";
const Card = ({ item }) => {
  let navigate = useNavigate();
  const dispach = useDispatch();
  const [swaperHover, setswaperHover] = useState(false);
  const data = useSelector((state) => state.cart.data);
  const { name, price, images, image, id } = item;
  const [cart, setcart] = useState(data?.find((cart) => cart?.id == item.id));
  const addTooCart = () => {
    if (!cart) {
      setcart(true);
      dispach(
        addCart({
          data: { name, price, images, image, id, count: 1 },
        })
      );
    } else {
      setcart(false);
      dispach(removeCart({ id }));
    }
  };

  return (
    <div
      onClick={() => navigate(`/card/${id}`)}
      className="card cursor-pointer flex flex-col  bg-[#d5e0da1a] border rounded-[8px] border-[#1DBE60] p-4"
    >
      <div
        onMouseOver={() => setswaperHover(true)}
        onMouseLeave={() => setswaperHover(false)} 
         
        className="images w-[-webkit-fill-available] mx-auto rounded-[10px]"
      >
        {swaperHover ? (
          <Swiper
            autoplay={{
              delay: 500,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {item?.images?.map((image) => (
              <SwiperSlide key={image.id}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${image.image})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className="img w-[-webkit-fill-available] mx-auto rounded-[8px]"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
        )}
      </div>

      <h5 className="name pt-[15px] font-[500] text-[#262D29]">{item.name}</h5>
      <div className="flex-1 flex items-end pt-[10px]">
        <div className="flex justify-between w-full  items-center">
          <h6 className="text-[#1DBE60] font-[500]">
            Цена: <span className="text-[#262D29]">{+(String(price).split('.')[0])}</span>
          </h6>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addTooCart();
            }}
            className=" border rounded-[10px]  px-2 py-2 border-[#1DBE60] flex"
          >
            <span className="material-symbols-outlined text-[#b2b4bc]">
              {cart ? "close" : "shopping_cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
