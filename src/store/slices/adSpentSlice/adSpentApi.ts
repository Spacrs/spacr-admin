import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../../../constants/apiEndpoints";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const adSpentApi = createApi({
  reducerPath: "adSpentApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["adSpent"],

  endpoints: (builder) => ({
    // 🔹 GET LIST
    getAdSpentList: builder.query({
      query: (params) => ({
        url: API.ADMIN.Ad_SPEND,
        params,
      }),

      transformResponse: (result: any) => {
        const formattedData = (result.data || []).map((item: any) => {
          if (!item.Month) return item;

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

      providesTags: ["adSpent"], // 🔥 IMPORTANT
    }),

    // 🔹 GET BY ID
    getAdSpentById: builder.query({
      query: (id) => `${API.ADMIN.Ad_SPEND}/${id}`,
      providesTags: ["adSpent"],
    }),

    // 🔹 ADD
    addAdSpent: builder.mutation({
      query: (body) => ({
        url: API.ADMIN.Ad_SPEND,
        method: "POST",
        body,
      }),
      invalidatesTags: ["adSpent"],
    }),

    // 🔹 UPDATE
    updateAdSpent: builder.mutation({
      query: ({ id, body }) => ({
        url: `${API.ADMIN.Ad_SPEND}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["adSpent"],
    }),

    // 🔹 DELETE
    deleteAdSpent: builder.mutation({
      query: (id) => ({
        url: `${API.ADMIN.Ad_SPEND}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["adSpent"],
    }),
  }),
});

export const {
  useGetAdSpentListQuery,
  useGetAdSpentByIdQuery,
  useAddAdSpentMutation,
  useUpdateAdSpentMutation,
  useDeleteAdSpentMutation,
} = adSpentApi;
