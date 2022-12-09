import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Toggler from "../Toggler/Toggler";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item underline">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <Link className="navbar-brand logo" to="/">
              Get Kanabised
            </Link>
            <li className="nav-item underline">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item underline">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
