import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCart } from "../../../Redux/features/Slices/Cart/Cart";
const CheckoutBtn = () => {
  const cartItems = useSelector(selectCart);
  console.log("cart items from selector", cartItems);
  const handlePayNow = async () => {
    console.log("I have paif you money!");

    const response = await axios.post("http://localhost:4000/stripe/checkout", {
      items: cartItems,
    });
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
