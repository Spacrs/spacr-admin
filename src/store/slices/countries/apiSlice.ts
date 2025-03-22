import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const countriesConfigApi: any = createApi({
  reducerPath: "countriesConfigApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getCountries: builder.query<
      any,
      { page?: number; limit?: string; isPagination?: boolean; search?: string }
    >({
      query: ({ page, limit, isPagination = true, search }) => {
        const query = isPagination
          ? `page=${page}${limit ? `&limit=${limit}` : ""}`
          : "";
        return {
          url: `/country/?${query}${search ? "&search=" + search : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCountriesQuery } = countriesConfigApi;
