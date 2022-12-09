import React from "react";
import "./input.css"

const Input = () => {
  return (
    <>
      <label htmlFor="task">Task:</label>
      <input
        type="text"
        value=""
        id="task"
        onChange={() => console.log("I am an input")}
        placeholder="Add Task"
        className="mt-4"
      />
    </>
  );
};

export default Input;
