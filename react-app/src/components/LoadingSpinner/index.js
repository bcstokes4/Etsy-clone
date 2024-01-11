import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import './spinner.css'

function SpinnerWrapper({ children }) {

  return (
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
  );
}

export default SpinnerWrapper;
  
