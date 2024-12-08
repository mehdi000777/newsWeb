import { apiSlice } from "./api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: userData => ({
                url: "api/auth/login",
                method: "POST",
                body: { ...userData }
            })
        }),
        register: builder.mutation({
            query: userData => ({
                url: "api/auth/register",
                method: "POST",
                body: { ...userData }
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "api/auth/refresh",
                method: "GET"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "api/auth/logout",
                method: "POST"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogOutMutation
} = authApiSlice;