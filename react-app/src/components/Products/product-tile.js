import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurr } from "../../store/session";
import { addToCart, loadCart } from "../../store/cart";
import { FaStar } from "react-icons/fa";

import "./index.css";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";

function ProductTile({ product }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showButton, setShowButton] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const reviews = product.reviews;
  let reviewRating = 0;
  reviews.forEach((review) => {
    reviewRating += review.stars;
  });
  let avgReview = 0;
  if (reviews.length > 0) {
    avgReview = reviewRating / reviews.length;
  }
  let reviewText;
  if (reviews.length == 1) {
    reviewText = "review";
  } else {
    reviewText = "reviews";
  }
  const directToProductDetails = () => {
    history.push(`/products/${product.id}`);
  };
  // console.log('PRODUCT', reviews)
  // const handleAddToCart = (e) => {
  //   e.stopPropagation();
  // };

  const quickAdd = (e) => {
    dispatch(loadCart());
    dispatch(addToCart(product, 1));
    e.target.classList.add('clicked');
    setTimeout(() => {
      e.target.classList.remove('clicked');
    }, 100);
  };

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
        <div className="product-div-name-owner-container">
          <h2>{product.name}</h2>
          <div>By: {product.user.name}</div>
        </div>
        <span>
          <div className="rating-div">
            {reviews.length ? (
              <div>
                  {[...Array(Math.round(avgReview))].map((star) => {
                    return <FaStar color="gold" />;
                  })}
                  {[...Array(5 - Math.round(avgReview))].map((star) => {
                    return <FaStar color="gray" />;
                  })}
                  <span>({reviews.length})</span>
              </div>
            ) : (
              <div>
                  {" "}
                  {[...Array(5 - Math.round(avgReview))].map((star) => {
                    return <FaStar color="gray" />;
                  })}
                  <span>({reviews.length})</span>
                {/* <div>No reviews yet</div> */}
              </div>
            )}
          </div>
        </span>
        <p>${product.price.toFixed(2)}</p>
        {/* Heart icon */}
        {user && (
          <i
            className={
              isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          ></i>
        )}
      </div>
      {showButton && (
        <div className="add-to-cart-overlay">
          <button className="add-to-cart-button" onClick={(e) => quickAdd(e)}>
            Quick Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductTile;
