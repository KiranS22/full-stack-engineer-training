import React from "react";
import "./tasks.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  console.log("task id:", task.id);
  const handleEdit = async () => {};

  const handleRemove = async () => {};
  const mode = useSelector(selectTheme);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="card-body"
          id={`card-body-${mode}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="icons">
            <i
              className="fas fa-edit"
              id={`edit-${mode}`}
              onClick={(e) => handleEdit(e)}
            ></i>
            <i
              className="fa-solid fa-xmark"
              id={`remove-${mode}`}
              onClick={(e) => handleRemove(e)}
            ></i>
          </div>

          <div className="card" id={`card-${mode}`}>
            {task.task_name}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
