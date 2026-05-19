import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API from "../../../constants/apiEndpoints";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["InvoiceVerification"],

  endpoints: (builder) => ({
    // 🔹 GET Invoice List
    getInvoiceList: builder.query({
      query: (params) => ({
        url: `${API.INVOICE_VERIFICATION.INVOICE_LIST}`,
        params,
      }),
      providesTags: ["InvoiceVerification"],
    }),
    getInvoiceDetails: builder.query<any, string>({
      query: (orderId) => ({
        url: `${API.INVOICE_VERIFICATION.INVOICE_DETAILS}/${orderId}`,
        method: "GET",
      }),
    }),
    updateInvoiceVerificationStatus: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `${API.INVOICE_VERIFICATION.UPDATE_INVOICE_STATUS}/${credentials.orderId}`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    // 🔹 GET by ID
    // getCostById: builder.query({
    //   query: (id) => `${API.ADMIN.MONTHLY_COST}/${id}`,
    //   providesTags: ["Cost"],
    // }),

    // // 🔹 ADD
    // addCost: builder.mutation({
    //   query: (body) => ({
    //     url: `${API.ADMIN.MONTHLY_COST}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Cost"],
    // }),

    // // 🔹 UPDATE
    // updateCost: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `${API.ADMIN.MONTHLY_COST}/${id}`,
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: ["Cost"],
    // }),

    // // 🔹 DELETE
    // deleteCost: builder.mutation({
    //   query: (id) => ({
    //     url: `${API.ADMIN.MONTHLY_COST}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Cost"],
    // }),
  }),
});

export const {
  useGetInvoiceListQuery,
  useGetInvoiceDetailsQuery,
  useUpdateInvoiceVerificationStatusMutation,
  //   useAddCostMutation,
  //   useUpdateCostMutation,
  //   useDeleteCostMutation,
} = invoiceApi;
