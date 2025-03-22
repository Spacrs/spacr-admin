import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IState {
  customFees: any;
}

const initialState: IState = {
  customFees: null,
};

export const orderSlice = createSlice({
  name: "SPACR_CONFIG_ACTIONS",
  initialState,
  reducers: {
    updateSpacrConfig: (state: IState, action: PayloadAction<any>) => {
      state.customFees = action.payload.id
    },
  },
});

export const { updateSpacrConfig } = orderSlice.actions;
export default orderSlice.reducer;
