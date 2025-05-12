import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [],
    user: null,
    userDevices: [],
    userDevicesDetails: {},
    accessToken: null,
    isloading: false,
};
export const createUserSlice = createSlice({
    name: "USER_ACTIONS",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
            return state;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            window.location.href = "/";
        },
        updateIsLoading: (state, action) => {
            state.isloading = action.payload;
            return state;
        },
        updateUserInUserList: (state, action) => {
            const user = action.payload;
            // Ensure we return a new updated users array
            const newUsers = state.users.map((u) => u.UserID === user.UserID ? { ...u, ...user } : u);
            state.users = newUsers;
            return state;
        },
        resetUsers: (state, action) => {
            return (state = { ...state, ...action.payload });
        },
        updateUser: (state, action) => {
            return (state.user = action.payload);
        },
        setUserDevices: (state, action) => {
            state.userDevices = action.payload;
            return state;
        },
    },
});
export const { setUsers, resetUsers, logout, updateUser, updateUserInUserList, updateIsLoading, setUserDevices, } = createUserSlice.actions;
export const selectUser = (state) => state.userSlice.users;
export default createUserSlice.reducer;
