import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./index.css"


function ProfilePage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!sessionUser) {
      history.push("/products");
    }
  }, [sessionUser, history]);
  console.log(sessionUser, "SESSIONUSER");
  return (
    <div className="profile-main-container">
      <div className="orders-container">
        <h2>Orders</h2>
      </div>
      <div className="products-container">
        <h2>Products</h2>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
