import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const paymentConfigApi: any = createApi({
  reducerPath: "paymentConfigApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getPaymentConfigs: builder.query<any, void>({
      query: () => ({
        url: `/payment-config/`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    updatePaymentConfig: builder.mutation<any, Partial<any>>({
      query: (credentials) => {
        const val = {
          wallet: credentials.wallet,
          COD: credentials.COD,
          stripe: credentials.stripe,
        };
        return ({
        url: `/payment-config/update/${credentials.Id}`,
        method: "PATCH",
        body: val,
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })},
    }),
  }),
});

export const { useGetPaymentConfigsQuery, useUpdatePaymentConfigMutation } =
  paymentConfigApi;
