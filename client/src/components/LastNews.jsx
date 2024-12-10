import React, { useState } from "react";
import { SectionWrapper } from "../hoc";
import { PiMicrophoneStageFill } from "react-icons/pi";
import newsImage from "../assets/news1.jpg";
import { ellipsis } from "../utils";
import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetlatestNewsQuery } from "../app/newsApiSlice";

const LastNews = () => {
  const { data, isLoading } = useGetlatestNewsQuery("lastNews");

  return (
    <div className="px-6 lg:px-0">
      <div className="w-full bg-[#ffffff] border border-[#e2e2e2e2] border-b-2 rounded-xl flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <PiMicrophoneStageFill size={19} className="text-orange" />
          <div className="flex flex-col items-center">
            <h3 className="felx">
              <span>آخرین </span>
              <strong className="text-orange">اخبــار</strong>
            </h3>
            <h5 className="text-xs">LASTED NEWS</h5>
          </div>
        </div>
        <Link to="/archive" className="text-[#a4a4a4]">
          مشاهده آرشیو »
        </Link>
      </div>
      <div className="w-full h-full mt-4">
        <ul className="w-full h-full flex flex-wrap justify-center lg:justify-start items-center gap-2">
          {!isLoading &&
            data.map((item, index) => (
              <li key={index} className="lg:w-[15.5rem] w-[17rem]">
                <div className="w-full h-40">
                  <img
                    src={item.thumbnale}
                    className="w-full h-full object-cover border border-[#aaaaaa] rounded-sm"
                  />
                </div>
                <Link
                  to={`/${item._id}`}
                  className="flex justify-between items-center mt-1 group"
                >
                  <h2 className="font-bold">
                    {item.title.length > 30 ? ellipsis(item.title, 30) : item.title}
                  </h2>
                  <span className="bg-[#aaaaaa] py-[2px] px-2 rounded-md text-sm text-white border-b-2 border-[#7a7a7a] group-hover:border-orange group-hover:bg-orange transition-all duration-300">
                    بیشتر
                  </span>
                </Link>
                <p className="text-justify text-xs mt-1">
                  {ellipsis(item.description, 100)}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionWrapper(LastNews, "اخبار محبوب", IoIosHeart);
