import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../Home/Home";
import Navbar from "../../NavBar/Navbar";
import Register from "../../Register/Register";
import Login from "../../Login/Login";
import About from "../../About/About";


const Routing = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
