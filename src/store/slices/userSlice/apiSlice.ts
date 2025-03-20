import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export interface LoginRequest {
  secret: string;
}
export interface UserInfoRequest {
  userId: string;
}

export const adminAuthApi: any = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: "/admin/authentication",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<any, void>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
    }),
    getUserInfo: builder.query<any, void>({
      query: (userId) => ({
        url: `/admin/get-user-details/${userId}`,
        method: "GET",
      }),
    }),
    updateUserInfo: builder.mutation<any, UserInfoRequest>({
      query: (credentials) => ({
        url: `/admin/update-user-details/${credentials.userId}`,
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateUserVerification: builder.mutation<any, UserInfoRequest>({
      query: (credentials) => ({
        url: `/admin/update-verification/${credentials.userId}`,
        method: "PATCH",
        body: credentials,
      }),
    }),
    getUsers: builder.query<
      any,
      { page: number; verified?: string; search?: string }
    >({
      query: ({ page, verified, search }) => ({
        url: `/admin/get-all-users?page=${page}${
          verified ? `&verified=${verified}` : ""
        }${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserVerificationMutation,
  useGetUsersQuery,
} = adminAuthApi;
