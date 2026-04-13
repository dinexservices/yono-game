import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gameReducer from "./slices/gameSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    admins: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
