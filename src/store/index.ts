import { configureStore, Store } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userSlice";
import { categoryApi } from "./slices/categorySlice/apiSlice";
import categorySlice from "./slices/categorySlice/categorySlice";
import { adminAuthApi } from "./slices/userSlice/apiSlice";
import { userResumeApi } from "./slices/resumeDetailsSlice/apiSlice";
import resumeDetailsSlice from "./slices/resumeDetailsSlice/resumeDetailSlice";
import {skillApi} from "./slices/skilSlice/apiSlice";
import skillSlice from "./slices/skilSlice/skillSlice";
import adminLayoutSlice from "./slices/adminLayoutSlice/adminLayoutSlice";
import resumeDetailSlice from "./slices/resumeTemplateSlice/resumeDetailSlice";
import paymentConfigSlice from "./slices/paymentConfigSlice/paymentConfigSlice";
import { paymentConfigApi } from "./slices/paymentConfigSlice/apiSlice";

import orderSlice from "./slices/orderSlice/orderSlice";
import { ordersApi } from "./slices/orderSlice/apiSlice";


export const store: Store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userResumeApi.reducerPath]: userResumeApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer,
    [paymentConfigApi.reducerPath]:paymentConfigApi.reducer,
    [ordersApi.reducerPath]:ordersApi.reducer,
    userSlice,
    paymentConfigSlice,
    categorySlice,
    resumeDetailsSlice,
    skillSlice,
    adminLayoutSlice,
    resumeDetailSlice,
    orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminAuthApi.middleware)
      .concat(categoryApi.middleware)
      .concat(userResumeApi.middleware)
      .concat(skillApi.middleware)
      .concat(paymentConfigApi.middleware)
      .concat(ordersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
