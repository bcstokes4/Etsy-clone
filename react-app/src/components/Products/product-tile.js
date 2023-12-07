// ProductTile Component
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";

function ProductTile({ product }) {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);

  const directToProductDetails = () => {
    history.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

  };

  return (
    <div
      className="product-tile"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div
        className="product-div"
        onClick={directToProductDetails}
      >
        <h2>{product.name}</h2>
        <img src={product.preview_image.product_image} alt={product.name} />
        <p>${product.price}</p>
        {product?.reviews?.length ? (
          <span className="product-rating">
            {(
              product.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              product.reviews.length
            ).toFixed(1)}{" "}
            Stars
          </span>
        ) : (
          <p>Be the first to order and leave a review!</p>
        )}
      </div>
      {showButton && (
        <div className="add-to-cart-overlay">
          <ProductModalButton
        className='add-to-cart-button'
        buttonText={'Add to Cart'}
        modalComponent={<ProductModal product={product} />}
        />
        {/* <button>
          Add to Cart Modal
        </button>
      <ProductModalButton/> */}
        </div>
      )}
    </div>
  );
}

export default ProductTile;
