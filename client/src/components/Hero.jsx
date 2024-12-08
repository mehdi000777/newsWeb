import React from "react";
import { SectionWrapper } from "../hoc";
import Slider from "./Slider";
import LevelBox from "./LevelBox";
import aparatImage from "../assets/aparat.png";
import telegramImage from "../assets/telegram.png";
import crowImage from "../assets/crow.png";

const Hero = () => {
  return (
    <div className="w-full flex justify-between gap-x-4 mt-6 p-4 lg:p-0">
      <div className="w-full flex-[3] flex flex-col justify-between">
        <Slider />
        <LevelBox />
      </div>
      {/* <!-- start baners & newslatter --> */}
      <div className="flex-1 lg:flex hidden flex-col justify-between gap-2">
        <div className="bg-[#ffffff] border border-[#e4e4e4]">
          <a href="#" target="_blank">
            <img src={aparatImage} alt="aparat" />
          </a>
        </div>
        <div className="bg-[#ffffff] border border-[#e4e4e4]">
          <a href="#" target="_blank">
            <img src={telegramImage} alt="telegram" />
          </a>
        </div>
        {/* <!-- start newslatter --> */}
        <div className="flex flex-col items-center justify-center bg-primary p-2">
          <img src={crowImage} alt="کلاغ خبرچین" />
          <p className="text-[#ffffff] text-[13px] text-center px-5">
            با عضویت در کلاغ خبرچیناز آخرین محصولات و اخبار در پست الکترونیکی
            خود با خبر شوید!!
          </p>
          <form className="w-[11rem] h-[1rem]">
            <input
              type="email"
              placeholder="test@websit.com"
              className="rounded-md bg-[#29aeb4] w-full h-full p-1 text-[#ffffff] placeholder:text-[#ffffff] text-left text-xs before:w-[1px] before:h-[10px] before:bg-[#169096]"
            />
            <input type="button" id="submit" />
          </form>
          <label
            htmlFor="submit"
            className="bg-[#ffffff] mt-2 rounded-sm text-sm px-2 cursor-pointer"
          >
            ثبت نام
          </label>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Hero);
