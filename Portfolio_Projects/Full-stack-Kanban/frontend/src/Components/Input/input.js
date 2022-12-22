import React from "react";
import "./input.css";
import { useState } from "react";
import { taskPost } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { fetchAllTasks } from "../../Redux/features/Slices/Tasks/tasks";

const Input = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTask("");
    const data = await taskPost(task);
    const { status } = data;
    if (status === "success") {
      dispatch(fetchAllTasks());
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label className="mt-4" htmlFor="task">
        Task:
      </label>
      <input
        type="text"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add Task"
        className="mt-4"
      />
    </form>
  );
};

export default Input;
