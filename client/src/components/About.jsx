import React from "react";
import { SectionWrapper } from "../hoc";
import AboutBG from "../assets/aboutBG.jpg";

const About = () => {
  return (
    <div className="flex items-center justify-between">
      <img src={AboutBG} />
      <div>
        <h1 className="text-[5rem] text-primary">آیناز کرد</h1>
        <p className="text-[3rem]">
          کلاس <span className="text-lime-500">یازدهم </span>تجربی
        </p>
        <p className="text-[3rem] text-orange">شهرستان دزفول</p>
        <p className="text-[3rem]">
          دبیرستان <span className="text-lime-500">دانشوران</span>
        </p>
      </div>
    </div>
  );
};

export default SectionWrapper(About, null, null, true);