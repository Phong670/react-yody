import "../App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

import HeaderPage from "../layouts/Header";
import HomePage from "../pages/user/Home";
import ProducDetail from "../pages/user/ProductDetail";
import ProductList from "../pages/user/ProductList";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import CartPage from "../pages/user/Cart";
import SearchPage from "../pages/user/Search";

import FooterPage from "../layouts/Footer";
import UserLayout from "../layouts/UserLayout/";
import DetailProductLayout from "../layouts/DetailProductLayout/";
import ProductListLayout from "../layouts/ProductListLayout/";

import { ROUTES } from "../constants/routes";

import { getUserInfoAction } from "../redux/actions";
import { History } from "history";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);
  return (
    <>
      <HeaderPage />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        </Route>
        <Route element={<DetailProductLayout />}>
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProducDetail />} />
        </Route>
        <Route element={<ProductListLayout />}>
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductList />} />
        </Route>
        <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.USER.CART} element={<CartPage />} />
        <Route path={ROUTES.USER.SEARCH} element={<SearchPage />} />
      </Routes>

      <FooterPage />
    </>
  );
}

export default App;
