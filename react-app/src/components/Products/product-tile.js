import { useHistory } from "react-router-dom"
import "./index.css"


function ProductTile({product}) {
    const history = useHistory()
    const directToProductDetails = () => {
        history.push(`/products/${product.id}`)
    }
return (
    <div className="product-tile" onClick={directToProductDetails}>
    <h2>{product.name}</h2>
    <img src={product.preview_image.product_image}/>
    {product?.reviews?.length ? (
          <span className="product-rating">
            {(
              product.reviews.reduce((curr, prev) => curr + prev.stars, 0) /
              product.reviews.length
            ).toFixed(1)}
          </span>
        ) : null}
</div>
)
}

export default ProductTile;