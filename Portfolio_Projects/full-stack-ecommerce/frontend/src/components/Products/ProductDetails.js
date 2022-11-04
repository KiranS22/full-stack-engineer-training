import React from "react";

const ProductDetails = () => {
  return (
    <>
      <div className="details-container">
        <div className="row">
          <div className="left col-md-6">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <img
              className="headset"
              src="https://media.ldlc.com/r1600/ld/products/00/05/00/34/LD0005003477_2.jpg"
            />
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="right col-md-6">
            <h4 className="categorie">Gaming headset</h4>
            <h3 className="product">Steelseries Arctis 7</h3>
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
