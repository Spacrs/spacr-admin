import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  orders: any[];
  orderDetail: {};
}

const initialState: IState = {
  orders: [],
  orderDetail: {},
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
        order.id === action.payload.id ? action.payload : order
      );
    },
  },
});

export const { setOrders, updateOrderList } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orderSlice.orders;
export default orderSlice.reducer;
