import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Slices/Cart/Cart";
import {
  selectAllProducts,
  selectFilteredProducts,
} from "../../Redux/features/Slices/Products/Products";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  console.log("Filtered:", filteredProducts);
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="row">
      {filteredProducts.map((product) => {
        console.log("Product", product);
        return (
          <div className="col-12 col-md-4">
            <div className="card">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.description}
                  style={{ width: "100%" }}
                />
              ) : (
                <p>Image not Found</p>
              )}
              <h1>{product.name}</h1>
              <p className="price">$19.99</p>
              <p>Some text about the jeans..</p>
              <p>
                <button onClick={() => handleClick(product)}>
                  Add to Cart
                </button>
                <Link to={`/products/${product.id}`}>View</Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
