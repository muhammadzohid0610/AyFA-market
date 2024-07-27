import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, setCurrentPage } from "../store/slices/Product";
import Logout from "./Logout";

const ulStyle = "material-symbols-outlined text-3xl text-[#b2b4bc]";

const Header = () => {
  const [state, setstate] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  )

  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const linkRef = useRef(null);
  const [StateSearch, setStateSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { data } = useSelector((state) => state.cart);
  const { search } = useParams();
  const [searchValue, setsearchValue] = useState(search ? search : "");

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        searchRef.current &&
        linkRef.current &&
        !(
          searchRef.current.contains(e.target) ||
          linkRef.current.contains(e.target)
        )
      ) {
        setStateSearch(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [StateSearch]);

  const navigate = useNavigate();

  let timeId = 0;

  useEffect(() => {
    dispatch(setCurrentPage(1));
    timeId = setTimeout(() => {
      const currentSearchParams = new URLSearchParams(window.location.search);
      currentSearchParams.set("search", `${searchValue}`);
      const newQueryString = currentSearchParams.toString();
      const newUrl = `${window.location.pathname}?${newQueryString}`;
      navigate(newUrl);
    }, 500);

    return () => clearTimeout(timeId);
  }, [searchValue]);

  return (
    <>
      <header>
        <div className="max-w-[1200px] px-[30px] items-center flex justify-between mx-auto py-6 relative">
          <h3 className="text-5xl cursor-pointer font-medium text-[#22a357] ">
            <Link to="/"> AYFA</Link>
          </h3>

          <nav>
            <ul className="flex gap-8 items-center flex-wrap">
              {screenWidth < 550 && (
                <li
                  ref={linkRef}
                  onClick={() =>
                    screenWidth < 550 && setStateSearch(!StateSearch)
                  }
                  className="flex flex-col cursor-pointer items-center justify-between"
                >
                  <span className={`${ulStyle} text-[#b2b4bc]`}>
                    {!StateSearch ? "search" : "close"}
                  </span>
                </li>
              )}

              <li
                className={`search w-[500px] cursor-pointer gap-2 flex p-2 border rounded-[30px] border-[1.5px] border-[#1DBE60] ${
                  screenWidth < 550 && "hidden"
                }`}
              >
                <input
                  placeholder="Поиск"
                  onChange={(e) => setsearchValue(e.target.value)}
                  value={searchValue}
                  className={`${
                    StateSearch && "active"
                  } placeholder:text-[#b2b4bc] cursor-pointer font-semibold text-[#b2b4bc] pl-[10px] w-full`}
                />
                <span className={ulStyle}>search</span>
              </li>

              <li>
                <Link
                  to="cart"
                  className="relative flex flex-col items-center justify-between"
                >
                  <span className={ulStyle}>shopping_cart</span>
                  {data.length > 0 && (
                    <span className="absolute top-[-5px] left-[90%] text-[#1DBE60] p-[2px]">
                      {data.length}
                    </span>
                  )}
                </Link>
              </li>
              {user ? (
                <li>
                  <Link
                    to="/profile"
                    className={`flex flex-col items-center justify-between `}
                  >
                    {user?.avatar ? (
                      <div className="w-[32px]">
                        <img
                          className="w-full border-[#1DBE60] border rounded-full"
                          src={user?.avatar}
                          alt=""
                        />
                      </div>
                    ) : (
                      <span className={`${ulStyle} text-[#b2b4bc]`}>
                        account_circle
                      </span>
                    )}
                    <span className={`text-base text-[#b2b4bc]`}>Аккаунт</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="flex flex-col items-center justify-between"
                  >
                    <span className={`${ulStyle} text-[#b2b4bc]`}>
                      account_circle
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {StateSearch && (
            <div
              ref={searchRef}
              className="mini__search bg-[#109345]  z-[1] justify-between items-center bg-[#d5e0da1a] rounded-[10px] h-[55px] w-[95%] absolute bottom-[-45px] px-4 left-[2.5%]"
            >
              <input 
                onChange={(e) => setsearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search"
                className="w-[90%] h-[100%] text-[#fff] placeholder:text-[#fff]  font-semibold"
              />
              <span className={ulStyle}>search</span>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
