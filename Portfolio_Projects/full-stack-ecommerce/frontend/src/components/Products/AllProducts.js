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
      {filteredProducts.map((product, index) => {
        console.log("Product", product);
        return (
          <>
            <div className="col-12 col-md-4">
              <div className="card" key={index}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.description}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <img
                    src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                    alt={product.description}
                    style={{ width: "100%" }}
                  />
                )}
                <h1>{product.name}</h1>
                <p className="price">{product.price}</p>
                <p>{product.description}</p>
                <p>
                  <button type="button" onClick={() => handleClick(product)}>
                    Add to Cart
                  </button>

                  <Link to={`/products/${product.id}`}>View Details</Link>
                </p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AllProducts;
