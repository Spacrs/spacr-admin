import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  orders: any[];
  orderDetail: {};
  offers: any[];
  offerDetail: {};
  products: any[];
  productDetail: {};
}

const initialState: IState = {
  orders: [],
  orderDetail: {},
  offers: [],
  offerDetail: {},
  products: [],
  productDetail: {},
};

export const orderSlice = createSlice({
  name: "ORDER_ACTIONS",
  initialState,
  reducers: {
    setOrders: (state: IState, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    updateOrderList: (state: IState, action: PayloadAction<any>) => {
      state.orders = state.orders.map((order) =>
        order.Id === action.payload.Id ? { ...order, ...action.payload } : order
      );
    },
    setProducts: (state: IState, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
    updateProductList: (state: IState, action: PayloadAction<any>) => {
      state.products = state.products.map((product) =>
        product.Id === action.payload.Id
          ? { ...product, ...action.payload }
          : product
      );
    },
    setOrderOffers: (state: IState, action: PayloadAction<any[]>) => {
      console.log(action.payload, "action.payload");
      state.offers =
        Array.isArray(action.payload) && action.payload.length > 0
          ? action.payload.map((list) => {
              return {
                ...list,
                User: null,
                userProfileImage: list.User.ProfilePictureURL,
                offeredByName: list.User.FullName,
                offeredByEmail: list.User.Email,
                OfferedPrice: list.OfferedPrice || "0",
              };
            })
          : [];
    },
  },
});

export const {
  setOrders,
  updateOrderList,
  setProducts,
  updateProductList,
  setOrderOffers,
} = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orderSlice.orders;
export default orderSlice.reducer;
