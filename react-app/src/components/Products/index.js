import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products"
import ProductTile from "./product-tile";
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
            <ProductTile product={product} key={product.id}/>
        ))}
        </div>
        </>
    )
}

export default AllProducts;