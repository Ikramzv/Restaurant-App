import React, { useState } from "react";
import { MdFastfood } from "react-icons/md";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import { useEffect } from "react";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/StateProvider";

function MenuContainer() {
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);

  return (
    <section className="w-full mb-6" id="menu">
      <div className="w-full flex flex-col items-center justify-start">
        <h2
          className="text-2xl text-headingColor mb-3 font-semibold mr-auto capitalize relative 
          before:absolute before:rounded-lg before:content before:w-24 before:h-1
          before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-500
          before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 "
        >
          Our Hot Dishes
        </h2>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setFilter(category.urlParamName)}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-red-600" : "bg-card"
                }  w-24 min-w-[94px] h-28 cursor-pointer rounded-lg shadow-lg drop-shadow-xl flex flex-col
                gap-3 items-center justify-center hover:bg-red-600 duration-150 ease-linear transition-all`}
              >
                <div
                  className={` w-10 h-10 rounded-full  ${
                    filter === category.urlParamName ? "bg-card" : "bg-red-600"
                  } group-hover:bg-card flex items-center justify-center`}
                >
                  <MdFastfood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-card"
                    } text-lg group-hover:text-textColor `}
                  />
                </div>
                <p
                  className={`${
                    filter === category.urlParamName
                      ? "text-card"
                      : "text-black"
                  } text-center text-sm group-hover:text-card `}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => String(n.category) === filter)}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
