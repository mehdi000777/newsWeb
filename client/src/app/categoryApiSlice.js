import { apiSlice } from "./api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategorys: builder.query({
      query: () => "/api/category",
      providesTags: ["Category"],
      transformResponse: (response) => {
        const categoies = response.map((item) => {
          const categoryObj = {
            ...item,
            name: item.title,
            link: `/archive/${item._id}`,
          };

          return categoryObj;
        });

        return categoies;
      },
    }),
    createCategory: builder.mutation({
      query: (title) => ({
        url: "/api/category",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ title, id }) => ({
        url: `/api/category/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategorysQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
