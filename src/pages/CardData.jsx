import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/slices/Product";
import Loading from "../components/Loading";
import { addCart, removeCart } from "../store/slices/Cart";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
const CardData = () => {
  const Params = useParams();
  const { oneData, loading } = useSelector((state) => state.product);
  console.log(oneData);
  const dispatch = useDispatch();
  const [bigImage, setbigImage] = useState("");
  useEffect(() => {
    dispatch(getProduct({ id: Params.id }));
  }, []);
  const setImage = (image) => setbigImage(image);

  const data = useSelector((state) => state.cart.data);
  const { name, price, images, image, id } = oneData;
  const [cart, setcart] = useState(
    data?.find((cart) => cart?.id == oneData.id)
  );

  const addTooCart = () => {
    if (!cart) {
      setcart(true);
      dispatch(
        addCart({
          data: { name, price, images, image, id: +Params.id, count: 1 },
        })
      );
    } else {
      setcart(false);
      dispatch(removeCart({ id: id }));
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="flex-1 
        flex justify-center items-center
         mt-[100px]"
        >
          <img
            className="w-[100px]"
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt=""
          />
        </div>
      ) : (
        <div className="CardData boxes relative flex flex-1 pt-10  gap-[2.5%]  max-w-[1200px] mx-auto w-full px-[15px] ">
          <Link
            to="/"
            className="text-[#b2b4bc] flex items-center text-[24px] absolute  top-[-10px] left-[20px]"
          >
            <span className="material-symbols-outlined text-[30px]">
              arrow_back
            </span>
            Назад
          </Link>
          <div
            style={{
              backgroundImage: `url('${bigImage ? bigImage : oneData?.image}')`,
            }}
            className="img box1 rounded-[10px] border-[#1DBE60] border"
          ></div>

          <div className="imagesMin box2 bg-[#d5e0da1a] ">
            {oneData?.images?.map((image) => (
              <div
                onClick={() => setImage(image?.image)}
                key={image.id}
                className="img  cursor-pointer"
                style={{ backgroundImage: `url('${image?.image}')` }}
              ></div>
            ))}
          </div>

          <div className="content box3 bg-[#d5e0da1a] border-[#1DBE60] border rounded-[10px] p-4 flex flex-col justify-end">
            <h1 className="w-full py-[10px] text-[#b2b4bc] font-medium pb-[20px] ">
              <span className="text-[#1DBE60]">Цена:</span> {oneData?.price}
              USD
            </h1>
            <button
              onClick={() => addTooCart()}
              className="border flex item-center justify-center gap-2 w-full py-[10px] border-[#1DBE60] rounded-[10px] text-[#b2b4bc] font-medium"
            >
              {cart ? "Убрать из карзины" : "Добавить в корзину  "}

              <span className="material-symbols-outlined ">
                {cart ? "close" : "shopping_cart"}
              </span>
            </button>
            <div className="Images mt-[10px] cursor-pointer">
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
          </div>
          <div className="data box4 bg-[#d5e0da1a] relative  rounded-[10px] p-4 flex flex-col justify-start items-start border border-[#1DBE60]">
            <h4> {oneData?.name}</h4>
            <div className="attributes max-h-[480px] w-full overflow-y-scroll">
              <table className="w-full ">
                <thead>
                  <tr>
                    <td>Дополнительная информация</td>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {oneData?.attributes?.map((item) => (
                    <tr key={item.id} className="w-full  flex ">
                      <td className="w-[50%]">
                        <span>
                          <span>{item.name}</span>
                        </span>
                      </td>
                      <td className="w-[50%] text-[#b2b4bc]">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h5 className="text-[#b2b4bcfff]">
              <span className="text-[#1DBE60] text-[26px] pr-1">Описания:</span>{" "}
              {oneData?.description}
            </h5>

            <div className="tags mt-4">
              {oneData?.tags ? (
                <span className="tag text-[26px] items-end flex flex-wrap gap-x-2 text-[#1DBE60] font-medium">
                  tags:
                  {oneData?.tags?.map((item) => (
                    <span
                      key={item?.id}
                      className="text-xl text-[#b2b4bcfff] font-normal"
                    >
                      #{item?.name}
                    </span>
                  ))}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardData;
