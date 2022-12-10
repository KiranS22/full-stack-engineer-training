import React from "react";
import "./tasks.css";

const Tasks = () => {
  return (
    <>
      <div className="container m-4">
        <div className="card-body">
          <div className="icons">
            <i className="fas fa-edit"></i>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <li className="card">Card</li>
        </div>
      </div>
    </>
  );
};

export default Tasks;
