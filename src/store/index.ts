import { configureStore, Store } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userSlice";
import { adminAuthApi } from "./slices/userSlice/apiSlice";
import adminLayoutSlice from "./slices/adminLayoutSlice/adminLayoutSlice";
import paymentConfigSlice from "./slices/paymentConfigSlice/paymentConfigSlice";
import { paymentConfigApi } from "./slices/paymentConfigSlice/apiSlice";
import spacrConfigSlice from "./slices/spacrConfigSlice/spacrConfigSlice";
import { spacrConfigAPi } from "./slices/spacrConfigSlice/apiSlice";
import locationSlice from "./slices/countries/locationSlice";

import orderSlice from "./slices/orderSlice/orderSlice";
import { ordersApi } from "./slices/orderSlice/apiSlice";
import { countriesConfigApi } from "./slices/countries/apiSlice";
import { notificationApi } from "./slices/notificationSlice/apiSlice";

export const store: Store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [paymentConfigApi.reducerPath]: paymentConfigApi.reducer,
    [spacrConfigAPi.reducerPath]: spacrConfigAPi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [countriesConfigApi.reducerPath]: countriesConfigApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    userSlice,
    paymentConfigSlice,
    spacrConfigSlice,
    adminLayoutSlice,
    orderSlice,
    locationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminAuthApi.middleware)
      .concat(paymentConfigApi.middleware)
      .concat(spacrConfigAPi.middleware)
      .concat(ordersApi.middleware)
      .concat(countriesConfigApi.middleware)
      .concat(notificationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
