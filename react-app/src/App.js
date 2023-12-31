import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer/footer";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage/Splash-Page";
import AllProducts from './components/Products'
import ProductDetails from "./components/Products/product-details";
import ProfilePage from "./components/ProfilePage/profile-page";
import CheckoutProduct from "./components/Checkout/Checkout";
import OtherUserPage from "./components/OtherUserPage/other-user-page";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      {location.pathname !== '/' && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
        <Route exact path="/">
          <SplashPage isLoaded={isLoaded}/>
        </Route>
        <Route exact path='/products'>
          <AllProducts />
        </Route>
        <Route exact path="/checkout">
          <CheckoutProduct />
        </Route>
        <Route path='/current'>
          <ProfilePage />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
        <Route path='/users/:userId'>
          <OtherUserPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
      )}
      {location.pathname !== '/' && <Footer />}
    </div>
  );
}

export default App;

