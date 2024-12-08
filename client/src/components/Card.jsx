import React, { useEffect, useState } from "react";
import { ellipsis } from "../utils";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import Pagination from "./Pagination";
import { ClipLoader } from "react-spinners";

const Card = ({ data, isLoading, page, setPage }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      {isLoading ? (
        <ClipLoader />
      ) : (
        <ul className="w-full h-full py-1">
          {data?.news?.map((item, index) => (
            <li
              key={index}
              className={`w-full flex my-4 shadow-[0px_1px_5px_0px_#9e9e9e] bg-[#ffffff] border border-[#c7c7c7c7] p-2`}
            >
              <div className={`mb-1 relative group w-40 min-h-24`}>
                <img
                  className="w-full h-full object-cover absolute top-0"
                  src={item.thumbnale}
                  alt=""
                />
                <div
                  className={`w-full h-full absolute bg-[rgba(0,0,0,0.7)] group-hover:scale-100 scale-0 transition-all duration-300 flex items-center justify-center`}
                >
                  <Link to={`/${item._id}`}>
                    <MdOutlineOpenInNew
                      size={19}
                      color="#ffffff"
                      className="cursor-pointer hover:scale-150 transition-all duration-300"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-1 mr-5">
                <Link
                  to={`/${item._id}`}
                  className="text-lg font-bold hover:text-orange text-primary transition-all"
                >
                  <h2>{item.title}</h2>
                </Link>
                <p className={`text-md mt-1`}>
                  {ellipsis(item.description, 250)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        pageCount={data?.pageCount}
      />
    </div>
  );
};

export default SectionWrapper(Card, null, null, true);
