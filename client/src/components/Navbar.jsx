import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import DropDown from "./DropDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../app/authSlice";
import { useLogOutMutation } from "../app/authApiSlice";
import { toast } from "react-toastify";
import { useGetAllCategorysQuery } from "../app/categoryApiSlice";

const Navbar = () => {
  const { data: categories, isLoading } = useGetAllCategorysQuery();

  const user = useSelector(selectCurrentUser);

  const [logOutAction] = useLogOutMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const close = () => setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", close);

    return () => mq.removeEventListener("change", close);
  });

  const navItems = [
    {
      name: "خــانه",
      en: "home",
      link: "/",
    },
    {
      name: "اخبار",
      en: "news",
      link: "/archive",
    },
    {
      name: "موضوعات",
      en: "subjects",
      onClick: () => {
        setSubjectOpen(!subjectOpen);
      },
      dropDown: true,
      categories: categories ?? [],
    },
    {
      name: "درباره ما",
      en: "about us",
    },
    {
      name: user ? user.name : "ورود / ثبت نام",
      en: user ? "logOut" : "login / sign up",
      link: !user && "/auth",
      onClick: async () => {
        if (user) {
          try {
            await logOutAction().unwrap();
            dispatch(logOut);
          } catch (error) {
            toast.error(error.data.message);
          }
        }
      },
    },
  ];

  const searchClickHanlder = () => {
    navigate(`/archive?search=${search}`);
  };

  return (
    <>
      <div className="md:hidden relative z-[999]">
        <FiMenu
          className="pr-4 text-primary cursor-pointer hover:text-orange transition-all duration-200"
          size={50}
          onClick={() => setOpen(!open)}
        />
        <DropDown open={open} data={navItems} pos={"top-15 right-5"} />
      </div>
      <nav className="md:flex flex-col gap-2 hidden md:pr-4 lg:pr-0">
        <ul className="flex flex-row gap-4">
          {navItems.map((item, index) => (
            <li
              key={item.en}
              className="flex items-center group gap-4 relative"
            >
              <div className="flex justify-center items-center gap-4">
                {item?.en.includes("login") && (
                  <FaUser
                    size={19}
                    className="text-primary group-hover:text-orange transition-all duration-300"
                  />
                )}
                <Link
                  to={item.link}
                  onClick={item.onClick}
                  className="flex flex-col items-center font-bold"
                >
                  <div className="text-primary text-xl group-hover:text-orange transition-all duration-300 flex items-center gap-1">
                    <span>{item.name}</span>
                    {item.en === "subjects" && (
                      <RiArrowDropDownLine size={19} />
                    )}
                  </div>
                  <span className="text-secondary uppercase tracking-widest text-[13px]">
                    {item.en}
                    <div className="w-full h-[1px] bg-orange group-hover:scale-100 scale-0 transition-all duration-300 origin-left" />
                  </span>
                </Link>
              </div>
              {navItems.length != index + 1 && (
                <div className="w-[1px] h-[15px] bg-secondary opacity-20" />
              )}
              {item.en === "subjects" && !isLoading && (
                <DropDown
                  open={subjectOpen}
                  data={categories}
                  pos={"top-12 right-0"}
                />
              )}
            </li>
          ))}
          {user?.isAdmin && (
            <li className="flex items-center group gap-4">
              <div className="w-[1px] h-[15px] bg-secondary opacity-20" />
              <Link to="/admin/news" className="text-primary font-bold">
                <div className="text-primary text-xl group-hover:text-orange transition-all duration-300 flex items-center flex-col">
                  <span>پنل ادمین</span>
                  <span className="text-secondary uppercase tracking-widest text-[13px]">
                    Admin Panel
                    <div className="w-full h-[1px] bg-orange group-hover:scale-100 scale-0 transition-all duration-300 origin-left" />
                  </span>
                </div>
              </Link>
            </li>
          )}
        </ul>
        <div className="w-full h-[35px] rounded-md bg-[#f5f5f5] flex items-center justify-between">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="جستجو کنید ..."
            className="bg-[#f5f5f5] w-full h-full pr-4 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="button"
            name="searchsub"
            id="searchsub"
            onClick={searchClickHanlder}
          />
          <label
            htmlFor="searchsub"
            id="searchicon"
            className="cursor-pointer pl-4"
          >
            <FaSearch className="text-primary hover:text-orange transition-all duration-200" />
          </label>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
