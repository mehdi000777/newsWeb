import React, { useEffect, useState } from "react";
import { useGetNewsQuery } from "../../app/newsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useGetAllCategorysQuery } from "../../app/categoryApiSlice";
import { useEditNewsMutation } from "../../app/newsApiSlice";
import { toast } from "react-toastify";
import { checkImage, imageUpload } from "../../utils";

const EditNews = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGetNewsQuery(id);
  const { data: categoriesData } = useGetAllCategorysQuery();

  const [editNews] = useEditNewsMutation();

  const [thumbnale, setThumbnale] = useState();
  const [coverImage, setCoverImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [text, setText] = useState();
  const [slider, setSlider] = useState();

  useEffect(() => {
    setThumbnale(data?.thumbnale);
    setCoverImage(data?.coverImage);
    setTitle(data?.title);
    setDescription(data?.description);
    setCategory(data?.category?._id);
    setText(data?.text);
    setSlider(data?.slider);
  }, [data]);

  const handleThumbanleChange = (e) => {
    const file = e.target.files[0];

    const check = checkImage(file);
    if (check.length !== 0) return toast.error(check[0]);

    setThumbnale(file);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];

    const check = checkImage(file);
    if (check.length !== 0) return toast.error(check[0]);

    setCoverImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating News...");
    try {
      let thubmnaleUrl;
      let coverUrl;
      if (typeof thumbnale !== "string")
        thubmnaleUrl = await imageUpload(thumbnale);
      if (typeof coverImage !== "string")
        coverUrl = await imageUpload(coverImage);

      const res = await editNews({
        newsId: id,
        news: {
          thumbnale: thubmnaleUrl?.url ?? thumbnale,
          coverImage: coverUrl?.url ?? coverImage,
          categoryId: category,
          title,
          description,
          text,
          slider,
        },
      }).unwrap();

      toast.update(toastId, {
        render: res.data?.message ?? "News Updated",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 5000,
      });

      navigate("/admin/news");
    } catch (error) {
      toast.update(toastId, {
        render: error?.data?.message ?? error?.message,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="w-[90%] lg:w-[80%] bg-white shadow-lg mt-2 h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] text-center">ساخت خبر جدید</h5>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              تیتر <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="تیتر خبر را وارد کنید"
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              توضیحات <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="8"
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات خبر را وارد کنید..."
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              موضوع <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category">یک موضوع را انتخاب کنید</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i._id} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">
              متن <span className="text-red-500">*</span>
            </label>
            <Editor text={text} setText={setText} />
          </div>
          <br />
          <div>
            <label className="pb-2">
              تصویر بزرگ <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name=""
              id="cover"
              className="hidden"
              onChange={handleCoverImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              {coverImage ? (
                <AiOutlineMinusCircle
                  size={30}
                  className="mt-3 cursor-pointer"
                  color="#555"
                  onClick={() => setCoverImage()}
                />
              ) : (
                <label htmlFor="cover">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3 cursor-pointer"
                    color="#555"
                  />
                </label>
              )}
              {coverImage && (
                <img
                  src={
                    typeof coverImage === "string"
                      ? coverImage
                      : URL.createObjectURL(coverImage)
                  }
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              )}
            </div>
            <br />
          </div>
          <div>
            <label className="pb-2">
              تصویر کوچک <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name=""
              id="thumbnale"
              className="hidden"
              onChange={handleThumbanleChange}
            />
            <div className="w-full flex items-center flex-wrap">
              {thumbnale ? (
                <AiOutlineMinusCircle
                  size={30}
                  className="mt-3 cursor-pointer"
                  color="#555"
                  onClick={() => setThumbnale()}
                />
              ) : (
                <label htmlFor="thumbnale">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3 cursor-pointer"
                    color="#555"
                  />
                </label>
              )}
              {thumbnale && (
                <img
                  src={
                    typeof thumbnale === "string"
                      ? thumbnale
                      : URL.createObjectURL(thumbnale)
                  }
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              )}
            </div>
            <br />
          </div>
          <br />
          <div className="flex items-center gap-2">
            <label>در اسلایدر نمایش داده شود</label>
            <input
              type="checkbox"
              name="slider"
              checked={slider}
              onChange={() => setSlider(!slider)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="بروز رسانی"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditNews;
