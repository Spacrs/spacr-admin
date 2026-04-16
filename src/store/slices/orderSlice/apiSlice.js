import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQueryV5";
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
        // getScrapingIcons: builder.query<any, string>({
        //   query: () => ({
        //     url: `/order/get-scraping-icons`,
        //     method: "GET",
        //   }),
        // }),
        getScrapingIcons: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/order/get-scraping-icons?${queryString}`,
                    method: "GET",
                };
            },
        }),
        // getReferralCodes: builder.query<any, string>({
        //   query: () => ({
        //     url: `/${ADMIN}/get-all-referral-codes`,
        //     method: "GET",
        //   }),
        // }),
        getReferralCodes: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/${ADMIN}/get-all-referral-codes?${queryString}`,
                    method: "GET",
                };
            },
        }),
        getReferralCodeDetails: builder.query({
            query: (referralCodeID) => ({
                url: `/${ADMIN}/get-users-who-redeemed-code/${referralCodeID}`,
                method: "GET",
            }),
        }),
        getTravelListing: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/${ADMIN}/get-all-travel-listing?${queryString}`,
                    method: "GET",
                };
            },
        }),
        getTransactionList: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                const token = localStorage.getItem("access_token") || undefined;
                return {
                    url: `/transaction/transactions?${queryString}`,
                    method: "GET",
                    headers: {
                        "x-admin-secret": token,
                    },
                };
            },
        }),
        getTransactionDetails: builder.query({
            query: (transactionId) => {
                const queryString = buildQueryParams(transactionId);
                const token = localStorage.getItem("access_token") || undefined;
                return {
                    url: `/transaction/admin_transactions/${transactionId}`,
                    method: "GET",
                    headers: {
                        "x-admin-secret": token,
                    },
                };
            },
        }),
        getWithdrawalList: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                const token = localStorage.getItem("access_token") || undefined;
                return {
                    url: `/admin-wallet/withdrawals?${queryString}`,
                    method: "GET",
                    headers: {
                        "x-admin-secret": token,
                    },
                };
            },
        }),
        getWithdrawalDetails: builder.query({
            query: (withdrawalId) => {
                const queryString = buildQueryParams(withdrawalId);
                const token = localStorage.getItem("access_token") || undefined;
                return {
                    url: `/admin-wallet/withdrawals/${withdrawalId}`,
                    method: "GET",
                    headers: {
                        "x-admin-secret": token,
                    },
                };
            },
        }),
        updateWithdrawalStatus: builder.mutation({
            query: ({ withdrawalId, status, reason }) => {
                const token = localStorage.getItem("access_token") || undefined;
                return {
                    url: `/admin-wallet/withdrawals/${withdrawalId}/update-status`,
                    method: "PUT",
                    headers: {
                        "x-admin-secret": token,
                    },
                    body: reason ? { status, reason } : { status },
                };
            },
        }),
    }),
});
export const { useGetOrdersQuery, useUpdateOrderTrendMutation, useGetOrderDetailsQuery, useGetOrderOffersQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteOrderMediaMutation, useGetScrapingIconsQuery, useGetReferralCodesQuery, useGetReferralCodeDetailsQuery, useGetTravelListingQuery, useGetTransactionListQuery, useGetTransactionDetailsQuery, useGetWithdrawalListQuery, useGetWithdrawalDetailsQuery, useUpdateWithdrawalStatusMutation } = ordersApi;
