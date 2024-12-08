import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditCategoryMutation,
  useGetAllCategorysQuery,
} from "../../app/categoryApiSlice";

const EditCategory = () => {
  const { id } = useParams();

  const { category } = useGetAllCategorysQuery("categorysList", {
    selectFromResult: ({ data }) => ({
      category: data?.find((item) => item?._id === id),
    }),
  });

  const [editCategory] = useEditCategoryMutation();

  const [title, setTitle] = useState(category?.title);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Uploading Category...");
    try {
      const res = await editCategory({ title, id }).unwrap();

      toast.update(toastId, {
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        type: "success",
        render: res?.data?.message,
      });

      navigate("/admin/category");
    } catch (error) {
      toast.update(toastId, {
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        type: "error",
        render: error?.data?.message ?? error?.message,
      });
    }
  };

  return (
    <div className="w-[90%] lg:w-[80%] bg-white shadow-lg mt-2 h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] text-center">ویرایش موضوع</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            موضوع <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="موضوع را وارد کنید..."
          />
        </div>
        <div>
          <input
            type="submit"
            value="بروزرسانی"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;