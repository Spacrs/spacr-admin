import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { ProductData } from "../../../types/ProductData.types";
interface IState {
  orders: any[];
  orderDetail: {};
  offers: any[];
  offerDetail: {};
  products: ProductData[];
  productDetail: {};
  isEditProduct: boolean;
  isEditOrder: boolean;
}

const initialState: IState = {
  orders: [],
  orderDetail: {},
  offers: [],
  offerDetail: {},
  products: [],
  productDetail: {},
  isEditProduct: false,
  isEditOrder: false,
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
    updateProductList: (state: IState, action: PayloadAction<ProductData>) => {
      const productToUpdate = state.products.find((product) => product.Id === action.payload.Id);

      if (productToUpdate) {
        state.products = state.products.map((product) =>
          product.Id === action.payload.Id
            ? { ...product, ...action.payload }
            : product
        );
      } else {
        console.warn(`Product with Id ${action.payload.Id} not found.`);
      }
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
    setIsEdit: (
      state: IState,
      action: PayloadAction<{ isEditProduct?: boolean; isEditOrder?: boolean }>
    ) => {
      if (action.payload.isEditProduct !== undefined) {
        state.isEditProduct = action.payload.isEditProduct;
      }
      if (action.payload.isEditOrder !== undefined) {
        state.isEditOrder = action.payload.isEditOrder;
      }
    },
  },
});

export const {
  setOrders,
  updateOrderList,
  setProducts,
  updateProductList,
  setOrderOffers,
  setIsEdit,
} = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orderSlice.orders;
export const selectIsEditProduct = (state: RootState) =>
  state.orderSlice.isEditProduct;
export const selectIsEditOrder = (state: RootState) =>
  state.orderSlice.isEditOrder;
export default orderSlice.reducer;
