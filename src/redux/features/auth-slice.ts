"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuth: boolean;
  userNumbers: string[];
  uid: string;
  isModerator: boolean;
};

const initialState: AuthState = {
  isAuth: false,
  userNumbers: [],
  uid: "",
  isModerator: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return {
        isAuth: false,
        userNumbers: [],
        uid: "",
        isModerator: false,
      };
    },
    logIn: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.userNumbers = [...state.userNumbers, action.payload];
      state.uid = "fvdkgolew3213fgb";
      state.isModerator = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
