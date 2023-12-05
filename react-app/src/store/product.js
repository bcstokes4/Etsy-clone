const RECEIVE_PRODUCT = "/restaurants/RECEIVE_PRODUCT";
const REMOVE_PRODUCT = "/restaurants/REMOVE_PRODUCT";
const CREATE_REVIEW = "/reviews/CREATE_REVIEW";
const DELETE_REVIEW = "/reviews/DELETE_REVIEW";

export const receiveProduct = (product) => ({
    type: RECEIVE_PRODUCT,
    product,
  });
  
  export const removeProduct = (id) => ({
    type: RECEIVE_PRODUCT,
    id
  });
  
  const createAReview = (review) => {
    return {
      type: CREATE_REVIEW,
      review,
    };
  };
  
  const deleteAReview = (reviewId) => {
    return {
      type: DELETE_REVIEW,
      reviewId,
    };
  };

// Thunks

export const fetchOneProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
  
    if (response.ok) {
      const data = await response.json();
      dispatch(receiveProduct(data));
      return data;
    } else {
      return response;
    }
  };

  export const createAReviewThunk = (productId, review) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const rev = await res.json();
      dispatch(createAReview(rev));
      return rev;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(deleteAReview(reviewId));
    return;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const singleProductReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return {...action.product}
        default:
            return state
    }
}

export default singleProductReducer