import "../App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

import HeaderPage from "../../src/layouts/UserLayout/Header";
import HomePage from "../pages/user/Home";
import ProductDetail from "../pages/user/ProductDetail";
import ProductList from "../pages/user/ProductList";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import CartPage from "../pages/user/Cart";
import Orders from "../pages/user/Orders";
import Checkout from "../pages/user/Checkout";

import SearchPage from "../pages/user/Search";

import FooterPage from "../../src/layouts/UserLayout/Footer";
import UserLayout from "../layouts/UserLayout/";
import DetailProductLayout from "../layouts/UserLayout/DetailProductLayout/";
import ProductListLayout from "../layouts/UserLayout/ProductListLayout/";

import { ROUTES } from "../constants/routes";

import { getUserInfoAction } from "../redux/actions";
import { History } from "history";
function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.ACCOUNT} element={<Orders />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.USER.SEARCH} element={<SearchPage />} />
        </Route>
        <Route element={<DetailProductLayout />}>
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetail />}
          />
        </Route>
        <Route element={<ProductListLayout />}>
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
