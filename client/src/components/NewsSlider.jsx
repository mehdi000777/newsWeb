import React, { useEffect, useRef, useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { motion, useAnimate } from "framer-motion";
import { ellipsis } from "../utils";
import { Link } from "react-router-dom";

const NewsSlider = ({ horizantal, data }) => {
  const [width, setWidth] = useState(0);
  const carousle = useRef();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setWidth(carousle.current.scrollWidth - carousle.current.offsetWidth);
  }, []);

  const nextPageHandler = () => {
    animate(carousle.current, { x: 0 });
  };

  const prevPageHandler = () => {
    animate(carousle.current, { x: width });
  };

  return (
    <div className="w-full relative">
      <div
        onClick={nextPageHandler}
        className="w-8 h-20 bg-[#ffffff] absolute right-[-15px] top-[50%] translate-y-[-50%] shadow-[1px_1px_5px_#979797] z-20 flex justify-center items-center cursor-pointer hover:bg-[rgba(45,234,241,0.486)] transition-all duration-300 group "
      >
        <RiArrowRightSLine size={30} className="group-hover:text-white" />
      </div>
      <div
        onClick={prevPageHandler}
        className="w-8 h-20 bg-[#ffffff] absolute left-[-15px] top-[50%] translate-y-[-50%] shadow-[1px_1px_5px_#979797] z-20 flex justify-center items-center cursor-pointer hover:bg-[rgba(45,234,241,0.486)] transition-all duration-300 group"
      >
        <RiArrowLeftSLine size={30} className="group-hover:text-white" />
      </div>
      <motion.div className="w-full h-full overflow-hidden cursor-grab">
        <motion.ul
          ref={carousle}
          drag="x"
          dragConstraints={{ left: 0, right: width }}
          className="w-full h-full flex items-center gap-2 py-1"
        >
          {data?.map((item, index) => (
            <motion.li
              key={index}
              className={`${
                horizantal
                  ? "min-w-[15.6rem] w-[15.6rem] flex items-center gap-2 shadow-[0px_1px_5px_0px_#9e9e9e]"
                  : "min-w-[12.35rem] w-[12.35rem]"
              } bg-[#ffffff] border border-[#c7c7c7c7] p-2`}
            >
              <div
                className={`mb-1 relative group ${
                  horizantal ? "w-24 h-24" : "w-full h-[11.25rem] flex-[2]"
                }`}
              >
                <img
                  className="w-full h-full object-cover absolute top-0"
                  src={item.thumbnale}
                  alt=""
                />
                <div
                  className={`w-full ${
                    horizantal ? "h-24" : "h-[11.25rem]"
                  } absolute bg-[rgba(0,0,0,0.7)] group-hover:scale-100 scale-0 transition-all duration-300 flex items-center justify-center`}
                >
                  <Link to={`/${item._id}`}>
                    <MdOutlineOpenInNew
                      size={19}
                      color="#ffffff"
                      className="cursor-pointer hover:scale-150 transition-all duration-300"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <Link
                  to={`/${item._id}`}
                  className="text-sm font-bold text-center hover:text-orange text-primary transition-all"
                >
                  <h2>
                    {" "}
                    {item.title.length > 20
                      ? ellipsis(item.title, 20)
                      : item.title}
                  </h2>
                </Link>
                <p
                  className={`${
                    horizantal ? "text-xs text-center" : "text-sm text-justify"
                  } mt-1 `}
                >
                  {horizantal
                    ? ellipsis(item.description, 40)
                    : ellipsis(item.description, 100)}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default NewsSlider;
