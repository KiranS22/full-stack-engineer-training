import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllProducts } from "../../Redux/features/Slices/Products/Products";

const ProductDetails = () => {
  const products = useSelector(selectAllProducts);
  console.log(products);

  const { id } = useParams();
  let singleProduct = products.find(
    (product) => Number(product.id) === Number(id)
  );
  console.log("product ID", id);
  console.log("single product", singleProduct);
  return (
    <>
      <div className="details-container">
        <div className="row">
          <div className="left col-md-6">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <img
              className="headset"
              src={singleProduct.image}
            />
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="right col-md-6">
            <h4 className="categorie">{singleProduct.name}</h4>
            <h3 className="product">{singleProduct.category} 7</h3>
            <ul className="desc">
              <li>Lag-Free Wireless Gaming Headset</li>
              <li>DTS Headphone : X 7.1 Surround Sound</li>
              <li>ClearCast, the Best Mic in Gaming</li>
            </ul>
            <div className="color">
              <p className="title-colour">
                Color : <span className="blackwhite">Black</span>
              </p>
              <i className="color-black fa fa-check" aria-hidden="true"></i>
              <i className="color-white fa fa-check" aria-hidden="true"></i>
            </div>
            <p className="price">€179.99</p>
            <p className="buy">Buy now</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
