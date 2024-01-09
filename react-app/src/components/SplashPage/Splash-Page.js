import React from "react";
import video from "./splash.mp4";
import "./splash.css";
import Navigation from "../Navigation";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";

const SplashPage = ({ isLoaded }) => {
  const [isLoaded2, setIsLoaded2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded2(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-main-wrapper">
      {!isLoaded2 ? (
        <div className="tailspin-wrapper">
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="grey"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <Navigation className="Navigation" isLoaded={isLoaded} />
          <video autoPlay loop muted className="video">
            <source
              src="https://sporthub-bucket.s3.amazonaws.com/sporthub-assets/SportHub-landing-vid.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="landing-content">
            <p className="site-description">Welcome to SportHub.</p>
            <Link to="/products" className="explore-button">
              Explore Our Collection
            </Link>
          </div>
          <Footer className="Footer" />
        </>
      )}
    </div>
  );
};

export default SplashPage;
