import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
const Home = () => {

  return (
    <>
      <div className="home-container flex">
        <div className="hero-img">
          <img
            className="hero"
            src="https://media.istockphoto.com/photos/closeup-of-3-burning-candles-on-abstract-black-background-contemplate-picture-id1352014624?b=1&k=20&m=1352014624&s=170667a&w=0&h=6d-On49ipamCWqLNMemCcRzfueYfvNgsw0wGTeFegW0="
          />
          <h2 className="text">Welcome To Candladora</h2>
        </div>
      </div>
      <div className="circles flex">
        <span className="circle c1">
          <button type="button">
            <Link to="/products"></Link>View Our Products
          </button>
        </span>
        <span className="circle c2">
          <button type="button">
            <Link to="/about">s</Link>About Us
          </button>
        </span>
        <span className="circle c3">
          <button type="buttton">
            <Link to="/products/add"></Link>List a Product
          </button>
        </span>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
};

export default Home;
