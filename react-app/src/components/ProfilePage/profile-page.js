import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import ProductForm from "../Forms/ProductForm";
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../Modal/delete-product-modal";
import { getCurr } from "../../store/session";
import "./index.css"


function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (!sessionUser) {
      history.push("/products");
    }
    }
  ,[sessionUser, history, dispatch]);

  return (
    <div className="profile-main-container">
      <div className="orders-container">
        <h2>Orders</h2>
        <div>
        {sessionUser && sessionUser.orders.length &&
  sessionUser.orders.map((order) =>
    order.products.length && order.products.map((product) => (
      <div className="user-order-container" key={product.id}>
        <div className="order-text-container">
          <h4>{product.name}</h4>
          {/* Assuming `body` is a valid property */}
          <p>{product.body}</p>
          <p>{product.price}</p>
        </div>
        {/* Assuming `preview_image` is an object containing `product_image` */}
        <img src={product.preview_image.product_image} alt={product.name} />
      </div>
    ))
  )
}
        </div>
      </div>
      <div className="products-container">
      <h2>{sessionUser.products.length ? 'Products' : null}</h2>
        <div>
          {sessionUser &&
            sessionUser.products.map((product) => (
              <div className="user-product-container">
                <div className="product-text-container">
                  <h4>{product.name}</h4>
                  <p>{product.body}</p>
                  <p>{product.price}</p>
                </div>
                <img src={product.preview_image.product_image} />
                <div className="user-products-button-container">
                        <OpenModalButton
                          buttonText={"Delete Item"}
                          className="delete_item"
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
