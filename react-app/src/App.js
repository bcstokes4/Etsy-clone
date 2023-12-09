import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllProducts from './components/Products'
import ProductDetails from "./components/Products/product-details";
import ProfilePage from "./components/ProfilePage/profile-page";
import CheckoutProduct from "./components/Checkout/Checkout";
import OtherUserPage from "./components/OtherUserPage/other-user-page";
import SplashPage from "./components/SplashPage/Splash-Page";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/products">
            <AllProducts/>
          </Route>
          <Route exact path="/checkout">
            <CheckoutProduct/>
          </Route>
          <Route path='/current'>
            <ProfilePage/>
          </Route>
          <Route path="/products/:productId">
            <ProductDetails/>
          </Route>
          <Route path='/users/:userId'>
            <OtherUserPage/>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
