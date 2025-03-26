import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const spacrConfigAPi = createApi({
  reducerPath: "spacrConfigAPi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    updateConfigFeesApi: builder.mutation<any, { CustomFees: number }>({
      query: (customFees) => ({
        url: `/admin/spacr-config/update/`,
        method: "PATCH",
        body: customFees,
      }),
    }),
    getConfigFees: builder.query<any, void>({
      query: () => ({
        url: `/admin/spacr-config/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateConfigFeesApiMutation, useGetConfigFeesQuery } =
  spacrConfigAPi;
