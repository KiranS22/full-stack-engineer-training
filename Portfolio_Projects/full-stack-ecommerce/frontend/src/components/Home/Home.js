import React from "react";
import "../App/CSS/homepage.css";

const Home = () => {
  return (
    <>
      <div className="container grid">
        <div className="banner">
          <div>
            <h2>Welcome To Candladora</h2>
          </div>
        </div>
        <div className="flex row1">
          <div className="box 1">2</div>
          <div className="box 2">3</div>
          <div className="box 3">4</div>
        </div>
        <div className="flex row2">
          <div className="box 4">5</div>
          <div className="box 5">6</div>
          <div className="box 6">7</div>
        </div>
        <div className="flex row3">
          <div className="box 7">8</div>
          <div className="box 8">9</div>
        </div>
      </div>

      <footer>
        <h2>FOOTER</h2>
      </footer>
    </>
  );
};

export default Home;
