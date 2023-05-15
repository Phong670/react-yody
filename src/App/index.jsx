import "../App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

import HeaderPage from "../layouts/UserLayout/components/Header";
import HomePage from "../pages/user/Home";
import ProductDetail from "../pages/user/ProductDetail";
import ProductList from "../pages/user/ProductList";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import CartPage from "../pages/user/Cart";
import Orders from "../pages/user/Orders";
import Checkout from "../pages/user/Checkout";

import SearchPage from "../pages/user/Search";

import HomeLayout from "../layouts/UserLayout/HomeLayout";

import DetailProductLayout from "../layouts/UserLayout/DetailProductLayout";
import ProductListLayout from "../layouts/UserLayout/ProductListLayout";
import MainLayout from "..//layouts/UserLayout/MainLayout";
import CheckoutLayout from "..//layouts/UserLayout/CheckoutLayout";

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
        <Route element={<HomeLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductList />} />
          <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.ACCOUNT} element={<Orders />} />
          <Route path={ROUTES.USER.SEARCH} element={<SearchPage />} />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetail />}
          />
        </Route>
        <Route element={<CheckoutLayout />}>
          <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
