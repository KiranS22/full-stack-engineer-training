import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw new Error("Failed");
    }
  }
);

const initialState = {
  tasks: [],
  tasksCount: 0,
  isLoading: false,
  isError: false,
};

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasksCount++;
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasksCount--;
    },
    completeOrNot: (state, action) => {
      //action.payload as the id
      let task = state.tasks.filter((task) => task.id === action.payload)[0];
      task.isComplete = !task.isComplete;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = true;
    });
  },
});
export const selectTsskCount = (state) => state.tasks.tasksCount;
export const selectTask = (state) => state.tasks.tasks;

export const { addTask, deleteTask, completeOrNot } = tasks.actions;

export default tasks.reducer;
