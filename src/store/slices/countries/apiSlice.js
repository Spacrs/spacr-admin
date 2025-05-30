import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
export const countriesConfigApi = createApi({
    reducerPath: "countriesConfigApi",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: ({ page, limit, isPagination = true, search }) => {
                const params = new URLSearchParams();
                if (isPagination) {
                    if (page != null)
                        params.append("page", String(page));
                    if (limit)
                        params.append("limit", String(limit));
                }
                if (search) {
                    params.append("search", search);
                }
                const queryString = params.toString();
                return {
                    url: `/country${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                };
            },
        }),
        getCountryCity: builder.query({
            query: () => ({
                url: `/country-city`,
                method: "GET",
            }),
        }),
    }),
});
export const { useGetCountriesQuery, useGetCountryCityQuery } = countriesConfigApi;
