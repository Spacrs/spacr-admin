import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
interface IState {
  users: string[];
  user: {};
  template: {};
  templates: { document: string; _id: string; userId: string }[];
  accessToken: null | string;
  userInfo?: {
    address: string;
    phone: string;
    website: string;
    gender: string;
    description: string;
    title: string;
  };
}

const initialState: IState = {
  users: [],
  user: {},
  template: {},
  templates: [],
  accessToken: null,
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
    getUsers: (state: IState, action: PayloadAction<any>) => {
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
    updateUser: (state: IState, action: PayloadAction<any>) => {
      return (state.user = action.payload);
    },
  },
});

export const {
  getUsers,
  logout,
  updateUser
} = createUserSlice.actions;

export const selectUser = (state: RootState) => state.userSlice.users;

export default createUserSlice.reducer;