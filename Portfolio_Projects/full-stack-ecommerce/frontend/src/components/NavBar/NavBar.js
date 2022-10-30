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
    <nav className="mavBar flex flex-between">
      <div className="logo">
        <h2 className="nav-title">insert logo</h2>
      </div>

      <ul className="nav-item flex flex-evenly">
        <li className="nav-link">
          <Link to="/"> Home</Link>
        </li>

        <li className="nav-link">
          <Link to="/products"> Products</Link>
        </li>

        <li className="nav-link">
          <Link to="/products/add"> Products</Link>
        </li>
      </ul>
      <div className="search">
        <input
          className="search_bar"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => searchProducts(e)}
        />
      </div>
      <button style={{ position: "relative" }} className="nav-link cart-btn">
        <Link to="/cart">
          <img
            src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png"
            style={{ width: 30, height: 30 }}
          />
          {cartCount > 0 ? (
            <span className="cart-count"> {cartCount} </span>
          ) : null}
        </Link>
      </button>
      <div>
        <Link to="/register">
          <button type="button" className="register-btn">
            Register
          </button>{" "}
        </Link>

        <Link to="/login">
          <button type="button" className="login-btn">
            Log In{" "}
          </button>{" "}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
