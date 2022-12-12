import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

const Toggle = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      if (state.mode === "light") {
        state.mode = "dark";
      } else {
        state.mode = "light";
      }
    },
  },
});
export const selectTheme = (state) => state.toggler.mode;
export const { toggleTheme } = Toggle.actions;

export default Toggle.reducer;
