import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQty, removeFromCart } from "../../store/cart";
import { useEffect } from "react";
import React from 'react';
import './Cart.css'

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [Qty, setQty] = useState();

  const options = () => {
    const optionsArr = [];
    for (let i = 1; i < 101; i++) {
      optionsArr.push(i);
    }
    return optionsArr;
  };

  useEffect(() => {
    setQty(item.qty);
  }, [item]);

  return (
    <div className="individual_cart_item_container">
      <img src={item.preview_image.product_image} alt="" />
      <div className="item_name">{item.name}</div>
      <div className="price_qty">
        <select
        className="qty"
          onChange={(e) => {
            if (e.target.value === "remove") {
              dispatch(removeFromCart(item));
            } else {
              dispatch(updateCartQty(item, e.target.value));
            }
          }}
          value={Qty}
        >
          <option value="remove">Remove</option>
          {options().map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <div>${(item.price * Qty).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CartItem;