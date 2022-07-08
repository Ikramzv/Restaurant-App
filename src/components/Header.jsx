import React, { useEffect, useState } from "react";
import { MdAdd, MdLogout, MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

import Logo from "./images/logo.png";
import Avatar from "./images/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

function Header({ headerColor }) {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);

  const login = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then(({ user: { providerData } }) => {
          dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
          });
          localStorage.setItem("user", JSON.stringify(providerData[0]));
        })
        .catch((err) => console.log("Error" + err.message));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    navigate("/");
    setIsMenu(false);
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    localStorage.clear();
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header
      className={`${headerColor} transition-all duration-500 ease-in-out fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16`}
    >
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between ">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="object-cover w-8 cursor-pointer"
          />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link to={"/"}>
              <li className="text-base text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer">
                Home
              </li>
            </Link>
            <li className="text-base text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer">
              About us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 ? (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold ">
                  {cartItems.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </motion.div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user && user?.photoURL ? user.photoURL : Avatar}
              alt="user profile"
              className="w-10 h-10 min-w-[0px] min-h-[40px] rounded-full drop-shadow-2xl cursor-pointer object-cover"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
              >
                {user?.email === "zulfuqarli.ikram0101@gmail.com" ? (
                  <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                    <p
                      className="flex items-center justify-between cursor-pointer px-4 py-2 
                                    hover:bg-slate-100 transition-all duration-500 ease-in-out 
                                    text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                <p
                  className="cursor-pointer flex items-center justify-between px-4 py-2 
                            hover:bg-slate-100 transition-all duration-500 ease-in-out 
                            text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full h-full items-center justify-between ">
        <motion.div
          className="relative flex items-center justify-center"
          whileTap={{ scale: 0.75 }}
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 ? (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          ) : (
            ""
          )}
        </motion.div>
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="object-cover w-8 cursor-pointer"
          />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="user profile"
            className="w-10 h-10 min-w-[0px] min-h-[40px] rounded-full drop-shadow-2xl cursor-pointer object-cover"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 200 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 200 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
            >
              {user?.email === "zulfuqarli.ikram0101@gmail.com" ? (
                <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                  <p
                    className="flex items-center justify-between cursor-pointer px-4 py-2 
                                    hover:bg-slate-200 transition-all duration-500 ease-in-out 
                                    text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              ) : (
                ""
              )}
              <ul className="flex flex-col">
                <Link to={"/"}>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="text-base px-4 py-2  hover:bg-slate-200 text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer"
                  >
                    Home
                  </li>
                </Link>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base px-4 py-2  hover:bg-slate-200 text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer"
                >
                  Menu
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base px-4 py-2  hover:bg-slate-200 text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer"
                >
                  About us
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base px-4 py-2  hover:bg-slate-200 text-textColor hover:text-headingColor duration-500 transition-all ease-in-out cursor-pointer"
                >
                  Service
                </li>
              </ul>
              <p
                className="cursor-pointer m-2 p-2 rounded-lg shadow-md flex items-center justify-center gap-3 px-4 py-2 bg-gray-200
                            hover:bg-slate-300 transition-all duration-500 ease-in-out 
                            text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
