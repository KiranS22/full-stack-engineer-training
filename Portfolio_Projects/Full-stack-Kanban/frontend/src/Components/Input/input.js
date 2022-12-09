import React from "react";
import "./input.css";

const Input = () => {
  return (
    <>
      <label className="mt-4" htmlFor="task">
        Task:
      </label>
      <input
        type="text"
        id="task"
        // onChange={() => console.log("I am an input")}
        placeholder="Add Task"
        className="mt-4"
      />
    </>
  );
};

export default Input;
