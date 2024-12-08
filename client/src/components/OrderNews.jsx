import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import NewsButtons from "./NewsButtons";
import NewsSlider from "./NewsSlider";
import {
  useLazyGetPopularNewsQuery,
  useLazyGetVisitedNewsQuery,
} from "../app/newsApiSlice";
import { toast } from "react-toastify";

const OrderNews = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getPopular] = useLazyGetPopularNewsQuery();
  const [getVisited] = useLazyGetVisitedNewsQuery();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (active === 0) {
        try {
          const res = await getPopular().unwrap();
          setData(res);
          setLoading(false);
        } catch (error) {
          toast.error(error?.message);
          setLoading(false);
        }
      } else {
        try {
          const res = await getVisited().unwrap();
          setData(res);
          setLoading(false);
        } catch (error) {
          toast.error(error?.message);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [active]);

  return (
    <div className="px-6 lg:px-0">
      <NewsButtons active={active} setActive={setActive} />
      <div className="mt-2 flex justify-center items-center">
        {loading ? <div>Loading...</div> : <NewsSlider data={data} />}
      </div>
    </div>
  );
};

export default SectionWrapper(OrderNews);
