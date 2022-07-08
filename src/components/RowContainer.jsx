import React, { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "./images/NotFound.svg";
import { useStateValue } from "../Context/StateProvider";
import { useEffect } from "react";
import { actionType } from "../Context/reducer";

function RowContainer({ flag, data, reference }) {
  const [{ cartItems }, dispatch] = useStateValue();

  const [items, setItems] = useState([]);

  const reduce = (array) => {
    let unique = [];
    array.map((item) => {
      if (unique.some((cart) => cart.title === item.title)) {
        return;
      } else {
        return unique.push(item);
      }
    });
    return unique;
  };

  const addCartItem = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: reduce(items),
    });
    localStorage.setItem("cartItems", JSON.stringify(reduce(items)));
  };

  useEffect(() => {
    return items.length > 0
      ? addCartItem()
      : localStorage.setItem("cartItems", JSON.stringify(reduce(cartItems)));
  }, [items]);

  return (
    <div
      ref={reference}
      className={`w-full scroll-smooth snap-mandatory snap-start snap-x my-12 flex items-center gap-3 rounded-md scrollbar-none  ${
        flag
          ? "overflow-x-scroll"
          : "overflow-x-hidden px-7 py-5 rounded-b-3xl flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data?.map((item) => (
          <div
            key={item.id}
            className={`w-220 min-w-[220px] md:w-[280px] md:min-w-[280px] md:h-[150px] h-[120px] ${
              flag ? "my-12" : "mt-5"
            }  
          rounded-lg bg-gray-100 shadow-md backdrop-blur-lg hover:shadow-lg duration-200`}
          >
            <div className="w-full h-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={item.imageURL}
                alt="c1"
                className="w-24 h-24 md:w-40 md:h-40 -mt-11 object-contain ml-4 transition-all duration-100 cursor-pointer ease-linear drop-shadow-2xl"
              />
              <div className="w-full h-full flex flex-col items-end justify-between pr-2">
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 mt-1 flex items-center justify-center rounded-full cursor-pointer mr-1
            bg-red-600 hover:bg-red-700 hover:shadow-md transition-all duration-100 ease-linear"
                  onClick={() => {
                    item.qty += 1;
                    setItems([...cartItems, item]);
                  }}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
                <div className="flex flex-col items-end">
                  <p className="text-textColor font-semibold text-base capitalize">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.calories} calories
                  </p>
                  <div className="flex items-center justify-end">
                    <p className="text-md text-headingColor font-semibold">
                      <span className="text-sm text-red-500">$</span>{" "}
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="not found" className="h-225" />
          <p className="font-bold text-xl leading-normal tracking-wide text-pink-700">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
}

export default RowContainer;
