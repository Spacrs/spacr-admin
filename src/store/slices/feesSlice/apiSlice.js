// src/store/slices/fees/feesApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";
export const feesApi = createApi({
    reducerPath: "feesApi",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getFees: builder.query({
            query: (paramsObj) => {
                const queryString = buildQueryParams(paramsObj);
                return {
                    url: `/${ADMIN}/get-system-fees?${queryString}`,
                    method: "GET",
                };
            },
        }),
        getFeeDetails: builder.query({
            query: (id) => ({
                url: `/${ADMIN}/get-system-fees/${id}`,
                method: "GET",
            }),
        }),
        createFee: builder.mutation({
            query: (data) => ({
                url: `/${ADMIN}/add-system-fees`,
                method: "POST",
                body: data,
            }),
        }),
        updateFee: builder.mutation({
            query: (data) => ({
                url: `/${ADMIN}/update-system-fees`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteFee: builder.mutation({
            query: (id) => ({
                url: `/${ADMIN}/system-fees/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});
export const { useGetFeesQuery, useGetFeeDetailsQuery, useCreateFeeMutation, useUpdateFeeMutation, useDeleteFeeMutation, } = feesApi;
