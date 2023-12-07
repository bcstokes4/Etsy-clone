import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CartModal from "../Cart/cart-modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const ulRef = useRef();
  const [uniqueItemsCount, setUniqueItemsCount] = useState(0); 
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    const uniqueItems = Object.keys(cart).length;
    setUniqueItemsCount(uniqueItems);
  }, [cart]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (user) setIsUser(true);
    else setIsUser(false);
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/restaurants");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const userClassName = isUser ? "" : "hidden";

  return (
    <div id="nav-buttons">
      <div className="cart-icon-container">
        <div className="unique-items-count">{uniqueItemsCount}</div>

        <OpenModalButton
          buttonText={<i className="fa-solid fa-cart-shopping"></i>}
          onItemClick={closeMenu}
          modalComponent={<CartModal />}
        />

      </div>
      <div className={userClassName}>
        <button id="hamburger" onClick={openMenu}>
          <i
            className="fas fa-user-circle"
            style={{ fontSize: "30px", color: "black" }}
          />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          <li>
            <Link onClick={closeMenu} to="/current" className='profile-link'>
              My Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} id="loginButton">
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {!user && (
        <>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </>
      )}
    </div>
  );
}

export default ProfileButton;
