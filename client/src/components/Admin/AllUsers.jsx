import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  userApiSlice,
} from "../../app/userApiSlice";
import store from "../../app/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/authSlice";
import { toast } from "react-toastify";

const AllUsers = () => {
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    store.dispatch(
      userApiSlice.util.prefetch("getAllUsers", "usersList", {
        force: true,
      })
    );
  }, []);

  const { data, isLoading } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id) => {
    if (confirm("آیا می خواهید این کاربر را حذف کنید؟")) {
      const toastId = toast.loading("Deleting User...");
      try {
        const res = await deleteUser(id).unwrap();

        toast.update(toastId, {
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          type: "success",
          render: res?.data?.message,
        });
      } catch (error) {
        toast.update(toastId, {
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          type: "error",
          render: error?.data?.message ?? error?.message,
        });
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "نام",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "edit",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {user?._id === params.id ? (
              <p className="w-full h-full text-center mt-3 font-bold text-lg">
                شما
              </p>
            ) : (
              <Link to={`/admin/users/${params.id}`}>
                <Button>
                  <AiOutlineEdit size={20} />
                </Button>
              </Link>
            )}
          </>
        );
      },
    },
    {
      field: "delete",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleDeleteUser(params.id)}
              disabled={params.id === user?._id}
            >
              <AiOutlineDelete
                size={20}
                color={params.id === user?._id ? "gray" : "red"}
              />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="w-96 md:w-full md:mx-6 pt-1 mt-10 bg-white">
        <DataGrid
          className="w-96 md:w-full"
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data) || []}
          columns={columns}
          disableSelectionOnClick
          pageSizeOptions={[10, 50, 100]}
        />
      </div>
    </>
  );
};

export default AllUsers;
