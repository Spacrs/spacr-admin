import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../../../constants/apiEndpoints";
import { baseQueryWithInterceptor } from "../../baseQuery";
export const costApi = createApi({
    reducerPath: "costApi",
    baseQuery: baseQueryWithInterceptor,
    tagTypes: ["Cost"],
    endpoints: (builder) => ({
        // 🔹 GET Cost List
        getCostsList: builder.query({
            query: (params) => ({
                url: `${API.ADMIN.MONTHLY_COST}`,
                params,
            }),
            transformResponse: (result) => {
                console.log("Raw cost data from API:", result);
                const formattedData = (result.data || []).map((item) => {
                    if (!item.Month)
                        return item;
                    const [year, month] = item.Month.split("-");
                    const date = new Date(Number(year), Number(month) - 1);
                    return {
                        ...item,
                        Month: date.toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                        }),
                    };
                });
                return {
                    data: formattedData,
                    pagination: result.pagination,
                };
            },
            providesTags: ["Cost"],
        }),
        // 🔹 GET by ID
        getCostById: builder.query({
            query: (id) => `${API.ADMIN.MONTHLY_COST}/${id}`,
            providesTags: ["Cost"],
        }),
        // 🔹 ADD
        addCost: builder.mutation({
            query: (body) => ({
                url: `${API.ADMIN.MONTHLY_COST}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cost"],
        }),
        // 🔹 UPDATE
        updateCost: builder.mutation({
            query: ({ id, body }) => ({
                url: `${API.ADMIN.MONTHLY_COST}/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Cost"],
        }),
        // 🔹 DELETE
        deleteCost: builder.mutation({
            query: (id) => ({
                url: `${API.ADMIN.MONTHLY_COST}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cost"],
        }),
    }),
});
export const { useGetCostsListQuery, useGetCostByIdQuery, useAddCostMutation, useUpdateCostMutation, useDeleteCostMutation, } = costApi;
