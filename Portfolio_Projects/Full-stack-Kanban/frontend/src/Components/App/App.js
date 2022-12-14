import React, { useEffect } from "react";
import Routing from "./Routing/Routing";
import "./app.css";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector(selectTheme);
  
  return (
    <>
      <div id={`body-bg-${mode}`}>
        <Routing />
      </div>
    </>
  );
}

export default App;
