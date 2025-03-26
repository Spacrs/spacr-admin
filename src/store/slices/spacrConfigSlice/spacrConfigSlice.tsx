import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  CustomFees: number | null;
}

const initialState: IState = {
  CustomFees: 0,
};

export const spacrConfigSlice = createSlice({
  name: "SPACR_CONFIG_ACTIONS",
  initialState,
  reducers: {
    updateSpacrConfig: (state, action: PayloadAction<{ CustomFees: number }>) => {
      state.CustomFees = action.payload.CustomFees;
    },
  },
});

export const { updateSpacrConfig } = spacrConfigSlice.actions;
export default spacrConfigSlice.reducer;
