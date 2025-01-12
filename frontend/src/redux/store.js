import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
