import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import { clearCart, submitOrder, loadCartThunk } from "../../store/cart";
import "./checkout.css";

function CheckoutProduct() {

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  useEffect(() => {
    // Dispatch the loadCart action when the component mounts
    dispatch(loadCartThunk());
  }, [dispatch]);

  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const cartProducts = Object.values(cart);
  const productOrders = {};

  cartProducts.forEach((product) => {
    productOrders[product.id] = {
      ...productOrders[product.id],
      [product.id]: product,
    };
  });



 
//     let productsArr = Object.values(productOrders)
//     let total = 0
//     console
//     // productsArr.forEach( productObj => {
        
//     //     console.log(productObj.price, 'TESTING HERE')
    
//   })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (!user.user) {
      setModalContent(<LoginFormModal />);
      return;
    }

    const errorsObj = {};
    if (!address) {
      errorsObj.address = "Address is required";
    }

    setErrors(errorsObj);
    let total = 0
    const productsArr = cartProducts.map((product) => ({
        id: product.id,
        quantity: product.qty,
        // Add other necessary fields from product object
      }));
      
    const bodyOrder = {
        'user_id': user.user.id,
        'is_completed': false,
        'address': address,
        'price': 1.00,
        created_at: new Date(),
        'products': productsArr
    }
    console.log(bodyOrder)
    let res = await dispatch(submitOrder(bodyOrder));

    if (!res.errors) {
      await dispatch(clearCart());
    //   history.push("/current");
    } else {
      errorsObj.errors = res.errors;
      setErrors(errorsObj);
    }
  };

  console.log(Object.values(productOrders))
  return (
    <>
      <div className="checkout-products-container">
        {cartProducts.map((productObj) => (
          <div className="checkout-product">
            <h3>{productObj.name}</h3>
            <img src={productObj.preview_image.product_image} />
            <p>Quantity: {productObj.qty}</p>
          </div>
        ))}
      </div>
      <form className="checkout_form" onSubmit={handleSubmit}>
        <label className="form_element address_form_element">
          Address
          <input
            className="form_element_borders"
            placeholder="Delivery Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        {errors.address && <p className="errors">{errors.address}</p>}

        <button className="checkout_button">Place Order</button>
      </form>
    </>
  );
}

export default CheckoutProduct;
