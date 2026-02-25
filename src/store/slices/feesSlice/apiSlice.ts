// src/store/slices/fees/feesApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";

export interface FeeData {
  Id: number;
  BuyerProtectionFees: number;
  PaymentFees: number;
  PlatformFees: number;
  PayoutFees: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export const feesApi = createApi({
  reducerPath: "feesApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getFees: builder.query<
      { data: FeeData[]; pagination?: any },
      { page?: number; limit?: number; search?: string; sortBy?: string; sort?: "asc" | "desc" }
    >({
      query: (paramsObj) => {
        const queryString = buildQueryParams(paramsObj);
        return {
          url: `/${ADMIN}/get-system-fees?${queryString}`,
          method: "GET",
        };
      },
    }),

    getFeeDetails: builder.query<FeeData, number>({
      query: (id) => ({
        url: `/${ADMIN}/get-system-fees/${id}`,
        method: "GET",
      }),
    }),

    createFee: builder.mutation<any, Partial<FeeData>>({
      query: (data) => ({
        url: `/${ADMIN}/add-system-fees`,
        method: "POST",
        body: data,
      }),
    }),

    updateFee: builder.mutation<any, Partial<FeeData>>({
      query: (data) => ({
        url: `/${ADMIN}/update-system-fees`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteFee: builder.mutation<any, number>({
      query: (id) => ({
        url: `/${ADMIN}/system-fees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFeesQuery,
  useGetFeeDetailsQuery,
  useCreateFeeMutation,
  useUpdateFeeMutation,
  useDeleteFeeMutation,
} = feesApi;
