import React from "react";
import NewsSlider from "../NewsSlider";
import sugestImage from "../../assets/sugest.png";
import { useGetNewsByCategoryQuery } from "../../app/newsApiSlice";

const Sugested = ({ data }) => {
  const { data: newsByCategory, isLoading } = useGetNewsByCategoryQuery(
    data?.category?._id
  );

  return (
    <div className="bg-[#ffffff] w-full border border-[#dfdfdf]">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img src={sugestImage} className="w-32 h-24 block" />
          <p className="flex flex-col relative left-14 font-bold">
            <span className="sm:text-lg text-sm">پیشــنـهـادی ها</span>
            <span className="text-orange text-sm sm:text-base">
              حتما مشاهده کنید !
            </span>
          </p>
        </div>
        <span className="pl-7 tracking-[15px] text-[#ececec] hidden sm:block text-2xl">
          SUGESTED
        </span>
      </div>
      <div className="px-7 pb-5">
        {!isLoading && <NewsSlider data={newsByCategory} />}
      </div>
    </div>
  );
};

export default Sugested;
