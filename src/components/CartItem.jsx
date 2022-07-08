import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

function CardItem({ item }) {
  const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();

  const updateCartItems = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const updateQty = (action, id) => {
    if (action === "remove") {
      setQty(qty - 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty -= 1;
        }
      });
    } else if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
      });
    }
  };

  const removeItems = () => {
    if (item.qty <= 0) {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: cartItems.filter((item) => Number(item.qty) !== 0),
      });
      return localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.filter((item) => Number(item.qty) !== 0))
      );
    }
  };

  useEffect(() => {
    updateCartItems();
  }, [qty]);

  return parseFloat(item.qty) > 0 ? (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt="item"
      />

      {/* Name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item.price) * item.qty}
        </p>
      </div>
      {/* Button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          className="text-gray-50 text-lg"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.qty}
        </p>
        <motion.div
          className="text-gray-50 text-lg"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus />
        </motion.div>
      </div>
    </div>
  ) : (
    removeItems()
  );
}

export default CardItem;
