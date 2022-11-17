import React from "react";
const About = () => {
  return (
    <>
      <header className="text-center about-header">
        <h3>Candladora's mission</h3>
      </header>
      <div className="container border">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="https://ironbridgecandles.co.uk/wp-content/uploads/2021/03/Effete-Luxury-Candle-With-box-Lit.jpg"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
          <div className="col-sm-6 other">
            <p>
              Here at Candladora we believe that everyone deserves to have a
              comfortable snd inviting home, However, with the globak finacial
              crisis, candles and other home accessories are seen more as a
              luxary item that perhaps isn't so affordable With this in mind, we
              have partnered up with some of the best small bussinesses from
              around the globe, to offer <b>high-quality, luxiourious</b>{" "}
              candles tat an <b>affirdable</b> price!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
