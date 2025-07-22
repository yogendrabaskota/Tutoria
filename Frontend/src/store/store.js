import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// export const AppDispatch = typeof store.dispatch;
// export const RootState = ReturnType<typeof store.getState>
