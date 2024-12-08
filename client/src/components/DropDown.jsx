import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DropDown = ({ open, data, pos }) => {
  const menu = useRef();

  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    const animation = () => {
      menu.current.style.display = open && "block";
      menu.current.style.scale = !open && "0";
      setTimeout(() => {
        menu.current.style.display = !open && "none";
        menu.current.style.scale = open && "1";
      }, 100);
    };
    animation();
  }, [open]);

  return (
    <div
      ref={menu}
      className={`min-w-40 bg-[#ffffff] rounded-md absolute ${pos} drop-shadow-lg origin-top-right transition-all duration-300 z-10`}
    >
      <ul>
        {data.map((item, index) => (
          <Link key={index} to={item?.link}>
            <li
              className="cursor-pointer p-2 border-b border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)] transition-all duration-200 relative"
              onClick={() => item.dropDown && setSubOpen(!subOpen)}
            >
              {item?.name}
            </li>
            {item.dropDown && (
              <DropDown
                open={subOpen}
                data={item?.categories}
                pos={"top-20 right-full"}
              />
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
