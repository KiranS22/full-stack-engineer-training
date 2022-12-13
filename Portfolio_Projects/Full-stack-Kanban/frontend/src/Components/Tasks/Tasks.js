import React from "react";
import "./tasks.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";

const Tasks = () => {
  const mode = useSelector(selectTheme);
  return (
    <>
      <div className="card-body" id={`card-body-${mode}`}>
        <div className="icons">
          <i className="fas fa-edit" id={`edit-${mode}`}></i>
          <i class="fa-solid fa-xmark"id={`remove-${mode}`}></i>
        </div>
        <div className="card" id={`card-${mode}`}>
          Card
        </div>
      </div>
    </>
  );
};

export default Tasks;
