import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tetrisSlice from "./slices/tetrisSlice";
import appSlice from "./slices/appSlice";

const rootReducer = combineReducers({
  tetris: tetrisSlice,
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
