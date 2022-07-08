import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "./images/emptyCart.svg";
import { CartItem } from "./index";

function CardContainer() {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const calculateTotalValue = (action) => {
    if (action === "subtotal") {
      return cartItems.reduce((initial, item) => {
        return parseFloat(item.price * item.qty) + initial;
      }, 0);
    }
    if (action === "total") {
      return calculateTotalValue("subtotal") + calculateTotalValue("delivery");
    }
    if (action === "delivery") {
      return (calculateTotalValue("subtotal") * 2.5) / 100;
    }
  };

  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    cartItems.map((item) => (item.qty = 0));
    localStorage.removeItem("cartItems");
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
  };

  useEffect(() => {}, [cartItems]);

  return (
    <motion.div
      initial={{ opacity: "0", x: "100%" }}
      animate={{ opacity: "1", x: "0" }}
      exit={{ opacity: "0", x: "100%" }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-50"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={hideCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-lg font-semibold text-textColor">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center cursor-pointer gap-2 p-1 px-2 my-2 bg-gray-100 rounded-lg hover:shadow-md duration-100
          ease-linear transition-all text-textColor text-base hover:bg-gray-200"
          onClick={() => clearCart()}
        >
          Clear <RiRefreshFill className="text-lg" />
        </motion.p>
      </div>
      {/* Bottom Section */}
      {cartItems && cartItems.length > 0 ? (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          exit={{ y: "100%" }}
          className="w-full h-full delay-100 duration-500 rounded-t-[2rem] flex flex-col bg-cartBg"
        >
          {/* Cart Item Section */}
          <div className="w-full h-340 md:h-420 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem key={item.id.toString()} item={item} />
              ))}
          </div>
          {/* Cart Total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">
                $ {calculateTotalValue("subtotal")}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">
                $ {calculateTotalValue("delivery")}
              </p>
            </div>
            <div className="w-full border-b border-b-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {calculateTotalValue("total")}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="cursor-pointer p-2 w-full rounded-full bg-gradient-to-r from-orange-600 to-orange-800 text-gray-50 text-lg my-2 hover:shadow-md
              transition-all duration-150 ease-linear"
                onClick={() => {
                  hideCart();
                  localStorage.removeItem("cartItems");
                  dispatch({
                    type: actionType.SET_CART_ITEMS,
                    cartItems: [],
                  });
                }}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="cursor-pointer p-2 w-full rounded-full bg-gradient-to-r from-orange-600 to-orange-800 text-gray-50 text-lg my-2 hover:shadow-md
          transition-all duration-150 ease-linear"
              >
                Login to check Out
              </motion.button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="empty cart" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CardContainer;
