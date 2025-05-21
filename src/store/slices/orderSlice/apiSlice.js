import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";
export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/${ADMIN}/all-orders?${queryString}`,
                    method: "GET",
                };
            },
        }),
        updateOrderTrend: builder.mutation({
            query: (order) => ({
                url: `/${ADMIN}/update-order-trend/${order.OrderID}`,
                method: "PATCH",
                body: {
                    IsTrending: order.IsTrending,
                },
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `/${ADMIN}/order-details/${orderId}`,
                method: "GET",
            }),
        }),
        getOrderOffers: builder.query({
            query: ({ orderId, page, limit }) => ({
                url: `/${ADMIN}/all-offers?orderId=${orderId}&page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        createProduct: builder.mutation({
            query: (productData) => {
                return {
                    url: `/${ADMIN}/create-product`,
                    method: "POST",
                    body: productData,
                };
            },
        }),
        updateProduct: builder.mutation({
            query: (productData) => {
                const OrderID = productData.get("OrderID");
                console.log(OrderID, "productData.OrderID");
                return {
                    url: `/${ADMIN}/update-product/${OrderID}`,
                    method: "PATCH",
                    body: productData,
                };
            },
        }),
        deleteOrderMedia: builder.mutation({
            query: (productData) => {
                return {
                    url: `/${ADMIN}/media/update-media-relation`,
                    method: "PATCH",
                    body: productData,
                };
            },
        }),
        getScrapingIcons: builder.query({
            query: () => ({
                url: `/order/get-scraping-icons`,
                method: "GET",
            }),
        }),
        getReferralCodes: builder.query({
            query: () => ({
                url: `/${ADMIN}/get-all-referral-codes`,
                method: "GET",
            }),
        }),
    }),
});
export const { useGetOrdersQuery, useUpdateOrderTrendMutation, useGetOrderDetailsQuery, useGetOrderOffersQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteOrderMediaMutation, useGetScrapingIconsQuery, useGetReferralCodesQuery } = ordersApi;
