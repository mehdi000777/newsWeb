import { apiSlice } from "./api/apiSlice";

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliderNews: builder.query({
      query: () => "/api/news/slider",
      providesTags: ["News"],
    }),
    getPopularNews: builder.query({
      query: () => "/api/news/popular",
      providesTags: ["News"],
    }),
    getVisitedNews: builder.query({
      query: () => "/api/news/visited",
      providesTags: ["News"],
    }),
    getlatestNews: builder.query({
      query: () => "/api/news/Latest",
      providesTags: ["News"],
    }),
    getAllNews: builder.query({
      query: ({ page = 0, pageSize = "10", search = "", searchParam = "" }) =>
        `/api/news?page=${page}&pageSize=${pageSize}&searchParam=${searchParam}&search=${search}`,
      providesTags: ["News"],
    }),
    getNews: builder.query({
      query: (newsId) => `/api/news/${newsId}`,
      providesTags: ["News"],
    }),
    editVisitNews: builder.mutation({
      query: (newsId) => ({
        url: `/api/news/${newsId}/visit`,
        method: "PATCH",
      }),
    }),
    likeNews: builder.mutation({
      query: ({ id, type }) => ({
        url: `/api/news/${id}/like`,
        method: "PATCH",
        body: { type },
      }),
      invalidatesTags: ["News"],
    }),
    getNewsByCategory: builder.query({
      query: (category_id) => `/api/news/category/${category_id}`,
      providesTags: ["News"],
    }),
    createNews: builder.mutation({
      query: (news) => ({
        url: "/api/news",
        method: "POST",
        body: { ...news },
      }),
      invalidatesTags: ["News"],
    }),
    editNews: builder.mutation({
      query: ({ news, newsId }) => ({
        url: `/api/news/${newsId}`,
        method: "PUT",
        body: news,
      }),
      invalidatesTags: ["News"],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/api/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetSliderNewsQuery,
  useLazyGetPopularNewsQuery,
  useLazyGetVisitedNewsQuery,
  useGetVisitedNewsQuery,
  useGetPopularNewsQuery,
  useGetlatestNewsQuery,
  useLazyGetAllNewsQuery,
  useGetAllNewsQuery,
  useGetNewsQuery,
  useEditVisitNewsMutation,
  useLikeNewsMutation,
  useGetNewsByCategoryQuery,
  useCreateNewsMutation,
  useEditNewsMutation,
  useDeleteNewsMutation,
} = newsApiSlice;
