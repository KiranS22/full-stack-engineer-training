import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  findCartItemsTotal,
  deleteFromCart,
  updateQty,
  selectCartTotal,
} from "../../Redux/features/Slices/Cart/Cart";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const cart = useSelector(selectCart);
  console.log("cart in Cart.js,", cart);
  const [user, setUser] = useState({
    address: "",
  });

  useEffect(() => {
    console.log("Cart.js useEffect");
    dispatch(findCartItemsTotal());
  }, [cart]);

  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="grid_12">
            <h1>Your Cart</h1>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItem item={item} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid_12 delivery-payment">
            <div className="grid_6 delivery-address">
              <h3>Delivery Address</h3>
              <p>{user.address}</p>
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
                <Link to="/products" className="btn-checkout btn-reverse">
                  Continue Shopping
                </Link>

                <Link to="/checkout" className="btn-checkout">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
