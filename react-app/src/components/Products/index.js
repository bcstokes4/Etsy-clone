import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products";
import ProductTile from "./product-tile";
import "./index.css";
import { fetchDeleteProduct } from "../../store/product";

function AllProducts() {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  if (currentPage == 0) setCurrentPage(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredProducts.length
    ? filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    : products.slice(indexOfFirstItem, indexOfLastItem);

  const totalItemsCount = filteredProducts.length || products.length;
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, currentPage, totalPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchDeleteProduct())
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProductsByCategory = (category) => {
    if (category === "All") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  return (
    <div className="products-main-container">
      {/* <h1>Products</h1> */}
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
        <button onClick={() => filterProductsByCategory("Track")}>Track</button>
        <button onClick={() => filterProductsByCategory("Swimming")}>
          Swimming
        </button>
        <button onClick={() => filterProductsByCategory("Lacrosse")}>
          Lacrosse
        </button>
      </div>

      <div className="products-container-main">
        {currentItems.length > 0 &&
          currentItems.map((product) => (
            <ProductTile product={product} key={product.id} />
          ))}
      </div>
      <div className="page_buttons">
        <button
          className={
            currentPage === 1 ? "disabled_previous_page" : "previous_page"
          }
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="pages">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              disabled={number === currentPage}
              className={
                number === currentPage
                  ? "disabled_selected_page"
                  : "selected_page"
              }
            >
              {number}
            </button>
          ))}
        </div>
        <button
          className={
            currentPage === totalPages ? "disabled_next_page" : "next_page"
          }
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <div className="items_per_page">
          <label>Items per page: </label>
          <select
            className="select_items_per_page"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
