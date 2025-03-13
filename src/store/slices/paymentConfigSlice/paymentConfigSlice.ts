import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  paymentConfigs: any[];
  paymentConfig: {};
}

const initialState: IState = {
  paymentConfigs: [],
  paymentConfig: {},
};

export const paymentConfigSlice = createSlice({
  name: "ORDER_ACTIONS",
  initialState,
  reducers: {
    setPaymentConfigs: (state: IState, action: PayloadAction<any[]>) => {
      state.paymentConfigs = action.payload;
    },
    updatePaymentConfigInList: (state: IState, action: PayloadAction<any>) => {
      state.paymentConfigs = state.paymentConfigs.map((config) =>
        config.Id === action.payload.Id ? action.payload : config
      );
    },
    addPaymentConfigToList: (state: IState, action: PayloadAction<any>) => {
      state.paymentConfigs.push(action.payload);
    },
  },
});

export const { setPaymentConfigs, updatePaymentConfigInList, addPaymentConfigToList } = paymentConfigSlice.actions;
export const selectPaymentConfig = (state: RootState) => state.paymentConfigSlice.paymentConfigs;
export default paymentConfigSlice.reducer;
