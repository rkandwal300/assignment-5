import { combineReducers, configureStore } from "@reduxjs/toolkit";
import amdListSlice from "./features/amdList/amd.slice";

export const rootReducer = combineReducers({
  amdList: amdListSlice,
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});
