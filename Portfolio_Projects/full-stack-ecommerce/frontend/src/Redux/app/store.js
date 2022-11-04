import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Slices/Products/Products";
import cartReducer from "../features/Slices/Cart/Cart";
import authReducer from "../features/Slices/Auth/Auth";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
