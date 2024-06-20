import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configReducer";

export const store = configureStore({
  reducer: {
    app: configReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch