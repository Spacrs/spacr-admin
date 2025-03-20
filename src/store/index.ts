import { configureStore, Store } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userSlice";
import { adminAuthApi } from "./slices/userSlice/apiSlice";
import adminLayoutSlice from "./slices/adminLayoutSlice/adminLayoutSlice";
import paymentConfigSlice from "./slices/paymentConfigSlice/paymentConfigSlice";
import { paymentConfigApi } from "./slices/paymentConfigSlice/apiSlice";

import orderSlice from "./slices/orderSlice/orderSlice";
import { ordersApi } from "./slices/orderSlice/apiSlice";
import { countriesConfigApi } from "./slices/countries/apiSlice";


export const store: Store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [paymentConfigApi.reducerPath]: paymentConfigApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [countriesConfigApi.reducerPath]: countriesConfigApi.reducer,
    userSlice,
    paymentConfigSlice,
    adminLayoutSlice,
    orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminAuthApi.middleware)
      .concat(paymentConfigApi.middleware)
      .concat(ordersApi.middleware)
      .concat(countriesConfigApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
