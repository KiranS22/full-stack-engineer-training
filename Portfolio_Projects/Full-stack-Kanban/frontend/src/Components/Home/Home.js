import React from "react";
import Input from "../Input/input";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="text-center ">
          <Input />
        </div>
        <div className="row align-items-start mt-4">
          <div className="col custom-border mt-4">
            <header className="heading">
              <h2>To Do</h2>
            </header>
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
