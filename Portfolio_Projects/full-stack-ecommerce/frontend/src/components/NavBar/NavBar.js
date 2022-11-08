import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../Redux/features/Slices/Cart/Cart";
import { filterSearch } from "../../Redux/features/Slices/Products/Products";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import axios from "axios";
import { logOutUser } from "../../Redux/features/Slices/Auth/Auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = useSelector(selectCartCount);
  const loggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  console.log("Logged in status", loggedIn);
  const searchProducts = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    dispatch(filterSearch(e.target.value));
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/auth/logout");
      console.log(data);
      if (data.status === "success") {
        dispatch(logOutUser());
        navigate("/login");
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg  navbar-colors">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
          Candladora
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products/add">
                Add A Product
              </Link>
            </li>

            <div style={{ margin: ".5em 3.5em 0" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => searchProducts(e)}
              />
            </div>
            <li className="nav-item">
              <Link to="/cart">
                <img
                  className="cart-img"
                  src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png"
                  style={{ width: 30, height: 30 }}
                />
                {cartCount > 0 ? (
                  <span className="cart-count"> {cartCount} </span>
                ) : null}
              </Link>
            </li>

            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <button type="button" className="login-btn">
                      Log In{" "}
                    </button>{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <button type="button" className="register-btn">
                      Register
                    </button>{" "}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    type="button"
                    className="register-btn"
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    Log Out
                  </button>{" "}
                </li>
                <li className="nav-item">
                  <Link to="/profile">
                    <img src="https://img.icons8.com/material/24/null/administrator-male--v1.png" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
