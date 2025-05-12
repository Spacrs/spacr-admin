import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    layout: {
        showLeftSidebar: true,
        showTemplateRightSidebar: true,
        showHeader: true,
        showLoginButton: true,
        mainContentWidth: 100,
        sidebarWidth: 300
    },
};
export const createAdminLayoutSlice = createSlice({
    name: "ADMIN_LAYOUT",
    initialState,
    reducers: {
        getLayout: (state) => {
            return state;
        },
        updateLayout: (state, action) => {
            state = { ...state, layout: { ...state.layout, ...action.payload } };
            return state;
        },
    },
});
export const { getLayout, updateLayout } = createAdminLayoutSlice.actions;
export const selectLayout = (state) => state.adminLayoutSlice.layout;
export default createAdminLayoutSlice.reducer;
