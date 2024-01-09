import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import './spinner.css'

function SpinnerWrapper({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1400); 
    
    return () => clearTimeout(timer);
  }, []);

  return !isLoaded ? (
    <div className="tailspin-wrapper">
      <ThreeDots
        visible={true}
        height={120}
        width={120}
        color="grey"
        radius={1}
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <>{children}</>
  );
}

export default SpinnerWrapper;
  
