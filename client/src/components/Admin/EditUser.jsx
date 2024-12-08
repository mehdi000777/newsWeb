import React, { useEffect, useState } from "react";
import {
  useEditUserMutation,
  useGetAllUsersQuery,
} from "../../app/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const [isAdmin, setIsAdmin] = useState();

  const { id } = useParams();

  const { user } = useGetAllUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.find((item) => item?._id === id),
    }),
  });

  useEffect(() => {
    setIsAdmin(user?.isAdmin);
  }, [user]);

  const [editUser] = useEditUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating User...");
    try {
      const res = await editUser({ id, isAdmin }).unwrap();

      toast.update(toastId, {
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        type: "success",
        render: res?.data?.message,
      });

      navigate("/admin/users");
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
      <h5 className="text-[30px] text-center">ویرایش کاربر</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div className="flex items-center gap-3">
          <label className="">سطح دسترسی ادمین</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={isAdmin}
            className=""
            onChange={(e) => setIsAdmin(!isAdmin)}
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

export default EditUser;
