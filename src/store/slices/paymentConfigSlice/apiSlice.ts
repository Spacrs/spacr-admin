import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { buildQueryParams } from "../../../utills/buildQueryParams";

export const paymentConfigApi: any = createApi({
  reducerPath: "paymentConfigApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getPaymentConfigs: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        isPagination?: boolean;
        sortBy?: string;
        sort?: "asc" | "desc";
        search?: string;
      }
    >({
      query: ({ page, limit, sortBy, sort, isPagination, search }) => {
        const queryParams: Record<string, any> = {
          ...(isPagination && page ? { page } : {}),
          ...(isPagination && limit ? { limit } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(sort ? { sort } : {}),
          ...(search ? { search } : {}),
        };
        const queryString = buildQueryParams(queryParams);
        return {
          url: `/payment-config${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
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
          body: val,
        };
      },
    }),

    //Added on 11-03-2025

    addPaymentConfig: builder.mutation<any, Partial<any>>({
      query: (data) => {
        return {
          url: `/payment-config`,
          method: "POST",
          body: data,
        };
      },
    }),

    //Added on 11-03-2025

    //Added on 12-03-2025

    addCity: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: `/city`,
        method: "POST",
        body: data,
      }),
    }),

    //Added on 12-03-2025
    getCities: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        isPagination?: boolean;
        sortBy?: string;
        sort?: "asc" | "desc";
        search?: string;
      }
    >({
      query: ({ page, limit, isPagination = true, sortBy, sort, search }) => {
        const queryParams: Record<string, any> = {
          ...(isPagination && page ? { page } : {}),
          ...(isPagination && limit ? { limit } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(sort ? { sort } : {}),
          ...(search ? { search } : {}),
        };
        const queryString = buildQueryParams(queryParams);

        return {
          url: `/city/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetPaymentConfigsQuery,
  useUpdatePaymentConfigMutation,
  useAddPaymentConfigMutation,
  useAddCityMutation,
  useGetCitiesQuery,
} = paymentConfigApi;
