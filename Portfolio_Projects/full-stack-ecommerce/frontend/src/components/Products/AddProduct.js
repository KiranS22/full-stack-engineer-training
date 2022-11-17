import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const handleSubmit = async (e) => {
    console.log("Handle Submit has Ran");
    e.preventDefault();
    try {
      console.log(product);
      const response = await axios.post(
        "http://localhost:4000/products",
        product
      );

      console.log("Response:", response.data);
      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            aria-describedby="productName"
            placeholder="Enter Product Name"
            value={product.name}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            aria-describedby="productPrice"
            placeholder="Enter Product Price"
            value={product.price}
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">Product Category</label>
          <input
            type="text"
            className="form-control"
            id="productCategory"
            aria-describedby="productCategory"
            placeholder="Enter Product Category"
            value={product.category}
            onChange={(e) => {
              setProduct({ ...product, category: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Decription</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            aria-describedby="productDescrition"
            placeholder="Enter Product Description"
            value={product.description}
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Image</label>
          <input
            type="text"
            className="form-control"
            id="productImage"
            aria-describedby="productImage"
            placeholder="Enter Product Image"
            value={product.imageUrl}
            onChange={(e) => {
              setProduct({ ...product, imageUrl: e.target.value });
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary stylesForButton"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            backgroundColor: "#68243c",
            color: "#ffffff",
          }}
        >
          {" "}
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
