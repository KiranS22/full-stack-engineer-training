import React, { useState } from "react";
import "./toggler.css";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../Redux/features/Slices/Toggler/Toggler";

const Toggler = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const toggleModes = () => {
    console.log(checked);
    setChecked(!checked);
    //Dispatch
    dispatch(toggleTheme());
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={checked}
          onChange={() => toggleModes()}
          id="flexSwitchCheckDefault"
        />
        <label
          className="form-check-label"
          for="flexSwitchCheckDefault"
        ></label>
      </div>
    </>
  );
};

export default Toggler;
