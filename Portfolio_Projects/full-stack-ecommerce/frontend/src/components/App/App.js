import React, { useEffect } from "react";
import "../App/CSS/App.css";
//Import it from your react index.js file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "../Products/AddProduct";
import { fetchAllProducts } from "../../Redux/features/Slices/Products/Products";
import { useDispatch } from "react-redux";
import AllProducts from "../Products/AllProducts";
import NavBar from "../NavBar/NavBar";
import Cart from "../Cart/Cart";
import Home from "../Home/Home";
import Register from "../User_Authentication/Register/Register";
import Login from "../User_Authentication/Login/login";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/products/" exact element={<AllProducts />} />
        <Route path="/products/add" exact element={<AddProduct />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
