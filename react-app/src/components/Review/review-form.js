import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import { editAReviewThunk, createAReviewThunk } from "../../store/product";
import { getCurr } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../Modal/delete-review-modal";
import "./index.css";

function ReviewForm({ formAction, prevReview, productId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(
    formAction === "edit" ? prevReview.stars : 0
  );
  const [review, setReview] = useState(
    formAction === "edit" ? prevReview.review : ""
  );
  const [errors, setErrors] = useState({});
  const [hover, setHover] = useState();
  let headingText =
    formAction === "edit" ? "Update Your Review" : "How was your purchase?";

  const onSubmit = async (e) => {
    e.preventDefault();
    let errorsObj = {};
    if (!review) {
      errorsObj.review = "Review is required";
    }
    if (!stars) {
      errorsObj.stars = "Star rating is required";
    }
    setErrors(errorsObj);
    if (!Object.values(errorsObj).length) {
      const form = new FormData();
      form.append("review", review);
      form.append("stars", Number(stars));
      if (formAction === "edit") {
        try {
          await dispatch(editAReviewThunk(productId, prevReview.id, form));
          await dispatch(getCurr());
          closeModal();
        } catch (e) {
          return e;
        }
      } else {
        try {
          await dispatch(createAReviewThunk(productId, form));
          await dispatch(getCurr());
          closeModal();
        } catch (e) {
          return e;
        }
      }
    }
  };
  return (
    <form className="review_form_container" onSubmit={onSubmit}>
      <div className="heading_text">
        {headingText} 
      </div>
      <label className="form_label">
        <textarea
          className="login_signup_textarea review_text_area"
          rows="8"
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <div>{errors.review ? errors.review : ""}</div>
      <div>
        <div className="review_rating_div">How would you rate it? </div>
        <div className="stars_review">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label className="star-label" key={ratingValue}>
                <input
                  type="radio"
                  name="rating"
                  value={stars}
                  onClick={(e) => setStars(ratingValue)}
                />
                <FaStar
                  size={25}
                  onMouseEnter={(e) => setHover(ratingValue)}
                  onMouseLeave={(e) => setHover(stars)}
                  className="star"
                  color={ratingValue <= (hover || stars) ? "gold" : "gray"}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div>{errors.stars ? errors.stars : ""}</div>
      <div className="buttons-div">
        <button type="submit" className="update-review-button">
          {formAction !== "edit" ? "Post Review" : "Update Review"}
        </button>
        <div className="delete_review_button">
        {formAction === "edit" ? (
          <OpenModalButton
            buttonText={
              <span>
                <i className="fa-solid fa-trash"></i>Delete Review
              </span>
            }
            className="delete_product"
            key={prevReview.id}
            modalComponent={<DeleteReviewModal reviewId={prevReview.id} />}
          />
        ) : (
          ""
        )}
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
