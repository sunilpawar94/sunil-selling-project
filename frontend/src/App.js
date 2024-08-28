// importing from library
import { Route, Routes, } from "react-router-dom";
import React, { createContext, useEffect } from "react";
import { message } from "antd";

// importing form styling[sass]  
import "./Asset/Style/Style.scss"

// importing pages 
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";




export const UserContext = createContext(); // TODO: REMOVE AFTER REFACTOR ALL THE CODE.


const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/products" element={<ProductsPage />} />
      <Route exact path="/product/:id" element={<ProductPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route exact path="/logout" element={<LogoutPage />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      

    
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  const user = useSelector(state => state.user.user);
  const userAuthCheck = useSelector(state => state.auth.userAuthCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthCheckAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userAuthCheck) {
      dispatch(userProfileAsync());
    }
  }, [dispatch, userAuthCheck]);

  useEffect(() => {
    if (user && user.role.includes("seller")) {
      dispatch(nurseryProfileAsync());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(cartDataFetchAsync());
    }
  }, [dispatch, user])

  // global configuration antd to alert the message to users
  message.config({
    top: 75,
    maxCount: 3,
    CSSProperties: {
      backgroundColor: "#000",
      color: "#fff"
    }
  });

  return (
    <>
      <Navigation />
      <ScrollToTop />
      <div style={{ marginTop: "70px" }}>
        <Routing />
      </div>
      <Footer />
    </>

  );
}

export default App;
