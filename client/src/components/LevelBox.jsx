import React from "react";
import { GiNewShoot } from "react-icons/gi";
import { VscSymbolColor } from "react-icons/vsc";
import { IoBookOutline } from "react-icons/io5";

const LevelBox = () => {
  const levels = [
    {
      title: "اخبار فرهنگی",
      description: "بروز ترین اخبار فرهنگی و هنری",
      icon: <IoBookOutline size={30} color="#b9b9b9" />,
    },
    {
      title: "اخبار هنری",
      description: "اگر به هنر علاقه دارید آخرین اخبار رو ایجا دنبال کنید",
      icon: <VscSymbolColor size={30} color="#b9b9b9" />,
    },
    {
      title: "اخبار بروز",
      description: "از آخرین اخبار مطلع شوید",
      icon: <GiNewShoot size={30} color="#b9b9b9" />,
    },
  ];

  return (
    <div className="w-full lg:mt-0 mt-2">
      <ul className="w-full flex items-center justify-between bg-[#ffffff] border border-[#e4e4e4] px-4 py-2">
        {levels.map((level, index) => (
          <li
            key={index}
            className="flex items-center gap-3 after:w-[1px] after:h-[40px] after:bg-[#dfdfdf] last:after:hidden after:mx-2 "
          >
            {level.icon}
            <div>
              <h5 className="md:text-[15px] text-[11px] font-bold">
                {level.title}
              </h5>
              <p className="md:text-[13px] text-[9px] font-bold text-[#b9b9b9]">
                {level.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelBox;
