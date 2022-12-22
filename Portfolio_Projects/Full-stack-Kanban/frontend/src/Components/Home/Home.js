import React, { useEffect } from "react";
import Input from "../Input/input";
import Task from "../Tasks/Task";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import { fetchAllTasks } from "../../Redux/features/Slices/Tasks/tasks";
import { selectTask } from "../../Redux/features/Slices/Tasks/tasks";
import { Droppable } from "react-beautiful-dnd";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);
  const mode = useSelector(selectTheme);
  const tasks = useSelector(selectTask);

  return (
    <>
      <div className={`home-container-${mode} content-${mode}`}>
        <div className="text-center ">
          <Input />
        </div>
        <div className="row align-items-start mt-4">
          <Droppable droppableId="incomplete">
            {(provided) => (
              <div
                className="col  mt-4"
                id={`custom-border-${mode}-1`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <header className="heading" id={`heading-1-${mode}`}>
                  <h2>To Do</h2>
                </header>
                <div className="task-container ">
                  {tasks.map((task, index) => {
                    return <Task task={task} index={index} />;
                  })}
                </div>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="progress">
            {(provided) => (
              <div
                className="col mt-4"
                id={`custom-border-${mode}-2`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <header className="heading" id={`heading-1-${mode}`}>
                  <h2>In Progress</h2>
                </header>
                <p></p>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="col  mt-4"
                id={`custom-border-${mode}-3`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {" "}
                <header className="heading" id={`heading-3-${mode}`}>
                  <h2>Done</h2>
                </header>
                <p></p>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
};

export default Home;
