import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProduct } from "../../store/product";
import "./index.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product);

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
  return (
    <div className="product-details-main-container">
      <div className="pd-top">
        <div className="prod-det-left-container">
          <h2>{product.name}</h2>
          <img src={product.preview_image?.product_image} />
        </div>
        <div className="prod-det-right-container">
          <div className="seller-info-container">
            <h2>Seller: {product.user.name}</h2>
            {product.user?.profile_picture && <img src={product.user?.profile_picture}/>}
          </div>
          <p>{product.body}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
