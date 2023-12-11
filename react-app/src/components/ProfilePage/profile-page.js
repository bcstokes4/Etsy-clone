import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import ProductForm from "../Forms/ProductForm";
import ProductTile from "../Products/product-tile";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../Modal/delete-product-modal";
import { getCurr } from "../../store/session";
import "./index.css";

function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const favorites = sessionUser?.favorites;
  const noPictureImg = 'https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/no-pfp.jpeg'
  
  useEffect(() => {
    dispatch(getCurr());
  }, [dispatch]);
  useEffect(() => {
    if (!sessionUser) {
      history.push("/products");
    }
  }, [sessionUser, history, dispatch]);
  if (!sessionUser) return null;

  const orderDate = (createdAt) => {
    let parts = createdAt.split(' ')
    return parts.slice(0,4).join(' ')
  }

  const monthsArray = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  console.log(sessionUser, 'SESSIONUSER')
  const parts = sessionUser?.created_at.split(' ');
  let monthAbbreviation;
  let fullMonth;
  if(parts){
    monthAbbreviation = parts[2]
    fullMonth = monthsArray.find(month => month.startsWith(monthAbbreviation.trim()));
  } 
  return (
    <div className="profile-main-container">
      <div className="user-profile-container">
        <h2>{sessionUser.name}</h2>
        <h3>{sessionUser.email}</h3>
        
          <img src={sessionUser?.profile_picture ? sessionUser.profile_picture : noPictureImg} alt="Profile" />
       
        <h3>Member since {fullMonth} {parts[3]}</h3>
        <OpenModalButton
          buttonText={"Create Product"}
          className="create_component"
          key={sessionUser.id}
          modalComponent={<ProductForm formAction={"create"} />}
        />
      </div>
        <h2 id="prod-head">{ favorites.length ? 'My Favorites' : ''}</h2>
      <div className="favorites-container">
        {favorites.map((product) => (
          <ProductTile product={product} key={product.id}/>
        ))}
      </div>
      <div className="orders-container">
        <h2>Orders</h2>
        <div>
          {sessionUser &&
            sessionUser.orders.length > 0 &&
            sessionUser.orders.map((order) => (
              <div className="user-order-container" key={order.id}>
                <h2>{orderDate(order.created_at)}</h2>
                {order.products.length > 0 &&
                  order.products.map((product) => (
                    <div className="order-item-container" key={product.id}>
                      <div className="order-text-container">
                        <h4>{product.product.name}</h4>
                        <p>{product.product.body}</p>
                        <p>Price: <span className="money">${product.product.price}</span></p>
                      </div>
                      <img
                        src={product.product.preview_image.product_image}
                        alt={product.product.name}
                        className="user-order-image"
                      />
                      <p>x{product.quantity}</p>
                    </div>
                  ))}
                <p>Total: <span className="money">${order.price}</span></p>
              </div>
            ))}
        </div>
      </div>
      <div className="user-products-container">
        <h2 id="prod-head"> {sessionUser.products.length ? "Products" : null}</h2>
        <div>
          {sessionUser &&
            sessionUser.products.map((product) => (
              <div className="user-product-container">
                <div className="product-text-container">
                  <h4>{product.name}</h4>
                  <p>{product.body}</p>
                  <p>
                    ${Number.isInteger(product.price)
                      ? `${product.price}.00`
                      : product.price.toFixed(2)}
                  </p>
                </div>
                <img src={product.preview_image.product_image} />
                <div className="user-products-button-container">
                  <OpenModalButton
                    buttonText={"Delete Product"}
                    className="delete_product"
                    key={product.id}
                    modalComponent={<DeleteModal id={product.id} />}
                  />
                  <OpenModalButton
                    buttonText={"Update Product"}
                    className={"update_component"}
                    key={product}
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
