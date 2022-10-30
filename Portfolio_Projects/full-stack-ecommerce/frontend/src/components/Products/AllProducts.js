import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Slices/Cart/Cart";
import {
  selectAllProducts,
  selectFilteredProducts,
} from "../../Redux/features/Slices/Products/Products";

const AllProducts = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      {filteredProducts.map((product) => {
        return (
          <div>
            <h1>{product.name}</h1>;<p>{product.price}</p>
            <button onClick={() => handleClick(product)}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
