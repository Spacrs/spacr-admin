import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  orders: any[];
  orderDetail: {};
  offers: any[];
  offerDetail: {};
}

const initialState: IState = {
  orders: [],
  orderDetail: {},
  offers: [],
  offerDetail: {},
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
        order.Id === action.payload.Id ? {...order,...action.payload} : order
      );
    },
    setOrderOffers: (state: IState, action: PayloadAction<any[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { setOrders, updateOrderList, setOrderOffers } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orderSlice.orders;
export default orderSlice.reducer;
