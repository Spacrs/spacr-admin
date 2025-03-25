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
        order.Id === action.payload.Id ? {...order,...action.payload} : order
      );
    },
    //Added on 24-03-2025
    setOrderOffers: (state: IState, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    //Added on 24-03-2025
  },
});

export const { setOrders, updateOrderList, setOrderOffers } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orderSlice.orders;
export default orderSlice.reducer;
