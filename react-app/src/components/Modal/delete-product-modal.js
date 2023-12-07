import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteProduct } from "../../store/products";
import React from "react";
import { getCurr } from "../../store/session";
// import { removeFromCart } from "../../store/cart";

const DeleteModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const product = useSelector((state) => state.product);
//   const item = Object.values(restaurant.items).find((item) => item.id == id);
  const onDelete = async (e) => {
    e.preventDefault(e);
    await dispatch(fetchDeleteProduct(id));
    await dispatch(getCurr())
    // dispatch(removeFromCart(item));
    closeModal();
  };

  return (
    <div className="delete-product-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-product-span">
        Are you sure you want to delete this Product?
      </span>
      <button
        className="confirm-delete"
        style={{ cursor: "pointer" }}
        onClick={onDelete}
      >
        Yes (Delete Product)
      </button>
      <button
        className="do-not-delete-product"
        style={{ cursor: "pointer" }}
        onClick={closeModal}
      >
        No (Keep Product)
      </button>
    </div>
  );
};

export default DeleteModal;
