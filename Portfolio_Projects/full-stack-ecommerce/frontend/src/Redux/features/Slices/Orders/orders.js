import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orders`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
const initialState = {
  orders: [],
  filteredOrders: [],
  isLoading: false,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterOrders: (state, action) => {
      console.log(action.payload);
      state.filteredOrders = state.orders.filter((order) =>
        order.placed_at.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      console.log("pending Orders");
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      console.log("Fulfilled Orders", action.payload);
      state.orders = action.payload;
      state.filteredOrders = action.payload;
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      console.log("rejected Orders");
    });
  },
});

export const {} = orders.actions;
export const selectFilteredOrders = (state) => state.orders.filterOrders;

export const selectAllOrders = (state) => state.orders.orders;
export default orders.reducer;
