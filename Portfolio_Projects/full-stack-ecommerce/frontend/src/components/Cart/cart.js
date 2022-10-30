import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectCartTotal,
  findCartItemsTotal,
} from "../../Redux/features/Slices/Cart/Cart";

const Cart = () => {
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    console.log("useEdffect has ran");
    dispatch(findCartItemsTotal());
  }, []);
  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="grid_12">
            <h1>Your Cart</h1>
          </div>
          <ul className="items">
            {cart.map((item) => {
              return (
                <div>
                  <h1>{item.name}</h1>
                </div>
              );
            })}
          </ul>
          <div className="grid_12 delivery-payment">
            <div className="grid_6 delivery-address">
              <h3>Delivery Address</h3>
              <p>
                46 Vale Road
                <br />
                Ramsgate
              </p>
            </div>
            <div className="grid_6 payment-details">
              <h3>Payment Card</h3>
              <p> **** **** **** 8678</p>
            </div>
          </div>
          <div className="grid_12 coupon">
            <h3>Apply Coupon</h3>
            <input className="coupon-input" type="text" />
          </div>

          <div className="grid_12 summary">
            <div className="inner_container">
              <div className="summary-content">
                <div className="col_1of2 meta-data">
                  <div className="sub-total">
                    <em>Sub Total: </em>
                    <span className="amount"></span>
                  </div>
                  <div className="taxes">
                    <em>Plus VAT: </em>
                    <span className="amount">@ 20%</span>
                  </div>
                </div>
                <div className="col_1of2">
                  <div className="total">
                    <span className="amount">£{cartTotal}</span>
                  </div>
                </div>
              </div>
              <div className="btn-summary">
                <a href="#" className="btn-checkout btn-reverse">
                  Continue Shopping
                </a>

                <a href="#" className="btn-checkout">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
