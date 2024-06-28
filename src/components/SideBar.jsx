import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCurrentPage } from "../store/slices/Product";
import DualRangeSlider from "./DualRangeSlider ";
import { getCategories } from "../store/slices/Categorie";
import { act } from "react-dom/test-utils";

const Saindbar = ({ ActiveBar, setActiveBar }) => {
  const [Active, setActive] = useState(0);
  const { data } = useSelector((state) => state.categorie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSelect, setActiveSelect] = useState("");

  const filterCategory = (id) => {
    dispatch(setCurrentPage(1));
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("category", `${id}`);
    const newQueryString = currentSearchParams.toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    navigate(newUrl);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const filterPrise = (e) => {
    dispatch(setCurrentPage(1));
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("ordering", `${e}`);
    const newQueryString = currentSearchParams.toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    navigate(newUrl);

    setActiveSelect(e);
  };

  const all = () => {
    setActive(0);
    navigate("");
  };

  return (
    <div
      className={`filter ${
        ActiveBar ? "active" : "close"
      } z-10  bg-[#d5e0da1a] flex flex-col w-[250px] rounded-tr-[30px] rounded-br-[30px] lg:rounded-[30px] p-2 border border-[#1DBE60]`}
    >
      <span
        onClick={() => setActiveBar((e) => !e)}
        className="fiiilter material-symbols-outlined page_info text-[#b2b4bc] text-[40px] "
      >
        {ActiveBar ? "close" : "page_info"}
      </span>
      <span
        onClick={() => setActiveBar((e) => !e)}
        className=" material-symbols-outlined  close1 text-[#b2b4bc] text-[40px] "
      >
        close
      </span>

      <h3 className="text-[30px] font-medium text-[#1DBE60]">Филтрация</h3>

      <ul className="w-[100%] flex-col pt-[15px] pb-[5px] flex gap-3">
        <li
          className={`   border ${ 
            Active == 0 && "e1253  "  
          }  cursor-pointer rounded-[20px]  border-[#1DBE60] py-2 px-4 font-medium text-[#b2b4bc]  `}
          key={0}
          onClick={() => {
            setActive(0);
            filterCategory("");
          }}
        >
          ALL
        </li>

        {data?.results?.map((item) => (
          <li
            onClick={() => {
              filterCategory(item.id);
              setActive(item.id);
            }}
            className={`border ${
              Active == item.id && "e1253 text-[#ff]"
            } cursor-pointer rounded-[20px] border-[#1DBE60] py-2 px-4 font-medium text-[#b2b4bc]`}
            key={item.id}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="clous pl-2 py-2 cursor-pointer  relative">
        <div className="flex items-center text-[#1DBE60]">
          <span className="material-symbols-outlined text-2xl  text-[#b2b4bc]">
            instant_mix
          </span>
          <span className="text-base text-[#b2b4bc] font-medium">
            Филтрация по ценам
          </span>
        </div>
        <div
          className={`${
            activeSelect == "-price" && "text-[#1DBE60]"
          } hover:text-[#1DBE60]  text-[#b2b4bc] pl-3 font-medium`}
          onClick={() => filterPrise("-price")}
        >
          По убыванию
        </div>
        <div
          className={`${
            activeSelect == "price" && "text-[#1DBE60]"
          } hover:text-[#1DBE60]  text-[#b2b4bc] pl-3 font-medium`}
          onClick={() => filterPrise("price")}
        >
          По возрастанию{" "}
        </div>
      </div>
      <div className="flex renge pt-[5px] pb-[10px] justify-center">
        <DualRangeSlider />
      </div>
      <div className="flex-1"></div>
      <button
        onClick={all}
        className="w-full border border-[#1DBE60] py-[10px] mb-[6px] rounded-[20px]
        text-[#b2b4bc]
        font-medium
        "
      >
        сбросить фильрации
      </button>
    </div>
  );
};

export default Saindbar;
