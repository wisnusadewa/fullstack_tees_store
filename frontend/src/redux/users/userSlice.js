import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: JSON.parse(localStorage.getItem("accessToken")) || null,
  isLoggin: !!localStorage.getItem("user"), // !! = mengembalikan nilai boolean
  loading: false,
  error: null,
};

const userSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggin = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload)); // set data user pada local storage
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.user.accessToken)
      );
    },
    loginFailure: (state, action) => {
      state.isLoggin = false;
      state.error = action.payload;
      state.user = null;
    },
    logout: (state) => {
      state.isLoggin = false;
      state.user = null;
      localStorage.removeItem("user"); // Hapus data user pada local storage
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSLice.actions;

export default userSLice.reducer;
