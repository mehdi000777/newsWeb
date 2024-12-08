import { apiSlice } from "./api/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ comment, newsId }) => ({
        url: "/api/comment",
        method: "POST",
        body: { text: comment.text, newsId },
      }),
      async onQueryStarted({ comment, newsId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApiSlice.util.updateQueryData("getNews", newsId, (draft) => {
            draft.comments.push(comment);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateCommentMutation } = commentApiSlice;
