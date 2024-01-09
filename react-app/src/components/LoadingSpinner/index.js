import React, { useState, useEffect } from "react";
import "./spinner.css";

const LoadingSpinner = () => {
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
    
    if (!mounted){
        return (
            <div className="loading-spinner">
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
      </div>
        )
    }
    return null
  };
  
  export default LoadingSpinner;
  
