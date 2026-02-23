import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/userSlice/userSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v2`,
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v2`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // Check for 403 status
  if (result.error && result.error.status === 403) {
    api.dispatch(logout());
    return {
      error: {
        status: 403,
        data: "You have been logged out due to a 403 response",
      },
    };
  }

  return result;
};

export { baseQueryWithInterceptor };
