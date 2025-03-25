import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const ordersApi: any = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getOrders: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/admin/all-orders?page=${page}&limit=${limit}`, // ✅ Corrected endpoint
        method: "GET",
      }),
    }),
    updateOrderTrend: builder.mutation<any, Partial<any>>({
      query: (order) => ({
        url: `/admin/update-order-trend/${order.OrderID}`, // ✅ Corrected endpoint
        method: "PATCH",
        body: {
          IsTrending: order.IsTrending,
        },
      }),
    }),
    getOrderDetails: builder.query<any, string>({
      query: (orderId) => ({
        url: `/admin/order-details/${orderId}`,
        method: "GET",
      }),
    }),
    getOrderOffers: builder.query<
      any,
      { orderId: string; page?: number; limit?: number }
    >({
      query: ({ orderId, page, limit }) => ({
        url: `/admin/all-offers?orderId=${orderId}&page=${page}&limit=${limit}`,
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
