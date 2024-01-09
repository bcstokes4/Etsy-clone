import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { loadCartThunk } from "../../store/cart";
import SearchBar from "./SearchBar";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCartThunk());
  }, [dispatch]);
  return (
    <nav id="navbar">
      <NavLink exact to="/products"
	  id='sporthub-link'
	  >
        SportHub
      </NavLink>
      <div className="search-bar-div">
        <SearchBar/>
      </div>
      {isLoaded && <ProfileButton user={sessionUser} />}
    </nav>
  );
}

export default Navigation;
