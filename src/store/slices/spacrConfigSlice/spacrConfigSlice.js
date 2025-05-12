import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    CustomFees: 0,
};
export const spacrConfigSlice = createSlice({
    name: "SPACR_CONFIG_ACTIONS",
    initialState,
    reducers: {
        updateSpacrConfig: (state, action) => {
            state.CustomFees = action.payload.CustomFees;
        },
    },
});
export const { updateSpacrConfig } = spacrConfigSlice.actions;
export default spacrConfigSlice.reducer;
