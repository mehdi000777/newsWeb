import React from "react";
import Navbar from "./Navbar";
import { GiRotaryPhone } from "react-icons/gi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full md:h-[8.75rem] h-[7rem] bg-[#ffffff] border-b-2 border-[rgba(0,0,0,0.1)] flex justify-center">
      <div className="w-[64rem] h-full flex justify-between items-center">
        <Navbar />
        <div className="h-full flex items-center justify-between gap-3">
          <a
            href="#"
            className="w-full h-full sm:flex hidden flex-col items-center justify-center border-x border-[rgba(0,0,0,0.1)] group"
          >
            <GiRotaryPhone
              size={60}
              className="opacity-70 group-hover:opacity-100 transition-all duration-300"
            />
            <h4 className="text-orange opacity-70 font-bold group-hover:opacity-100 transition-all duration-300">
              تماس با ما
            </h4>
          </a>
          <Link
            to="/"
            className="sm:w-[9rem] w-[7rem] h-full object-cover flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
          >
            <img src={logo} alt="سایت خبر" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
