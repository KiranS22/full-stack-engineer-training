import React from "react";
import Input from "../Input/input";
import Tasks from "../Tasks/Tasks";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import "./home.css";
const Home = () => {
  const mode = useSelector(selectTheme);
  return (
    <>
      <div className={`home-container-${mode} content-${mode}`}>
        <div className="text-center ">
          <Input />
        </div>
        <div className="row align-items-start mt-4">
          <div className="col custom-border mt-4">
            <header className="heading">
              <h2>To Do</h2>
            </header>
            <div className="task-container ">
              <Tasks />
            </div>
          </div>
          <div className="col custom-border mt-4">
            <header className="heading">
              <h2>In Progress</h2>
            </header>
            <p></p>
          </div>
          <div className="col custom-border mt-4">
            {" "}
            <header className="heading">
              <h2>Done</h2>
            </header>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
