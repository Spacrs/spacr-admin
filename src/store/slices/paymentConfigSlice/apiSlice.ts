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
    getPaymentConfigById: builder.query<any, { countryId: number }>({
      query: (countryId) => {
        return {
          url: `/payment-config/${countryId}`,
          method: "GET",
        };
      },
    }),
    updatePaymentConfig: builder.mutation<any, Partial<any>>({
      query: (credentials) => {
        return {
          url: `/payment-config/update/${credentials.countryId}`,
          method: "PATCH",
          body: credentials.data,
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
    updateCity: builder.mutation<any, Partial<any>>({
      query: (credentials) => ({
        url: `/city/${credentials.cityId}`,
        method: "PATCH",
        body: credentials.data,
      }),
    }),
    getCityById: builder.query<any, { cityId: number }>({
      query: (cityId) => {
        return {
          url: `/city/city-detail/${cityId}`,
          method: "GET",
        };
      },
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
  useGetPaymentConfigByIdQuery,
  useUpdatePaymentConfigMutation,
  useAddPaymentConfigMutation,
  useAddCityMutation,
  useGetCitiesQuery,
  useUpdateCityMutation,
  useGetCityByIdQuery,
} = paymentConfigApi;
