import React, { useEffect } from "react";
import "./App.css";
//Import it from your react index.js file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "../Products/AddProduct";
import { fetchAllProducts } from "../../Redux/features/Slices/Products";
import { useDispatch } from "react-redux";
import AllProducts from "../Products/AllProducts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/products/" exact element={<AllProducts />} />
        <Route path="/products/add" exact element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
