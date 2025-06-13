import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { buildQueryParams } from "../../../utills/buildQueryParams";
export const adminAuthApi = createApi({
    reducerPath: "adminAuthApi",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/admin/authentication",
                method: "POST",
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "GET",
            }),
        }),
        getUserInfo: builder.query({
            query: (userId) => ({
                url: `/admin/get-user-details/${userId}`,
                method: "GET",
            }),
        }),
        updateUserInfo: builder.mutation({
            query: (credentials) => ({
                url: `/admin/update-user-details/${credentials.userId}`,
                method: "PATCH",
                body: credentials,
            }),
        }),
        updateUserVerification: builder.mutation({
            query: (credentials) => ({
                url: `/admin/update-verification/${credentials.userId}`,
                method: "PATCH",
                body: credentials,
            }),
        }),
        UpdateProfileVideoVerification: builder.mutation({
            query: (credentials) => ({
                url: `/admin/update-profile-video-verification/${credentials.userId}`,
                method: "PATCH",
                body: credentials,
            }),
        }),
        UpdateUserDocumentVerification: builder.mutation({
            query: (credentials) => ({
                url: `/admin/update-document-verification/${credentials.userId}`,
                method: "PATCH",
                body: credentials,
            }),
        }),
        getUsers: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/admin/get-all-users?${queryString}`,
                    method: "GET",
                };
            },
        }),
        getUserDevices: builder.query({
            query: ({ page, limit, uId }) => ({
                url: `/admin/get-user-devices?page=${page}&limit=${limit}&userID=${uId}`,
                method: "GET",
            }),
        }),
    }),
});
export const { useLoginMutation, useGetUserQuery, useGetUserInfoQuery, useUpdateUserInfoMutation, useUpdateUserVerificationMutation, useGetUsersQuery, useGetUserDevicesQuery, useUpdateProfileVideoVerificationMutation, useUpdateUserDocumentVerificationMutation, } = adminAuthApi;
