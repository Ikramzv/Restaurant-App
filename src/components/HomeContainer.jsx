import React from "react";
import Delivery from "./images/delivery.png";
import HeroBg from "./images/heroBg.png";
import { heroData } from "../utils/data";

function HomeContainer() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full min-h-screen"
      id="home"
    >
      <div className="py-2 gap-6 flex flex-col items-start justify-center flex-1">
        <div className="flex items-center gap-2 bg-orange-100 px-2 py-1 rounded-full cursor-pointer">
          <p className="flex items-center text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] font-extrabold tracking-[3px] text-headingColor w-[60%] md:w-auto  lg:text-[4.25rem]">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem] lg:leading-tight">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
          recusandae laboriosam totam eveniet corporis, temporibus natus
          excepturi perspiciatis. Eveniet quis quod optio nemo assumenda culpa
          placeat illum eius a dolores.
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg 
                hover:shadow-xl transition-all duration-300 ease-in-out md:w-auto"
        >
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 h-full flex items-center relative">
        <img
          src={HeroBg}
          alt="hero background"
          className="ml-auto w-full h-370 md:w-auto md:h-650"
        />
        <div
          className="w-[400px] h-[400px] lg:h-[600px] absolute lg:top-8 left-[50%] 
        translate-x-[-50%] flex flex-wrap items-center justify-center py-4 gap-x-4 lg:gap-4"
        >
          {heroData &&
            heroData.map((data) => {
              return (
                <div
                  key={data.id}
                  className="lg:w-190 p-2 bg-cardOverlay backdrop-blur-md rounded-3xl 
                  cursor-pointer hover:shadow-xl hover:scale-110 transition-all duration-500 ease-in-out flex flex-col items-center justify-center shadow-lg"
                >
                  <img
                    src={data?.imageSrc}
                    alt={data?.name}
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 object-cover"
                  />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {data?.name}
                  </p>
                  <p className="text-sm lg:text-md text-lightTextGray font-semibold text-center my-1 lg:my-3">
                    {data?.desc}
                  </p>
                  <p className="text-xs lg:text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-600">
                      {data?.price[0]}
                    </span>{" "}
                    {data?.price[1]}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
