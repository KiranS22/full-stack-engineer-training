import React from "react";
const About = () => {
  return (
    <>
      <div className="about-container">
        <header className=" header center-text">
          <h1>Candladora's Mission</h1>
        </header>

        <main className="flex about">
          <div className="about-img">
            <img src="https://ironbridgecandles.co.uk/wp-content/uploads/2021/03/Effete-Luxury-Candle-With-box-Lit.jpg" style={{width:"500px", height:"500px"}}/>
          </div>
          <div className="main-text">
            <p>There at Candladora we have patnered with some of teh UK's biggest retailers to create a platform tha enables  </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
