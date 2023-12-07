import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products";
import ProductTile from "./product-tile";
import "./index.css";

function AllProducts() {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  const filterProductsByCategory = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="products-main-container">
      <h1>Products</h1>
      <div className="category-links">
        
        <button onClick={() => filterProductsByCategory("All")}>All</button>
        <button onClick={() => filterProductsByCategory("Football")}>
          Football
        </button>
        <button onClick={() => filterProductsByCategory("Soccer")}>
          Soccer
        </button>
        <button onClick={() => filterProductsByCategory("Baseball")}>
          Baseball
        </button>
        <button onClick={() => filterProductsByCategory("Basketball")}>
          Basketball
        </button>
        <button onClick={() => filterProductsByCategory("Track")}>
          Track
        </button>
        <button onClick={() => filterProductsByCategory("Swimming")}>
          Swimming
        </button>
        <button onClick={() => filterProductsByCategory("Lacrosse")}>
          Other
        </button>
      </div>
      
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductTile product={product} key={product.id} />
        ))
      ) : (
        products.map((product) => (
          <ProductTile product={product} key={product.id} />
        ))
      )}
    </div>
  );
}

export default AllProducts;
