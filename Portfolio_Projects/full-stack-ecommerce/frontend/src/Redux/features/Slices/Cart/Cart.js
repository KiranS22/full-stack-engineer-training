import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartCount: 0,
    cartTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("AddToCart Action");
      let item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.cartCount++;
      state.cartTotal += action.payload.price;
    },
    updateQty: (state, action) => {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id === Number(action.payload.id)) {
          return { ...cartItem, quantity: Number(action.payload.value) };
        } else {
          return cartItem;
        }
      });
      //Update Cart Count
      let cartItemsCount = 0;

      state.cart.forEach((element) => {
        cartItemsCount += element.quantity;
      });

      state.cartCount = cartItemsCount;
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((cItem) => {
        if (cItem.id === action.payload) {
          state.cartCount = state.cartCount - cItem.quantity;
        }
        return cItem.id !== action.payload;
        // action.payload is the id recieveed from dispatch
      });

      //set cartCount tp cartCount - quantity
    },
    findCartItemsTotal: (state) => {
      let cartTotal = 0;
      //Run a Loop.
      state.cart.forEach((element) => {
        cartTotal += element.price * element.quantity;
      });

      state.cartTotal = cartTotal.toFixed(2);
    },
  },
});

export const { addToCart, deleteFromCart, updateQty, findCartItemsTotal } =
  cartSlice.actions;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectCart = (state) => {
  return state.cart.cart;
};
export const selectCartTotal = (state) => state.cart.cartTotal;

export default cartSlice.reducer;
