import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  removeProduct,
  setCurrentPage,
  setFilter,
} from "../store/slices/Product";
import { getCategories } from "../store/slices/Categorie";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DualRangeSlider from "./DualRangeSlider ";

const Filter = () => {
  const [activeSelect, setActiveSelect] = useState(false);
  const dispatch = useDispatch();
  const [Active, setActive] = useState(0);
  const { data } = useSelector((state) => state.categorie);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const navigate = useNavigate();

  const filterPrise = (e) => {
    dispatch(setCurrentPage(1));
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("ordering", `${e}`);
    const newQueryString = currentSearchParams.toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    navigate(newUrl);
  };

  const filterCategory = (id) => {
    dispatch(setCurrentPage(1));
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("category", `${id}`);
    const newQueryString = currentSearchParams.toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    navigate(newUrl);
  };

  return (
    <div className="filter flex  flex-col items-start">
      {/* <ul className="w-[100%] pb-[15px] flex gap-3">
        <li
          className={`border ${
            Active == 0 && "bg-[#1DBE60]"
          }  cursor-pointer rounded-[20px] border-[#1DBE60] py-2 px-4 font-medium text-[#b2b4bc] `}
          key={0}
          onClick={() => setActive(0)}
        >
          <Link to={`/`}>ALL</Link>
        </li>
        {data?.results?.map((item) => (
          <li
            onClick={() => {
              filterCategory(item.id);
              setActive(item.id);
            }}
            className={`border ${
              Active == item.id && "bg-[#1DBE60]"
            } cursor-pointer rounded-[20px] border-[#1DBE60] py-2 px-4 font-medium text-[#b2b4bc]`}
            key={item.id}
          >
            {item.name}
          </li>
        ))}
      </ul> */}
      <div className="flex justify-between items-end w-full px-3">
        <div
          onClick={() => setActiveSelect(!activeSelect)}
          className="clous  cursor-pointer flex gap-1 items-center relative"
        >
          <span className="material-symbols-outlined text-2xl  text-[#b2b4bc]">
            instant_mix
          </span>
          <span className="text-base text-[#b2b4bc]">Филтрация по ценам</span>
          <div
            className={`${
              !activeSelect && "hidden"
            } absolute left-[105%] z-10 p-1 top-3 bg-[#b2b4bc] w-[110%]`}
          >
            <div onClick={() => filterPrise("-price")}>По убыванию</div>
            <div onClick={() => filterPrise("price")}>По возрастанию </div>
          </div>
        </div>
        <div className="pl-2">
          
        </div>
      </div>
    </div>
  );
};

export default Filter;
