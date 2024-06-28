import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCart, removeCart } from "../store/slices/Cart";

const OneCart = ({ item, setid }) => {
  const [radio, setRadio] = useState(false);
  const dispach = useDispatch();
  return (
    <div className="OneCart items-start justify-between flex rounded-2xl p-4 border border-[#1DBE60] my-5">
      <div className="data w-[78%] flex items-start  gap-4">
        <div
          className="img rounded-2xl"
          style={{ backgroundImage: `url('${item.image}')` }}
        ></div>

        <div className="flex-1 h-[150px] flex flex-col">
          <h3 className="name text-[#b2b4bc] font-bold">{item.name}</h3>
          <div className="flex-1 flex gap-1 items-end">
            <span className="text-[22px] text-[#b2b4bc] ">Цена: </span>
            <span className="text-[#1DBE60] font-bold pb-[1px]"> {item.price}</span>
          </div>
        </div>
      </div>
      <div className="buttons w-[20%] flex flex-col justify-between h-[150px] items-end">
        <div className="flex gap-2 items-center translate-y-[-5px]">
          <button
            onClick={() => dispach(removeCart({ id: item.id }))}
            className="material-symbols-outlined text-base text-[#b2b4bc]  font-thin "
          >
            Close
          </button>
          <span
            onClick={() => {
              setRadio(!radio);
              setid((p) => [...p, item?.id]);
            }}
            className={`${
              radio ? "bg-[#1DBE60]" : null
            }  w-4 h-4 rounded-[35%] border border-[#1DBE60] block  `}
          ></span>
        </div>

        <div className="cost border w-full text-center flex items-start border-[#1DBE60] rounded-xl ">
          <button
            onClick={() =>
              dispach(
                changeCart({
                  id: item.id,
                  count: item.count > 1 ? item.count - 1 : 1,
                })
              )
            }
            className=" w-[35%]  h-full text-[16px] flex items-center justify-center font-thin text-[#b2b4bc]"
          >
            -
          </button>
          <span className=" w-[30%] border-x border-[#1DBE60] ">
            {item.count}
          </span>
          <button
            onClick={() =>
              dispach(changeCart({ id: item.id, count: item.count + 1 }))
            }
            className=" w-[35%] text-[#b2b4bc]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneCart;
