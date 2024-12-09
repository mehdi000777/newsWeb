import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetSliderNewsQuery } from "../app/newsApiSlice";
import { toast } from "react-toastify";
import { ellipsis } from "../utils";

const Slider = () => {
  const [active, setActive] = useState(0);

  const { data, isLoading, isError, error } =
    useGetSliderNewsQuery("getSliderNews");

  useEffect(() => {
    const changeActiveInterval = setInterval(() => {
      if (active >= data?.length - 1) setActive(0);
      else setActive(active + 1);
    }, 5000);

    return () => clearInterval(changeActiveInterval);
  }, [active]);

  const clickHandler = (index) => {
    setActive(index);
  };

  if (isError) toast.error(error);

  return (
    <div className="bg-[#ffffff] w-full h-full flex justify-between overflow-hidden">
      {/* <!-- start btns --> */}
      <div className="h-full flex flex-col justify-between sm:flex-[1] flex-[2]">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              onClick={() => clickHandler(index)}
              className="relative border-b border-[rgba(0,0,0,0.1)] cursor-pointer flex items-center justify-between hover:bg-[rgba(94,94,94,0.1)] transition-all"
            >
              <div
                className={`h-full absolute right-0 transition-all duration-300 ${
                  active === index
                    ? "bg-primary w-[4px]"
                    : "bg-[rgba(0,0,0,0.1)] w-[2px]"
                }`}
              ></div>
              <div className="p-3">
                <h5 className="text-primary text-xs sm:text-sm md:text-lg text font-bold">
                  {item.title.length > 10
                    ? ellipsis(item.title, 10)
                    : item.title}
                </h5>
                <h6 className="text-secondary text-xs md:text-sm font-bold">
                  {item.description.length > 10
                    ? ellipsis(item.description, 10)
                    : item.description}
                </h6>
              </div>
              <RiArrowLeftSLine
                size={40}
                className={`pl-2 transition-all duration-300 ${
                  active === index ? "text-primary" : "text-[rgba(0,0,0,0.1)]"
                }`}
              />
            </div>
          ))
        )}
      </div>
      {/* <!-- start images --> */}
      <div className="flex flex-[3] overflow-hidden relative">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => (
            <Link to={`/${item._id}`} key={index}>
              <AnimatePresence>
                {active === index && (
                  <motion.div
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                    }}
                    className={`w-full h-full absolute`}
                  >
                    <img
                      src={item.thumbnale}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Slider;
