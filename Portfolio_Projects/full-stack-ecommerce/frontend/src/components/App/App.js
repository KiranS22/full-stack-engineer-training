import React, { useEffect } from "react";
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
import About from "../About/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../Resources/CSS/app.css";
import ProtectedRoutes from "../Routing/ProtectedRoutes";
import ProductDetails from "../Products/ProductDetails";
import Profile from "../Profile/Profile";

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
        <Route path="/products" exact element={<AllProducts />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/products/add" exact element={<AddProduct />} />
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/products/:id" exact element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
