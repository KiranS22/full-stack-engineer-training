import React from "react";
import "./toggler.css";

const Toggler = () => {
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
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
