import React from "react";
import video from "./splash.mp4";
import "./splash.css";
import Navigation from "../Navigation";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";

const SplashPage = ({ isLoaded }) => {
  return (
    <div className="splash-main-wrapper">
      <Navigation isLoaded={isLoaded} className="Navigation" />
      {/* <div className="video-background"> */}
      <video autoPlay loop muted className="video">
        <source
          src="https://sporthub-bucket.s3.amazonaws.com/sporthub-assets/SportHub-landing-vid.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="landing-content">
        <p className="site-description">
          Welcome to SportHub.
        </p>
        <Link to="/products" className="explore-button">
          Explore Our Collection
        </Link>
      </div>

      <Footer className="Footer" />
    </div>
  );
};

export default SplashPage;
