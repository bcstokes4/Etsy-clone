const LOAD_CART_COOKIE = "cart/LOAD_CART_COOKIE";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const UPDATE_CART_ITEM_QTY = "cart/UPDATE_CART_ITEM_QTY";
const CHECKOUT_CART = "cart/CHECKOUT_CART";
const REMOVE_PRODUCTS_FROM_CART = "cart/REMOVE_PRODUCTS_FROM_CART";

// Action Creators
export const loadCart = () => ({
  type: LOAD_CART_COOKIE,
});

export const addToCart = (product, qty = 1) => ({
  type: ADD_TO_CART,
  product,
  qty,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  product,
});

export const updateCartQty = (product, qty) => ({
  type: UPDATE_CART_ITEM_QTY,
  product,
  qty,
});

export const clearCart = () => ({
  //Empty Cart
  type: CHECKOUT_CART,
});

export const removeProductsFromCart = (productId) => ({
  type: REMOVE_PRODUCTS_FROM_CART,
  productId,
});

// Thunk Action Creators
export const submitOrder = (body) => async (dispatch) => {
  const response = await fetch(`/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(clearCart);
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const loadCartThunk = () => async (dispatch) => {
  let cart = localStorage.getItem("cart");
  let products = {};
  if(cart?.length){
    const objectProducts = Object.values(JSON.parse(cart));
    for (const key in objectProducts) {
      const product = objectProducts[key];
      const res = await fetch(`/api/products/${product.id}`);
      if (res.ok) {
        const data = await res.json(); //included for test
        products[product.id] = { ...product, ...data }; //included for test
      }
    }
    localStorage.setItem("cart", JSON.stringify(products));
    dispatch(loadCart());
  }
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CART_COOKIE:
      let cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : {};

    case ADD_TO_CART:
  const productId = action.product.id;
  const updatedProduct = {
    ...action.product,
    qty: (state[productId] ? state[productId].qty : 0) + parseInt(action.qty),
  };
  const updatedCart = {
    ...state,
    [productId]: updatedProduct,
  };
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;


    case REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState[action.product.id];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case UPDATE_CART_ITEM_QTY:
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          [action.product.id]: { ...action.product, qty: parseInt(action.qty) },
        })
      );
      return {
        ...state,
        [action.product.id]: { ...action.product, qty: parseInt(action.qty) },
      };
    case CHECKOUT_CART:
      localStorage.removeItem("cart");
      return {};
    case REMOVE_PRODUCTS_FROM_CART:
      const newCartState = { ...state };
      for (const key in newCartState) {
        if (newCartState[key].product.id === action.product) {
          delete newCartState[key];
        }
      }
      localStorage.setItem("cart", JSON.stringify(newCartState));
      return newCartState;
    default:
      return state;
  }
};
export default cartReducer;
