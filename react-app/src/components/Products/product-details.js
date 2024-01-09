import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";
import { getCurr } from "../../store/session";
import { fetchProducts } from "../../store/products";
import ProductTile from "./product-tile";
import { clearProduct } from "../../store/product";
// import { useMemo } from "react";
import { FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProduct } from "../../store/product";
import "./index.css";
import "./product-details.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product);
  const noPictureImg =
    "https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/no-pfp.jpeg";

  const [isFavorited, setIsFavorited] = useState(false);

  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  const [randomProducts, setRandomProducts] = useState([]);
  const reviews = product.reviews;

  const timeAgoHelper = (timestampInitial) => {
    const timestamp = new Date(timestampInitial);
    const current = new Date();

    const timeDifference = current - timestamp;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    let result = "";

    if (hoursDifference < 24) {
      result = `${hoursDifference} hours ago`;
    } else if (daysDifference === 1) {
      result = `${daysDifference} day ago`;
    } else {
      result = `${daysDifference} days ago`;
    }
    return result;
  };

  useEffect(() => {
    const filtered = products.filter(
      (prod) => prod.category === product.category && prod.id !== product.id
    );
    const newRandomProducts = filtered
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setRandomProducts(newRandomProducts);
  }, [product, productsObj]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const isProductFavorited = user?.favorites?.some(
      (favorite) => favorite.id === product.id
    );
    setIsFavorited(isProductFavorited);
  }, [product.id, user?.favorites]);

  const redirectToUserPage = (userId) => {
    history.push(`/users/${userId}`);
  };
  // console.log('RANDOMPRODUCTS', randomProducts)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(getCurr());
      console.log(productId, 'PRODUCTID')
      const res = await dispatch(fetchOneProduct(productId));
      await dispatch(fetchProducts());
      if (res?.ok === false) {
        history.push("/products");
      }
      setIsLoading(false);
    };
    initialFetch();
  }, [dispatch, productId]);

  if (isLoading || !product?.id) {
    return <div>Loading...</div>;
  }
  if (!Object.values(products).length) return null;
  // const redirectToProdDet = (product) => {
  //   let id = product.id
  //   history.push(`/${id}`)
  // }
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

  return (
    <div className="product-details-main-container">
      {/* <div className="prod-details-top-container"> */}
      <div className="prod-det-product-container">
          <h2>{product.name}</h2>
          <img src={product.preview_image?.product_image} alt={product.name} />
          <div
            className="seller-info-container"
            onClick={() => redirectToUserPage(product.user.id)}
          >
            <h2>Seller:</h2>
            <img
              id="pd-seller-img"
              src={
                product.user?.profile_picture
                  ? product.user?.profile_picture
                  : noPictureImg
              }
              alt={product.user.name}
            />

            <h2 id="prod-det-seller-name">{product.user.name}</h2>
          </div>
          <div className="body-price">
            <p id="pd-body">{product.body}</p>
            <p id="pd-price">${product.price}</p>
          </div>
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

          <div className="overlay-user-profile">
            <ProductModalButton
              className="add-to-cart-button"
              buttonText={"Add to Cart"}
              key={product.id}
              modalComponent={<ProductModal product={product} />}
            />
          </div>
          {/* </div> */}
      </div>

      <h2 className="you-may-also-like">You May Also Like</h2>
      <div id="similar-products-container">
        {randomProducts.length > 0 &&
          randomProducts.map((product) => <ProductTile product={product} />)}
      </div>

      {/* REVIEWS CONTAINER */}
      <div className="prod-det-reviews-main-container">
        <h2 className="review-heading">Reviews</h2>
        <div className="reviews-container">
          {reviews.length &&
            reviews.map((review) => (
              <div className="review-wrapper">
                <div className="reviewer-details">
                  <img src={review.user.profile_picture} />
                  <h3>{review.user.name}</h3>
                  <h5>{timeAgoHelper(review.created_at)}</h5>
                </div>
                <div className="review-stars">
                  {[...Array(Math.round(review.stars))].map((star) => {
                    return <FaStar color="gold" />;
                  })}
                  {[...Array(5 - Math.round(review.stars))].map((star) => {
                    return <FaStar color="gray" />;
                  })}
                </div>
                <h3>{review.review}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
