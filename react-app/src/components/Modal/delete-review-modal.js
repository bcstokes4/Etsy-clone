import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReviewThunk } from "../../store/product";
import React from "react";
import { getCurr } from "../../store/session";
import './delete-product-modal.css'

const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const product = useSelector((state) => state.product);
//   const item = Object.values(restaurant.items).find((item) => item.id == id);
  const onDelete = async (e) => {
    e.preventDefault(e);
    await dispatch(deleteAReviewThunk(reviewId));
    await dispatch(getCurr())
    closeModal();
  };

  return (
    <div className="delete-product-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-product-span">
        Are you sure you want to delete this Review?
      </span>
      <button
        className="confirm-delete"
        style={{ cursor: "pointer" }}
        onClick={onDelete}
      >
        Yes (Delete Review)
      </button>
      <button
        className="do-not-delete-product"
        style={{ cursor: "pointer" }}
        onClick={closeModal}
      >
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;