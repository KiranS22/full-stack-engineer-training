import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products`,
      {
        withCredentials: true,
      }
    );
    return response.data;
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
export const { filterSearch } = Products.actions;

export const selectFilteredProducts = (state) => state.product.filteredProducts;

export const selectAllProducts = (state) => state.product.products;
