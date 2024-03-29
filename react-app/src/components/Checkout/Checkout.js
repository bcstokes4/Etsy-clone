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
    
    dispatch(loadCartThunk());
  }, [dispatch]);
  useEffect(() => {
    // Redirect if cart is empty
    if (Object.keys(cart).length === 0) {
      history.push('/current');
    }
  }, [cart, history]);
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
    if (address.length > 200) {
      errorsObj.address = "Address must be less than 200 characters";
    }

    setErrors(errorsObj);
    let total = 0
    
    if (!Object.values(errorsObj).length){

      const productsArr = cartProducts.map((product) => {
        const totalPriceForProduct = product.price * product.qty;
        total += totalPriceForProduct; 
        return {
          id: product.id,
          quantity: product.qty,
        };
      });
        
      const bodyOrder = {
          'user_id': user.user.id,
          'is_completed': false,
          'address': address,
          'price': total.toFixed(2),
          'created_at': new Date(),
          'products': productsArr
      }
      let res = await dispatch(submitOrder(bodyOrder));
  
      if (!res.errors) {
        await dispatch(clearCart());
        history.push("/current");
      } else {
        errorsObj.errors = res.errors;
        setErrors(errorsObj);
      }
    }
  };

  return (
    <>
      <div className="checkout-products-container">
        {cartProducts.map((productObj) => (
          <div className="checkout-product">
            <h3>{productObj.name}</h3>
            <img src={productObj.preview_image.product_image} alt='product'/>
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
        <p className="errors">{errors.address ? errors.address : ''}</p>

        <button className="checkout_button">Place Order</button>
      </form>
    </>
  );
}

export default CheckoutProduct;
