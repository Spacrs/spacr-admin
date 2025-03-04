import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const ordersApi: any = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => ({
        url: `/admin/all-orders`, // ✅ Corrected endpoint
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    updateOrderTrend: builder.mutation<any, Partial<any>>({
      query: (order) => ({
        url: `/admin/update-order-trend/${order.OrderID}`, // ✅ Corrected endpoint
        method: "PATCH",
        body: {
          IsTrending: order.IsTrending,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderTrendMutation } = ordersApi;
