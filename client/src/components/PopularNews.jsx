import React from "react";
import NewsSlider from "./NewsSlider";
import { SectionWrapper } from "../hoc";
import { useGetPopularNewsQuery } from "../app/newsApiSlice";

const PopularNews = () => {
  const { data, isLoading } = useGetPopularNewsQuery("popularNews");

  return (
    <div className="px-6 lg:px-0">
      {isLoading ? <div>Loading...</div> : <NewsSlider horizantal={true} data={data} />}
    </div>
  );
};

export default SectionWrapper(PopularNews);
