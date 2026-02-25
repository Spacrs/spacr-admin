// src/store/slices/fees/feesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    fees: [],
    feeDetail: null,
    isEditFee: false,
};
export const feesSlice = createSlice({
    name: "FEES_ACTIONS",
    initialState,
    reducers: {
        setFees: (state, action) => {
            state.fees = action.payload;
        },
        updateFeeList: (state, action) => {
            state.fees = state.fees.map((fee) => fee.Id === action.payload.Id ? { ...fee, ...action.payload } : fee);
        },
        setFeeDetail: (state, action) => {
            state.feeDetail = action.payload;
        },
        setIsEditFee: (state, action) => {
            state.isEditFee = action.payload;
        },
    },
});
export const { setFees, updateFeeList, setFeeDetail, setIsEditFee } = feesSlice.actions;
export const selectFees = (state) => state.feesSlice.fees;
export const selectFeeDetail = (state) => state.feesSlice.feeDetail;
export const selectIsEditFee = (state) => state.feesSlice.isEditFee;
export default feesSlice.reducer;
