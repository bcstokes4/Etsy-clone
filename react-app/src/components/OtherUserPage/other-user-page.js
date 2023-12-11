import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOtherUser } from "../../store/user";
import ProductTile from "../Products/product-tile";
import './other-user.css'

function OtherUserPage() {
  const dispatch = useDispatch();
  const otherUser = useSelector((state) => state.otherUser.user);
  const { userId } = useParams();

  const monthsArray = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const noPictureImg = 'https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/no-pfp.jpeg'
  
  const parts = otherUser?.created_at.split(' ');
  let monthAbbreviation;
  let fullMonth;
  if(parts){
    monthAbbreviation = parts[2]
    fullMonth = monthsArray.find(month => month.startsWith(monthAbbreviation.trim()));
  } 
  
  console.log(fullMonth);

  useEffect(() => {
    dispatch(getOtherUser(userId));
  }, [dispatch]);

  if (!otherUser) return null;

  return (
    <div className="other-user-main-container">
      <div className="user-info-container">
        <h2>{otherUser.name}</h2>
        <img src={otherUser?.profile_picture ? otherUser?.profile_picture : noPictureImg} alt="" />
        <h3>Member since {fullMonth} {parts[3]}</h3>
      </div>

        <h2 id="theirprod">Their Products</h2>
      <div className="products-container">
        {otherUser.products.map((product) => {
          return (
            <ProductTile product={product}/>
          );
        })}
      </div>
    </div>
  );
}

export default OtherUserPage;
