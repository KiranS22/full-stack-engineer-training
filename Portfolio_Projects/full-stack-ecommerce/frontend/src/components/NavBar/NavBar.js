import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../Redux/features/Slices/Cart/Cart";
import { filterSearch } from "../../Redux/features/Slices/Products/Products";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = useSelector(selectCartCount);

  const searchProducts = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    dispatch(filterSearch(e.target.value));
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
            <li classname="nav-item">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
