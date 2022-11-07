import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/modules/Auth/redux/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});
