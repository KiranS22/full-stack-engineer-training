import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Toggler from "../Toggler/Toggler";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";

const Navbar = () => {
  const mode = useSelector(selectTheme);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg  navbar-nav"
        id={`nav-bg-${mode}`}
      >
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
              <Link className="nav-link" id={`nav-link-home-${mode}`} to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item underline">
              <Link
                className="nav-link"
                id={`nav-link-about-${mode}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <Link className="navbar-brand logo" id={`logo-${mode}`} to="/">
              Get Kanabised
            </Link>
            <li className="nav-item underline">
              <Link
                className="nav-link"
                id={`nav-link-login-${mode}`}
                to="/register"
              >
                Register
              </Link>
            </li>
            <li className="nav-item underline">
              <Link
                className="nav-link"
                id={`nav-link-login-${mode}`}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <div className="toggler nav-link">
                <Toggler />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
