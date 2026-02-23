import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { buildQueryParams } from "../../../utills/buildQueryParams";

type NotificationPayload = {
  title: string;
  body: string;
  notificationType: "send_notification" | string; 
  // scheduleDate?: string; // ISO string like "2025-04-27T00:00:00Z"
  // scheduleTime?: string; // format: "HH:mm:ss"
  sendToAllUsers: boolean;
  userIds?: string[]; // required only if sendToAllUsers is false
};

export const notificationApi: any = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    sendNotification: builder.mutation<any, NotificationPayload>({
      query: (credentials) => ({
        url: "/notification",
        method: "POST",
        body: credentials,
      }),
    }),
    getNotifications: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sort?: "asc" | "desc";
        type?: string;
      }
    >({
      query: (paramsObj) => {
        const queryString = buildQueryParams(paramsObj);
        return {
          url: `/notification?${queryString}`,
          method: "GET",
        };
      },
    }),
    getAllUserNotifications: builder.query<
      any,
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
          url: `/notification/users?${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSendNotificationMutation,
  useGetNotificationsQuery,
  useGetAllUserNotificationsQuery,
} = notificationApi;
