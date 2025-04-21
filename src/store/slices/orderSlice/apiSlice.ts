import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";

export const ordersApi: any = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getOrders: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        createdBy?: string;
        sortBy?: string;
        sort?: "asc" | "desc";
        search?: string;
      }
    >({
      query: (paramsObj) => {
        const queryString = buildQueryParams(paramsObj);
        return {
          url: `/${ADMIN}/all-orders?${queryString}`,
          method: "GET",
        };
      },
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
    createProduct: builder.mutation<any, Partial<any>>({
      query: (productData) => ({
        url: `/${ADMIN}/create-product`,
        method: "POST",
        body: productData,
      }),
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useUpdateOrderTrendMutation,
  useGetOrderDetailsQuery,
  useGetOrderOffersQuery,
  useCreateProductMutation
} = ordersApi;
