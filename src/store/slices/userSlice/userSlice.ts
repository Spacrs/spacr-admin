import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

export type UserDevice = {
  Id: number;
  UserID: string;
  DeviceType: string;
  DeviceName: string;
  DeviceUniqueId: string;
  FirebaseToken: string;
  IsLoggedIn: boolean;
  LoggedInAt: string;
  CreatedAt: string;
  DeletedAt: string | null;
};

interface IState {
  users: string[];
  user: {};
  template: {};
  templates: { document: string; _id: string; userId: string }[];
  accessToken: null | string;
  isloading: boolean;
  userInfo?: {
    address: string;
    phone: string;
    website: string;
    gender: string;
    description: string;
    title: string;
  };
  userDevices: UserDevice[];
  userDevicesDetails: UserDevice | {};
}

const initialState: IState = {
  users: [],
  user: {},
  template: {},
  templates: [],
  userDevices: [],
  userDevicesDetails: {},
  accessToken: null,
  isloading: false,
  userInfo: {
    address: "",
    phone: "",
    website: "",
    gender: "",
    description: "",
    title: "",
  },
};

export const createUserSlice = createSlice({
  name: "USER_ACTIONS",
  initialState,
  reducers: {
    setUsers: (state: IState, action: PayloadAction<any>) => {
      state.users = action.payload;
      return state;
    },
    logout: (state) => {
      state.user = {};
      state.accessToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    },
    updateIsLoading: (state: IState, action: PayloadAction<any>) => {
      state.isloading = action.payload;
      return state;
    },
    updateUserInUserList: (state: IState, action: PayloadAction<any>) => {
      const user = action.payload;

      // Ensure we return a new updated users array
      const newUsers = state.users.map((u: any) =>
        u.UserID === user.UserID ? { ...u, ...user } : u
      );

      state.users = newUsers;
      return state;
    },
    resetUsers: (state: IState, action: PayloadAction<any>) => {
      return (state = { ...state, ...action.payload });
    },
    updateUser: (state: IState, action: PayloadAction<any>) => {
      return (state.user = action.payload);
    },
    setUserDevices: (state: IState, action: PayloadAction<any>) => {
      state.userDevices = action.payload;
      return state;
    },
  },
});

export const {
  setUsers,
  resetUsers,
  logout,
  updateUser,
  updateUserInUserList,
  updateIsLoading,
  setUserDevices,
} = createUserSlice.actions;

export const selectUser = (state: RootState) => state.userSlice.users;

export default createUserSlice.reducer;
