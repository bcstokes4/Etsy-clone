import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurr } from "../../store/session";
import { addToCart, loadCart } from "../../store/cart";

import "./index.css";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";

function ProductTile({ product }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showButton, setShowButton] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const directToProductDetails = () => {
    history.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
  };

  const quickAdd = () => {
    dispatch(loadCart())
    dispatch(addToCart(product, 1));
  }

  const postFavorite = async (productId) => {
    const res = await fetch(`/api/favorites/${productId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
  };

  const deleteFavorite = async (productId) => {
    const res = await fetch(`/api/favorites/${productId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      deleteFavorite(product.id);
    } else {
      postFavorite(product.id);
    }
    setIsFavorited((prevState) => !prevState);
  };

  useEffect(() => {
    const isProductFavorited = user?.favorites?.some(
      (favorite) => favorite.id === product.id
    );
    setIsFavorited(isProductFavorited);
  }, [product.id, user?.favorites]);

  return (
    <div
      className="product-tile"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="product-div" onClick={directToProductDetails}>
        <img src={product.preview_image.product_image} alt={product.name} />
        <div className="product-div-name-price-container">
        <h2>{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
        </div>
        {/* Heart icon */}
        <i
          className={isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        ></i>
        {/* {product?.reviews?.length ? (
          <span className="product-rating">
            {(
              product.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              product.reviews.length
            ).toFixed(1)}{" "}
            Stars
          </span>
        ) : (
          <p>Be the first to order and leave a review!</p>
        )} */}
      </div>
      {showButton && (
        <div className="add-to-cart-overlay">
          <button
            className="add-to-cart-button"
            onClick={ () => quickAdd()}
          >Quick Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductTile;

