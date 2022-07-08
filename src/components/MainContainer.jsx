import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  RowContainer,
  HomeContainer,
  MenuContainer,
  CardContainer,
} from "./index";
import { useStateValue } from "../Context/StateProvider";

function MainContainer() {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const rowContainerRef = useRef();

  const scroll = (scrollOffset) => {
    rowContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full mt-10">
        <div className="w-full flex items-center justify-between">
          <h2
            className="text-2xl text-headingColor font-semibold capitalize relative 
          before:absolute before:rounded-lg before:content before:w-32 before:h-1
          before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-500
          before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 "
          >
            Our Fresh & healthy fruits
          </h2>
          <div className="hidden md:flex items-center gap-3 ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all 
            duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scroll(-300)}
            >
              <MdChevronLeft className="text-white text-xl" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all 
            duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => scroll(300)}
            >
              <MdChevronRight className="text-white text-xl" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          reference={rowContainerRef}
          flag={true}
          data={foodItems?.filter((item) => String(item.category) === "fruits")}
        />
      </section>
      <MenuContainer />
      {cartShow && <CardContainer />}
    </div>
  );
}

export default MainContainer;
