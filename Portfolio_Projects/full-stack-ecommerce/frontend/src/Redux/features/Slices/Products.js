import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get("http://localhost:4000/products");
    return response.data;
  }
);
const initialState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
};

const Products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      console.log("pending");
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;

export const selectAllProducts = (state) => state.products.products;
export const {} = Products.actions;

export default Products.reducer;
