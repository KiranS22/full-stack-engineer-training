import React, { useEffect } from "react";
import Routing from "./Routing";
import "./app.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { selectToken } from "../../Redux/features/Slices/Auth/Auth";
import jwt_decode from "jwt-decode";
import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const mode = useSelector(selectTheme);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

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
    <DragDropContext onDragEnd={()=>{}}>
      <div id={`body-bg-${mode}`}>
        <Routing />
      </div>
    </DragDropContext>
  );
}

export default App;
