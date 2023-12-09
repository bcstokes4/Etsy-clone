import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductModalButton from "./product-modal-button";
import ProductModal from "./product-modal";
import { getCurr } from "../../store/session";
import { fetchProducts } from "../../store/products";
import ProductTile from "./product-tile";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProduct } from "../../store/product";
import "./index.css";
import "./product-details.css"
function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product);

  const [isFavorited, setIsFavorited] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  const filteredProducts = products.filter(
    (prod) => prod.category === product.category && prod.id !== product.id
  );
  // useEffect(() => {
  //   const FilterProductsByCategory = async () => {
  //     const filtered = products.filter(
  //       (prod) => prod.category === product.category
  //     );
  //     setFilteredProducts(filtered);
  //   };

  //   FilterProductsByCategory();
  // }, [product.category]);
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
  }, [dispatch]);

  if (!product?.id) return null;
  if (!Object.values(products).length) return null
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

  // FILTER PRODUCTS FUNCTIONS


  console.log(filteredProducts, "FILTERED");

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
        <h2>VIEW SIMILAR PRODUCTS</h2>
      <div id="similar-products-container">
        {filteredProducts.length > 0 &&
          filteredProducts.slice(0,5).map((product) => (
              <ProductTile product={product} />
          ))}
      </div>
      <div className="prod-det-product-container">
        <h2>{product.name}</h2>
        <img src={product.preview_image?.product_image} alt={product.name} />
        <p>{product.body}</p>
        <div className="add-to-cart-overlay-user-profile">
          <ProductModalButton
            className="add-to-cart-button"
            buttonText={"Add to Cart"}
            modalComponent={<ProductModal product={product} />}
          />
          <i
            className={
              isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          ></i>
        </div>
      </div>

      <div
        className="seller-info-container"
        onClick={() => redirectToUserPage(product.user.id)}
      >
        <h2>Seller: {product.user.name}</h2>
        {product.user?.profile_picture && (
          <img src={product.user?.profile_picture} alt={product.user.name} />
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
