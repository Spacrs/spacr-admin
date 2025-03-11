import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const paymentConfigApi: any = createApi({
  reducerPath: "paymentConfigApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getPaymentConfigs: builder.query<any, { page?: number; limit?: string }>({
      query: ({ page, limit }) => ({
        url: `/payment-config/?page=${page}${limit ? `&limit=${limit}` : ""}`,
        method: "GET"
      }),
    }),
    updatePaymentConfig: builder.mutation<any, Partial<any>>({
      query: (credentials) => {
        const val = {
          wallet: credentials.wallet,
          COD: credentials.COD,
          stripe: credentials.stripe,
        };
        return {
          url: `/payment-config/update/${credentials.Id}`,
          method: "PATCH",
          body: val
        };
      },
    }),

    //Added on 11-03-2025

    addPaymentConfig: builder.mutation<any, Partial<any>>({
      query: (data) => {
        
        return {
          url: `/payment-config`,
          method: "POST",
          body: data
        };
      },
    }),

    //Added on 11-03-2025

  }),
});

export const { useGetPaymentConfigsQuery, useUpdatePaymentConfigMutation, useAddPaymentConfigMutation } =
  paymentConfigApi;
