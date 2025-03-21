import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../baseQuery";

export const paymentConfigApi: any = createApi({
  reducerPath: "paymentConfigApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    
    updateConfigFees: builder.mutation<any, Partial<any>>({
      query: (customFees) => {
        
        return {
          url: `/admin/spacr-config/update/`,
          method: "PATCH",
          body: {
            customFees: customFees
          }
        };
      },
    }),

    
  }),
});

export const {
  useUpdateConfigFeesMutation,
} = paymentConfigApi;
