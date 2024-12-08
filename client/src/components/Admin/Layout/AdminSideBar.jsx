import React, { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { MdTitle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (path === "news") setActive(0);
    else if (path === "category") setActive(1);
    else if (path === "users") setActive(2);
    else if (path === "createNews") setActive(3);
    else if (path === "createCategory") setActive(4);
  }, [path]);

  const data = [
    {
      name: "خبر ها",
      link: "/admin/news",
      icon: (
        <IoNewspaperOutline size={30} color={`${active === 0 ? "crimson" : "#555"}`} />
      ),
    },
    {
      name: "موضوع ها",
      link: "/admin/category",
      icon: (
        <BiSolidCategoryAlt
          size={30}
          color={`${active === 1 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      name: "کاربران",
      link: "/admin/users",
      icon: (
        <FaUsers size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
      ),
    },
    {
      name: "ساخت خبر جدید",
      link: "/admin/createNews",
      icon: (
        <TfiWrite size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
      ),
    },
    {
      name: "ساخت موضوع جدید",
      link: "/admin/createCategory",
      icon: (
        <MdTitle size={30} color={`${active === 4 ? "crimson" : "#555"}`} />
      ),
    },
  ];

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll z-10">
      {data.map((item, index) => (
        <div
          key={index}
          className="w-full flex items-center p-4"
          onClick={() => setActive(index)}
        >
          <Link to={item.link} className="w-full flex items-center">
            {item.icon}
            <h5
              className={`hidden lg:block pr-2 text-[18px] font-[400] ${
                active === index ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              {item.name}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBar;
