import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SuccessfulPayment = () => {
  return (
    <div className="container">
      <div className="success card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i classname=" success checkmark">✓</i>
        </div>
        <h1 className="success">Success</h1>
        <p className="success">
          We received your purchase request;
          <br /> we'll be in touch shortly! Your order number is:
        </p>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
