import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  notifications: {
    title: string;
    body: string;
    userIds: string[];
  }[];
}

const initialState: IState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "NOTIFICATION_ACTIONS",
  initialState,
  reducers: {},
});

export const {} = notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notificationSlice.notifications;

export default notificationSlice.reducer;
