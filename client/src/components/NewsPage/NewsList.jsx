import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewsList = ({ title, image, color, data }) => {
  return (
    <div className="bg-[#ffffff] w-full border border-[#dfdfdf] p-4 pt-6 mb-4">
      <div className="w-full flex gap-2">
        <img src={image} />
        <p className={`flex flex-col text-${color}`}>
          <span>{title}</span>
          <strong>از {title} دیدن کنید</strong>
        </p>
      </div>
      <div>
        {data ? (
          data.map((item) => (
            <Link to={`/${item._id}`} key={item._id} className="flex items-center gap-2">
              <div className="text-white bg-secondary p-1">
                <FaLongArrowAltLeft size={19} />
              </div>
              <div className="border border-[#dfdfdf] p-1 w-full">
                <span>{item.title}</span>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
