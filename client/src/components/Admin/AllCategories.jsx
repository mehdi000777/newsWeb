import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetAllCategorysQuery,
} from "../../app/categoryApiSlice";
import store from "../../app/store";
import { categoryApiSlice } from "../../app/categoryApiSlice";
import { toast } from "react-toastify";

const AllCategories = () => {
  useEffect(() => {
    store.dispatch(
      categoryApiSlice.util.prefetch("getAllCategorys", "categorysList", {
        force: true,
      })
    );
  }, []);

  const { data, isLoading } = useGetAllCategorysQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const deleteHandler = async (id) => {
    if (confirm("آیا می خواهید این آیتم را حذف کنید؟")) {
      const toastId = toast.loading("Category Deleting...");
      try {
        const res = await deleteCategory(id).unwrap();

        toast.update(toastId, {
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          render: res.data?.message ?? "Category Deleted",
          type: "success",
        });
      } catch (error) {
        toast.update(toastId, {
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          render: error.data?.message ?? error?.message,
          type: "error",
        });
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", minWidth: 150, flex: 0.7 },
    {
      field: "title",
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
            <Link to={`/admin/category/${params.id}`}>
              <Button>
                <AiOutlineEdit size={20} />
              </Button>
            </Link>
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
            <Button onClick={() => deleteHandler(params.id)}>
              <AiOutlineDelete size={20} color="red" />
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

export default AllCategories;
