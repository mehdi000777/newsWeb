import React, { useEffect } from "react";
import NewsData from "../components/NewsPage/NewsData";
import Sugested from "../components/NewsPage/Sugested";
import Comments from "../components/NewsPage/Comments";
import NewsList from "../components/NewsPage/NewsList";
import { SectionWrapper } from "../hoc";
import { IoIosHeart } from "react-icons/io";
import systemImage from "../assets/system.png";
import systemBlueImage from "../assets/system2.png";
import {
  useEditVisitNewsMutation,
  useGetlatestNewsQuery,
  useGetNewsQuery,
  useGetVisitedNewsQuery,
} from "../app/newsApiSlice";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const NewsPage = () => {
  const { id } = useParams();

  const { data: visitedNews } = useGetVisitedNewsQuery("visitedNews");
  const { data: lastNews } = useGetlatestNewsQuery("lastNews");
  const { data: news, isLoading } = useGetNewsQuery(id);
  const [editVisitNews] = useEditVisitNewsMutation();

  useEffect(() => {
    const edit = async () => {
      try {
        await editVisitNews(id).unwrap();
      } catch (error) {
        console.log(error.data.message);
      }
    };
    edit();
  }, []);

  return (
    <div className="w-full flex justify-between gap-6 lg:p-0 p-4">
      {isLoading ? (
        <ClipLoader />
      ) : (
        <div className="flex-[2] overflow-hidden">
          <NewsData data={news} />
          <Sugested data={news} />
          <Comments comments={news?.comments} newsId={id} />
        </div>
      )}

      <div className="hidden lg:block lg:flex-1">
        <NewsList
          title={"آخرین اخبار"}
          color={"orange"}
          image={systemImage}
          data={visitedNews}
        />
        <NewsList
          title={"پر بازدید ترین"}
          color={"primary"}
          image={systemBlueImage}
          data={lastNews}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(NewsPage, "اخبار محبوب", IoIosHeart);
