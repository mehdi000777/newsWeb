import { apiSlice } from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/api/user",
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `/api/user/${id}`,
        method: "PATCH",
        body: { isAdmin },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
