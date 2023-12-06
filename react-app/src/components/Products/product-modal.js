import { useModal } from "../../context/Modal";
import { addToCart, loadCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";

function ProductModal({ product }) {
  const cart = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [Qty, setQty] = useState(1);

  const options = () => {
    const optionsArr = [];
    for (let i = 1; i < 101; i++) {
      optionsArr.push(i);
    }
    return optionsArr;
  };

  const AddToCart = async (e) => {
    e.preventDefault();
    dispatch(loadCart())
    dispatch(addToCart(product, Qty));
    closeModal();
  };

  useEffect(() => {
    if (cart[product.id] != null) {
      setQty(cart[product.id].qty);
    }
  }, []);

  return (
    <div className="product-modal-container">
      <img src={product.preview_image.product_image} className="img" alt="" />
      <div className="product-content-container">
        <h1>{product.name}</h1>
        <p className="pricey">${product.price}</p>
        <form onSubmit={AddToCart}>
        {/* item likes */}
          <select value={Qty} onChange={(e) => setQty(e.target.value)}
          className="quantity"
          >
            {options().map((option) => (
              <option value={option} key={option}>
                {" "}
                {option}{" "}
              </option>
            ))}
          </select>
              <p className="description">Description:</p>
            <p>{product.body}</p>
          <button className="modal_buttons">
            {" "}
            Add {Qty} To Cart • ${(product.price * Qty).toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;