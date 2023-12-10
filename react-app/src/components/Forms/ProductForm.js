import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import './product-form.css'

import {
  fetchCreateProduct,
  fetchUpdateProduct,
  fetchEditProductImage,
  fetchCreateProductImage
} from "../../store/products";
import { getCurr } from "../../store/session";
// import { useHistory } from "react-router-dom";

function ProductForm({ product, formAction }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState(formAction === "edit" ? product.name : "");
  const [body, setBody] = useState(formAction === "edit" ? product.body : "");
  const [price, setPrice] = useState(
    formAction === "edit" ? Number(product.price).toFixed(2) : ""
  );  const [category, setCategory] = useState(
    formAction === "edit" ? product.category : ""
  );
  const [previewImage, setPreviewImage] = useState(
    formAction === "edit" ? product.preview_image.product_image : null
  );
  const [localImage, setLocalImage] = useState(
    formAction === "edit" ? product.preview_image.product_image : null
  );

  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  function onFileChange(e) {
    if(!e.target.files[0]) {
      setPreviewImage(null)
      setLocalImage(null)
    }
    else {
      setPreviewImage(e.target.files[0]);
    setLocalImage(URL.createObjectURL(e.target.files[0]));
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorsObj = {};

    if(!/\.\d{2}$/.test(price.toString())){
      errorsObj.price = 'Price must be in the format $19.99 (2 decimal places)'
    }
    if(!price) {
      errorsObj.price = 'Price is required'
    }
    if(!name){
      errorsObj.name = 'Name is required'
    }
    if(name.length > 100){
      errorsObj.name = 'Name must be less than 100 characters'
    }
    if(!body){
      errorsObj.body = 'Description is required'
    }
    if(body.length > 255){
      errorsObj.body = 'Description must be less than 255 characters'
    }
    if(!category){
      errors.localImage = 'Product Category is required'
    }
    if (!previewImage || previewImage === null || previewImage === undefined) {
      errorsObj.image = 'Product Image is required';
    }

    if (!Object.keys(errorsObj).length) {
      const form = new FormData();
      const imageForm = new FormData();

      form.append("name", name);
      form.append("body", body);
      form.append("price", price);
      form.append("category", category);

      imageForm.append("product_image", previewImage);
      imageForm.append("preview_image", true);

      
      setImageLoading(true);

      if (formAction === "edit") {
        await dispatch(fetchUpdateProduct(product.id, form));
        if (previewImage !== localImage){
          await dispatch(fetchEditProductImage(product.id,product.preview_image.id, imageForm))
        }
        await dispatch(getCurr())
        // history.push(`/products/${product.id}`)
        closeModal();
      } else {
        const res = await dispatch(fetchCreateProduct(form))
        await dispatch(fetchCreateProductImage(res.id, imageForm))
        await dispatch(getCurr())
        // history.push(`/products/${res.id}`);
        closeModal();
      }
    }
    else {
      setErrors(errorsObj)
    }
  };

  return (
    <div>
      <form enctype="multipart/form-data" onSubmit={handleSubmit} className="prod-form">
        <label>
          Product Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p className="prod-form-errors">{errors.name ? errors.name : ''}</p>
        <label>
          Body
          <textarea
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
         <p className="prod-form-errors">{errors.body ? errors.body : ''}</p>

        <label>
          Price $
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
          <p className="prod-form-errors">{errors.price ? errors.price : ''}</p>
        <label className="form_element">
          <h3 className="form_text_product">Category</h3>
          <select
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Category"
            required
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="Football">Football</option>
            <option value="Soccer">Soccer</option>
            <option value="Baseball">Baseball</option>
            <option value="Basketball">Basketball</option>
            <option value="Track">Track</option>
            <option value="Swimming">Swimming</option>
            <option value="Lacrosse">Lacrosse</option>
          </select>
        </label>
        <p className="prod-form-errors">{errors.category ? errors.category : ''}</p>

        <label className="item-form-labels">
          Upload Image
          <input
            id="item-img-input"
            type="file"
            name="Item Image"
            accept=".jpg, .jpeg, .png"
            onChange={onFileChange}
          />
          {localImage && (
            <div>
              <img id="item_form_img" src={localImage} alt="" />
            </div>
          )}
        </label>
            <p className="prod-form-errors">{errors.image ? errors.image : ''}</p>
        <button className="item-submit-button">Submit</button>
        {imageLoading && <p>Image is Loading...</p>}
      </form>
    </div>
  );
}

export default ProductForm;
