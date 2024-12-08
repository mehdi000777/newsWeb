import React, { useEffect, useState } from "react";
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { FaEye } from "react-icons/fa6";
import { useLikeNewsMutation } from "../../app/newsApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../../app/authSlice";
import { useSelector } from "react-redux";

const NewsData = ({ data }) => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);

  const [likeToggle, setLikeToggle] = useState(true);

  useEffect(() => {
    data?.likes?.find((item) => item === user?._id)
      ? setLikeToggle(false)
      : setLikeToggle(true);
  }, [data?.likes]);

  const [likeNews] = useLikeNewsMutation();

  const likeHandler = async () => {
    if (data.likes.find((item) => item === user._id))
      return toast.error("you are liked this news");
    try {
      await likeNews({ id, type: "like" }).unwrap();
      setLikeToggle(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const dislikeHandler = async () => {
    try {
      await likeNews({ id, type: "disLike" }).unwrap();
      setLikeToggle(true);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="w-full h-full">
        <div className="w-full h-[22rem]">
          <img src={data.coverImage} className="w-full h-full object-cover" />
        </div>
        <div className="w-full my-2 border border-[#dfdfdf] relative">
          <header className="w-full bg-[#ffffff] flex justify-between p-4 items-center">
            <h1 className="font-bold pr-36">{data.title}</h1>
            <div className="flex gap-4 items-center">
              <p className="text-lg">
                <span className="text-primary">لایک </span>
                <span className="text-orange">کنید</span>
              </p>
              {likeToggle ? (
                <GrLike
                  size={19}
                  className="text-primary font-bold cursor-pointer hover:text-orange transition-all"
                  onClick={likeHandler}
                />
              ) : (
                <GrDislike
                  size={19}
                  className="text-primary font-bold cursor-pointer hover:text-orange transition-all"
                  onClick={dislikeHandler}
                />
              )}
            </div>
          </header>
          <footer className="w-full bg-[#e1e1e1] flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-4">
              <p>
                <strong>موضوع : </strong>
                <span className="text-[15px]">{data.category.title}</span>
              </p>
              <p>
                <strong>تاریخ انشار : </strong>
                <span className="text-[15px]">
                  {new Date(data.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaEye size={19} />
              <span>{data.visit}</span>
            </div>
          </footer>
          <div className="w-32 h-32 rounded-2xl absolute bottom-14 right-3 border-2 border-[#ffffff] overflow-hidden">
            <img src={data.thumbnale} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div
        className="w-full my-2 border border-[#dfdfdf] bg-[#ffffff] p-4 text-justify [&_img]:mx-auto [&_video]:mx-auto"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </div>
  );
};

export default NewsData;
