// src/store/slices/fees/feesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { FeeData } from "./apiSlice";

interface IState {
  fees: FeeData[];
  feeDetail: FeeData | null;
  isEditFee: boolean;
}

const initialState: IState = {
  fees: [],
  feeDetail: null,
  isEditFee: false,
};

export const feesSlice = createSlice({
  name: "FEES_ACTIONS",
  initialState,
  reducers: {
    setFees: (state, action: PayloadAction<FeeData[]>) => {
      state.fees = action.payload;
    },
    updateFeeList: (state, action: PayloadAction<FeeData>) => {
      state.fees = state.fees.map((fee) =>
        fee.Id === action.payload.Id ? { ...fee, ...action.payload } : fee
      );
    },
    setFeeDetail: (state, action: PayloadAction<FeeData | null>) => {
      state.feeDetail = action.payload;
    },
    setIsEditFee: (state, action: PayloadAction<boolean>) => {
      state.isEditFee = action.payload;
    },
  },
});

export const { setFees, updateFeeList, setFeeDetail, setIsEditFee } = feesSlice.actions;

export const selectFees = (state: RootState) => state.feesSlice.fees;
export const selectFeeDetail = (state: RootState) => state.feesSlice.feeDetail;
export const selectIsEditFee = (state: RootState) => state.feesSlice.isEditFee;

export default feesSlice.reducer;
