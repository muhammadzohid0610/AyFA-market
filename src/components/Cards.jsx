import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addItemLast,
  getProducts,
  setError,
  setLoading,
  setCurrentPage,
} from "../store/slices/Product";
import axios from "axios";
import { API } from "../store/hook";

const Cards = () => {
  let params = useLocation();
  const { data, loading } = useSelector((state) => state.product);
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [totalCount, settotalCount] = useState(0);
  const [next, setNext] = useState();
  const AfterGet = (data) => {
    settotalCount(data?.count);
    setNext(data?.next);
  };

  const handleNextPage = () => {
    axios
      .get(`${API}/product/${params.search ? params.search : ""}`, {
        params: { page_size: 12, page: product.currentPage  + 1},
      })
      .then((response) => {
        dispatch(addItemLast(response.data?.results));
        AfterGet(response.data);
        dispatch(setCurrentPage(product.currentPage + 1));
      })
      .catch((error) => dispatch(setError(error?.response?.data)))
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    setCurrentPage(1)
    dispatch(getProducts(params.search, AfterGet));
  }, [params]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="diiiv relative flex-1">
      <div className="cards pb-[24px]">
        {product?.data?.results?.map((card) => (
          <Card item={card} key={card.id} />
        ))}
      </div>
      {!data?.results?.length && !loading && (
        <h1 className="flex mt-[50px] sm:text-4xl text-2xl text-[#1DBE60] text-center justify-center">
          нет товваров
        </h1>
      )}
      {loading ? (
        <div className="z-10 flex-1 pt-10 flex  justify-center items-center  max-w-[1200px]  mx-auto w-full px-[15px] ">
          <img
            className="w-[100px]"
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt=""
          />
        </div>
      ) : (
        <div className="flex pt-[10px] justify-center">
          {next !== null && (
            <button
              onClick={handleNextPage}
              className="border border-[#1DBE60] px-5 py-2 rounded-[20px] text-[#b2b4bc]"
            >
          показать ещё
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;
