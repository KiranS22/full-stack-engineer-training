import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    let x = 1;
    while (x < 4) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (err) {
        x++;
        continue;
      }
    }
    throw new Error("Failed");
  }
);
const initialState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
};

const Products = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterSearch: (state, action) => {
      state.filteredProducts = state.products.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    addProduct: (state, action) => {
      console.log('add product action.payload', action.payload);
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      console.log("pending");
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export default Products.reducer;
export const { filterSearch, addProduct } = Products.actions;

export const selectFilteredProducts = (state) => state.product.filteredProducts;

export const selectAllProducts = (state) => state.product.products;
