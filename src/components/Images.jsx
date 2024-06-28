import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

function Images() {
  return (
    <div className="Images my-[25px]  cursor-pointer">
      <Swiper

        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon1.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon2.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon3.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon4.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon5.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon6.jpg')` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="img"
            style={{ backgroundImage: `url('/svg/fon7.jpg')` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default Images;
