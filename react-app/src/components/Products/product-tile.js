import { useHistory } from "react-router-dom"
import "./index.css"
import ProductModalButton from "./product-modal-button"
import ProductModal from "./product-modal"

function ProductTile({product}) {
    const history = useHistory()
    const directToProductDetails = () => {
        history.push(`/products/${product.id}`)
    }
return (
    // <div className="product-tile" onClick={directToProductDetails}>
    <ProductModalButton
    buttonText={
      <>
      <h2>{product.name}</h2>
    <img src={product.preview_image.product_image}/>
    {product?.reviews?.length ? (
          <span className="product-rating">
            {(
              product.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              product.reviews.length
            ).toFixed(1)}
          </span>
        ) : <p>Be the first to order and leave a review!</p>}
      </>
    }
    modalComponent={<ProductModal product={product}/>}
    />
    // </div>
)
}

export default ProductTile;