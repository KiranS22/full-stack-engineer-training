import React, { useEffect, useState } from "react";
import Routing from "./Routing";
import "./app.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import jwt_decode from "jwt-decode";
import { DragDropContext } from "react-beautiful-dnd";
import { selectTask } from "../../Redux/features/Slices/Tasks/tasks";
function App() {
  const mode = useSelector(selectTheme);
  const dispatch = useDispatch();
  const tasks = useSelector(selectTask);
  const [card, setCard] = useState(tasks);
  const handleDragEnd = () => {
    console.log("card ", card);
  };

  const getLoggedInUser = async () => {
    try {
      const validToken = localStorage.getItem("token");
      if (validToken) {
        const decoded = jwt_decode(validToken);
        dispatch(logInUser({ user: decoded, token: validToken }));
      }
    } catch (err) {
      console.log({ status: "Error", message: err.meesage });
    }
  };

  useEffect(() => {
    // async thunks
    getLoggedInUser();
  }, []);

  return (
    <DragDropContext
      onDragEnd={() => {
        handleDragEnd();
      }}
    >
      <div id={`body-bg-${mode}`}>
        <Routing />
      </div>
    </DragDropContext>
  );
}

export default App;
