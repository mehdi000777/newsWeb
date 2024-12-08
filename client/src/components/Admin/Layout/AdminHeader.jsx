import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const AdminHeader = () => {
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="w-20 h-20">
        <Link to="/">
          <img src={logo} alt="" className="w-full h-full object-cover" />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
