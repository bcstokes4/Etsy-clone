import React from 'react';
import video from './splash.mp4'
import './splash.css'

const SplashPage = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted className="video">
        <source src={video} type="video/mp4" />
        {/* You can add additional source elements for other formats like WebM or Ogg */}
        Your browser does not support the video tag.
      </video>
      {/* Other content goes here, like your landing page elements */}
      <div className="landing-content">
        {/* Your landing page content */}
      </div>
    </div>
  );
};

export default SplashPage;