import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";
import { getCurr } from "../../store/session";
import { fetchProducts } from "../../store/products";
import ProductTile from "./product-tile";
import { useMemo } from "react";

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
  const noPictureImg = 'https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/no-pfp.jpeg'

  const [isFavorited, setIsFavorited] = useState(false);

  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (prod) => prod.category === product.category && prod.id !== product.id
    );
    const newRandomProducts = filtered.sort(() => Math.random() - 0.5).slice(0, 5);
    setRandomProducts(newRandomProducts);
  }, [product, productsObj]);
  // const filteredProducts = products.filter(
  //   (prod) => prod.category === product.category && prod.id !== product.id
  // );
  // const randomProducts = filteredProducts
  //   .sort(() => Math.random() - 0.5)
  //   .slice(0, 5);

  useEffect(() => {
    const isProductFavorited = user?.favorites?.some(
      (favorite) => favorite.id === product.id
    );
    setIsFavorited(isProductFavorited);
  }, [product.id, user?.favorites]);

  const redirectToUserPage = (userId) => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(getCurr());
      const res = await dispatch(fetchOneProduct(productId));
      await dispatch(fetchProducts());
      if (res?.ok === false) {
        history.push("/products");
      }
    };
    initialFetch();
  }, [dispatch, productId]);

  if (!product?.id) return null;
  if (!Object.values(products).length) return null;

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
      <div className="prod-det-product-container">
        <h2>{product.name}</h2>
        <img src={product.preview_image?.product_image} alt={product.name} />
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
        <div className="add-to-cart-overlay-user-profile">
          <ProductModalButton
            className="add-to-cart-button"
            buttonText={"Add to Cart"}
            key={product.id}
            modalComponent={<ProductModal product={product} />}
          />
        </div>
      </div>
      <div
        className="seller-info-container"
        onClick={() => redirectToUserPage(product.user.id)}
      >
        <h2>Seller:</h2>
        
          <img
            id="pd-seller-img"
            src={product.user?.profile_picture ? product.user?.profile_picture : noPictureImg}
            alt={product.user.name}
          />
        
        <h2>{product.user.name}</h2>
      </div>
      <h2>You May Also Like</h2>
      <div id="similar-products-container">
        {randomProducts.length > 0 &&
          randomProducts
            .map((product) => <ProductTile product={product} />)}
      </div>
    </div>
  );
}

export default ProductDetails;
