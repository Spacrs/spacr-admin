import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { buildQueryParams } from "../../../utills/buildQueryParams";
export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        sendNotification: builder.mutation({
            query: (credentials) => ({
                url: "/notification",
                method: "POST",
                body: credentials,
            }),
        }),
        getNotifications: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/notification?${queryString}`,
                    method: "GET",
                };
            },
        }),
        getAllUserNotifications: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/notification/users?${queryString}`,
                    method: "GET",
                };
            },
        }),
    }),
});
export const { useSendNotificationMutation, useGetNotificationsQuery, useGetAllUserNotificationsQuery, } = notificationApi;
