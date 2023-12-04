import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products"
import "./index.css"
function AllProducts(){
    const dispatch = useDispatch()
    const productsObj = useSelector( state => state.products)
    const products = Object.values(productsObj)

    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);
      
    return (
        <>
        <div className="products-main-container">
        <h1>Products</h1>
        {products && products.map( product => (
            <div className="product-div">
                {product.name}
                {product.preview_image && <img src={product.preview_image.product_image} alt={product.name}/>}
            </div>
        ))}
        </div>
        </>
    )
}

export default AllProducts;