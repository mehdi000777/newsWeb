import React from "react";

const NewsButtons = ({ active, setActive }) => {
  const btns = ["محبوب ترین", "پر بازدید ترین"];

  const clickHandler = (index) => {
    setActive(index);
  };

  return (
    <div>
      <ul className="flex gap-2">
        {btns.map((btn, index) => (
          <li
            key={index}
            className={`bg-[#ffffff] border ${
              active === index ? "border-primary" : "border-[#c7c7c7c7]"
            } text-[13px] rounded-lg p-1 min-w-8 h-5 flex justify-center items-center`}
          >
            <button
              onClick={() => clickHandler(index)}
              className={`relative ${
                active === index &&
                "after:border-t-[5px] after:border-t-primary after:border-r-[5px] after:border-r-transparent after:border-l-[5px] after:border-l-transparent after:border-b-[5px] after:border-b-transparent after:w-0 after:h-0 after:absolute after:top-[19px] after:left-[50%]"
              }`}
            >
              {btn}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsButtons;
