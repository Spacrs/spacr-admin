import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    notifications: [],
};
export const notificationSlice = createSlice({
    name: "NOTIFICATION_ACTIONS",
    initialState,
    reducers: {},
});
export const {} = notificationSlice.actions;
export const selectNotifications = (state) => state.notificationSlice.notifications;
export default notificationSlice.reducer;
