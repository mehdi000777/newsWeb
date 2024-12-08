import React from "react";
import { SectionWrapper } from "../hoc";
import footerImage from "../assets/footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-full pb-2 flex justify-between items-center px-6 lg:px-0">
      <div className="w-full h-full">
        <ul className="w-full h-full flex gap-2 items-center">
          <li>
            <Link to="/" className="ml-2 font-bold">
              خانه
            </Link>
            <span className="text-[#aaaaaa]">/</span>
          </li>
          <li>
            <Link to="/archive" className="mx-2 font-bold">
              اخبار
            </Link>
            <span className="text-[#aaaaaa]">/</span>
          </li>
          <li>
            <Link to="/archive" className="mr-2 font-bold">
              بلاگ
            </Link>
          </li>
        </ul>
        <p>
          تمامی حقوق مادی و معنوی این وب سایت متعلق به وب سایت خبر فرهنگی و هنری
          می باشد.
        </p>
      </div>
      <img src={footerImage} alt="" />
    </footer>
  );
};

export default SectionWrapper(Footer, null, null, true);
