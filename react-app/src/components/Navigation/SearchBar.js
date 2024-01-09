import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../../store/products";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./SearchBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ className }) {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains("search_term_target")) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search_bar_main_container">
      <div className="search_bar_glass">
        <input
          type="text"
          placeholder="Search by Product name"
          value={searchTerm}
          onChange={handleInputChange}
          className="search_bar search_term_target"
        />
        {searchTerm && (
          <FaTimes
            className="clear_search_icon search_term_target"
            onClick={handleClearSearch}
          />
        )}
        <FaSearch className="search_icon search_term_target" />
      </div>
      <div className="search-items-map-wrapper">
        {searchTerm &&
          filteredItems
            .map((item) => (
              <div
                onClick={() => {
                  history.push(`/products/${item.id}`);
                  setSearchTerm("");
                }}
                className="search_term_result search_term_target"
                key={item.id}
              >
                <img
                  className="search_term_img search_term_target"
                  src={item.preview_image.product_image}
                  alt={item.name}
                />
                <div className="item_name_brand_search search_term_target">
                  <h4 className="search_term_target">{item.name}</h4>
                </div>
              </div>
            ))
            .slice(0, 5)}
      </div>
    </div>
  );
}

export default SearchBar;


