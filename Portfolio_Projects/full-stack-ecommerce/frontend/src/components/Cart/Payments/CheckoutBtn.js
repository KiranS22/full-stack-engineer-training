import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCart } from "../../../Redux/features/Slices/Cart/Cart";
const CheckoutBtn = () => {
  const cartItems = useSelector(selectCart);
  console.log("cart items from selector", cartItems);
  const handlePayNow = async () => {
    debugger
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/stripe/checkout`,
      {
        items: cartItems,
      },
      { withCredentials: true }
    );
    console.log("Checkout via stripe:", response.data);
    const { url } = response.data;
    window.location.href = url;
  };
  return (
    <>
      <button
        className="btn-checkout btn-reverse"
        onClick={() => handlePayNow()}
      >
        Pay Now
      </button>
    </>
  );
};

export default CheckoutBtn;
