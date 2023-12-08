import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProduct } from "../../store/product";
import "./index.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product);

  const [isFavorited, setIsFavorited] = useState(false);


  // FAVORITES HELPERS
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



  useEffect(() => {
    const initialFetch = async () => {
      const res = await dispatch(fetchOneProduct(productId));
      if (res?.ok === false) {
        history.push("/products");
      }
    };
    initialFetch();
  }, [dispatch]);

  if (!product?.id) return null;

  const redirectToUserPage = (userId) => {
    history.push(`/users/${userId}`)
  }
  
  return (
    <div className="product-details-main-container">
      <div className="pd-top">
        <div className="prod-det-left-container">
          <h2>{product.name}</h2>
          <img src={product.preview_image?.product_image} />
          <p>{product.body}</p>
          <div className="add-to-cart-overlay-user-profile">
            <ProductModalButton
              className="add-to-cart-button"
              buttonText={"Add to Cart"}
              modalComponent={<ProductModal product={product} />}
            />
          <i
          className={isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        ></i>
          </div>
        </div>
          <div className="prod-det-right-container">
            <div className="seller-info-container"
            onClick={() => redirectToUserPage(product.user.id)}
            >
              <h2>Seller: {product.user.name}</h2>
              {product.user?.profile_picture && (
                <img src={product.user?.profile_picture} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
