import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOtherUser } from "../../store/user";
import ProductTile from "../Products/product-tile";

function OtherUserPage() {
  const dispatch = useDispatch();
  const otherUser = useSelector((state) => state.otherUser.user);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getOtherUser(userId));
  }, [dispatch]);

  if (!otherUser) return null;

  return (
    <div className="other-user-main-container">
      <div className="user-info-container">
        <h2>{otherUser.name}</h2>
        <img src={otherUser.profile_picture} alt="" />
      </div>

      <div className="products-container">
        <h2>Products</h2>
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
