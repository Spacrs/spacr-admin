import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";
import { ProductData } from "../../../types/ProductData.types";

export const ordersApi: any = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getOrders: builder.query<
      { data: ProductData[] },
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
      query: (productData) => {
        return {
          url: `/${ADMIN}/create-product`,
          method: "POST",
          body: productData,
        };
      },
    }),
    updateProduct: builder.mutation<any, Partial<any>>({
      query: (productData) => {
        const OrderID = productData.get("OrderID");
        console.log(OrderID,"productData.OrderID")
        return {
          url: `/${ADMIN}/update-product/${OrderID}`,
          method: "PATCH",
          body: productData,
        };
      },
    }),
    deleteOrderMedia: builder.mutation<any, Partial<any>>({
      query: (productData) => {
        return {
          url: `/${ADMIN}/media/update-media-relation`,
          method: "PATCH",
          body: productData,
        };
      },
    }),
    getScrapingIcons: builder.query<any, string>({
      query: () => ({
        url: `/order/get-scraping-icons`,
        method: "GET",
      }),
    }),
    // getReferralCodes: builder.query<any, string>({
    //   query: () => ({
    //     url: `/${ADMIN}/get-all-referral-codes`,
    //     method: "GET",
    //   }),
    // }),
    
    getReferralCodes: builder.query<
      { data: ProductData[] },
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
          url: `/${ADMIN}/get-all-referral-codes?${queryString}`,
          method: "GET",
        };
      },
    }),
    getReferralCodeDetails: builder.query<any, string>({
      query: (referralCodeID) => ({
        url: `/${ADMIN}/get-users-who-redeemed-code/${referralCodeID}`,
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteOrderMediaMutation,
  useGetScrapingIconsQuery,
  useGetReferralCodesQuery,
  useGetReferralCodeDetailsQuery
} = ordersApi;
