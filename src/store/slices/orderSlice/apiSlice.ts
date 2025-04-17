import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";

export const ordersApi: any = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getOrders: builder.query<
      any,
      { page: number; limit: number; createdBy: string }
    >({
      query: ({ page, limit, createdBy }) => ({
        url: `/${ADMIN}/all-orders?createdBy=${createdBy}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    updateOrderTrend: builder.mutation<any, Partial<any>>({
      query: (order) => ({
        url: `/${ADMIN}/update-order-trend/${order.OrderID}`,
        method: "PATCH",
        body: {
          IsTrending: order.IsTrending,
        },
      }),
    }),
    getOrderDetails: builder.query<any, string>({
      query: (orderId) => ({
        url: `/${ADMIN}/order-details/${orderId}`,
        method: "GET",
      }),
    }),
    getOrderOffers: builder.query<
      any,
      { orderId: string; page?: number; limit?: number }
    >({
      query: ({ orderId, page, limit }) => ({
        url: `/${ADMIN}/all-offers?orderId=${orderId}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateOrderTrendMutation,
  useGetOrderDetailsQuery,
  useGetOrderOffersQuery,
} = ordersApi;
