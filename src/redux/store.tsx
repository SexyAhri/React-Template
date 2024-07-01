/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default configureStore({
  reducer: rootReducer,
  devTools: true
});
