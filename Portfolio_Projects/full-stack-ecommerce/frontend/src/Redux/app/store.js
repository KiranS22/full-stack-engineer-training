import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Slices/Products"

export const store = configureStore({
  reducer: {
    productReducer,
  },
});
