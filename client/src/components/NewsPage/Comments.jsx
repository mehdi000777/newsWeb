import React, { useState } from "react";
import bigCommentsImage from "../../assets/bigComments.png";
import commentImage from "../../assets/comments.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/authSlice";
import { Link } from "react-router-dom";
import { useCreateCommentMutation } from "../../app/commentApiSlice";

const Comments = ({ comments, newsId }) => {
  const [text, setText] = useState("");

  const user = useSelector(selectCurrentUser);

  const [createComment] = useCreateCommentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const comment = await createComment({
        comment: { text, user, createdAt: Date.now() },
        newsId,
      }).unwrap();
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <div className="w-full bg-[#ffffff] border border-[#dfdfdf] my-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <img src={bigCommentsImage} />
          <div className="flex gap-2 items-center relative left-14">
            <img src={commentImage} />
            <div>
              <h6 className="sm:text-lg text-sm">نظرات کاربران</h6>
              <p className="font-bold text-primary text-sm sm:text-base">
                دیدگاه خود را وارد کنید !
              </p>
            </div>
          </div>
        </div>
        <span className="tracking-[15px] text-[#ececec] hidden sm:block text-2xl pl-7">
          COMMENTS
        </span>
      </div>
      {user ? (
        <div className="p-4">
          <form
            onSubmit={submitHandler}
            className="h-full w-full flex flex-col"
          >
            <textarea
              placeholder="دیدگاه خود را وارد کنید"
              className="w-full p-2 border-2 border-primary rounded-md focus:border-primary focus:outline-none"
              id="comment"
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-orange rounded-md py-1 px-4 text-white self-end mt-2 hover:bg-primary transition-all"
              type="submit"
            >
              ارسال
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Link to="/auth" className="bg-orange p-2 rounded-lg text-white">
            ثبت نام کنید
          </Link>
        </div>
      )}

      <div className="p-4 text-justify">
        <ul>
          {[...comments].reverse().map((item) => (
            <li key={item._id} className="bg-[#f5f5f5] w-full p-4 mt-1">
              <p className="flex justify-between items-center">
                <strong className="text-orange">{item?.user?.name}</strong>
                <span>
                  {new Date(item.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="mt-1 text-sm">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
