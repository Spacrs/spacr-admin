import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";
import { ADMIN } from "../../../constant/ApiConstant";
import { buildQueryParams } from "../../../utills/buildQueryParams";
import { BannerData } from "../../../types/BannerData.types";

export const bannersApi = createApi({
  reducerPath: "bannersApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    // GET all banners with pagination/search
    getBanners: builder.query<
    {
        data: BannerData[];
        pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        };
        success: boolean;
    },
    {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sort?: "asc" | "desc";
    }
    >({
    query: (paramsObj) => {
        const queryString = buildQueryParams(paramsObj);
        return {
        url: `/${ADMIN}/get-banners?${queryString}`,
        method: "GET",
        };
    },
    }),


    // CREATE banner
    createBanner: builder.mutation<any, Partial<BannerData>>({
      query: (bannerData) => ({
        url: `/${ADMIN}/create-banner`,
        method: "POST",
        body: bannerData,
      }),
    }),

    // UPDATE banner
    updateBanner: builder.mutation<any, Partial<BannerData>>({
      query: (bannerData) => {
        const id = bannerData.Id;
        return {
          url: `/${ADMIN}/update-banner/${id}`,
          method: "PATCH",
          body: bannerData,
        };
      },
    }),

    //VIEW Banner
    getBannerWithCountries: builder.query<BannerData, string>({
      query: (bannerId) => ({
        url: `/${ADMIN}/get-banner/${bannerId}`,
        method: "GET",
      }),
    }),

    // DELETE banner
    deleteBanner: builder.mutation<any, string>({
      query: (bannerId) => ({
        url: `/${ADMIN}/delete-banner/${bannerId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetBannerWithCountriesQuery
} = bannersApi;