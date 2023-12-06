import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import ProductForm from "../Forms/ProductForm";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../Modal/delete-product-modal";
import { getCurr } from "../../store/session";
import "./index.css";

function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (!sessionUser) {
      history.push("/products");
    }
  }, [sessionUser, history, dispatch]);
  if (!sessionUser) return null;
  return (
    <div className="profile-main-container">
      <div className="user-profile-container">
        <h2>{sessionUser.name}</h2>
        {sessionUser?.profile_picture ? (
          <img src={sessionUser.profile_picture} alt="Profile" />
        ) : null}
        <OpenModalButton
          buttonText={"Create Product"}
          className={"create_component"}
          modalComponent={<ProductForm formAction={"create"} />}
        />
      </div>

      <div className="orders-container">
        <h2>Orders</h2>
        <div>
          {sessionUser &&
            sessionUser.orders.length > 0 &&
            sessionUser.orders.map((order) => (
              <div className="user-order-container" key={order.id}>
                {order.products.length > 0 &&
                  order.products.map((product) => (
                    <div className="order-item-container" key={product.id}>
                      <div className="order-text-container">
                        <h4>{product.product.name}</h4>
                        <p>{product.product.body}</p>
                        <p>Product price: {product.product.price}</p>
                      </div>
                      <img
                        src={product.product.preview_image.product_image}
                        alt={product.product.name}
                        className="user-order-image"
                      />
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  ))}
                  <p>Total: {order.price}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="products-container">
        <h2>{sessionUser.products.length ? "Products" : null}</h2>
        <div>
          {sessionUser &&
            sessionUser.products.map((product) => (
              <div className="user-product-container">
                <div className="product-text-container">
                  <h4>{product.name}</h4>
                  <p>{product.body}</p>
                  <p>
                    {Number.isInteger(product.price)
                      ? `${product.price}.00`
                      : product.price.toFixed(2)}
                  </p>
                </div>
                <img src={product.preview_image.product_image} />
                <div className="user-products-button-container">
                  <OpenModalButton
                    buttonText={"Delete Product"}
                    className="delete_product"
                    modalComponent={<DeleteModal id={product.id} />}
                  />
                  <OpenModalButton
                    buttonText={"Update Product"}
                    className={"update_component"}
                    modalComponent={
                      <ProductForm formAction={"edit"} product={product} />
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
