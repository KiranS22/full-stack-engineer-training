import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const fetchAllTasks = createAsyncThunk("tasks/fetchAllTasks", async () => {});

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
});
export const selectTsskCount = (state) => state.tasks.tasksCount;
export const selectTask = (state) => state.task.id;

export const { addTask, deleteTask, completeOrNot } = tasks.actions;

export default tasks.reducer;
