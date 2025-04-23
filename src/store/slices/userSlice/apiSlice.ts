import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { buildQueryParams } from "../../../utills/buildQueryParams";
import { UserData, UserDevice } from "../../../types/UserData.types";
import { Pagination } from "../../../types/Pagination.type";
export interface LoginRequest {
  secret: string;
}
export interface UserInfoRequest {
  userId: string;
}

export interface UserInfoResponse {
  data: UserData[];
  pagination: Pagination;
  message: string;
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
      UserInfoResponse,
      {
        page?: number;
        limit?: number;
        verified?: string;
        search?: string;
        sortBy?: string;
        sort?: "asc" | "desc";
      }
    >({
      query: (paramsObj) => {
        const queryString = buildQueryParams(paramsObj);
        return {
          url: `/admin/get-all-users?${queryString}`,
          method: "GET",
        };
      },
    }),
    getUserDevices: builder.query<
      any,
      { page: number; limit: number; uId: string }
    >({
      query: ({ page, limit, uId }) => ({
        url: `/admin/get-user-devices?page=${page}&limit=${limit}&userID=${uId}`,
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
  useGetUserDevicesQuery,
} = adminAuthApi;
