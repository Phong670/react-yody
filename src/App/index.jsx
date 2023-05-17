import "../App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfoAction } from "../redux/actions";

import jwtDecode from "jwt-decode";

import HomePage from "../pages/user/Home";
import ProductDetail from "../pages/user/ProductDetail";
import ProductList from "../pages/user/ProductList";
import SearchPage from "../pages/user/Search";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

import CartPage from "../pages/user/Cart";
import OrdersPage from "../pages/user/Orders";
import AccountPage from "../pages/user/Account";
import ChangePasswordPage from "../pages/user/ChangePassword";
import CheckoutPage from "../pages/user/Checkout";
import ThankyouOrderedPage from "../pages/user/ThankyouOrdered";
import OrderedDetailPage from "../pages/user/OrderedDetail";

import HomeLayout from "../layouts/UserLayout/HomeLayout";
import MainLayout from "..//layouts/UserLayout/MainLayout";
import CheckoutLayout from "..//layouts/UserLayout/CheckoutLayout";

import { ROUTES } from "../constants/routes";
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
          <Route path={ROUTES.USER.SEARCH} element={<SearchPage />} />

          <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />

          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.ACCOUNT} element={<AccountPage />} />
          <Route path={ROUTES.USER.ORDERS} element={<OrdersPage />} />
          <Route
            path={ROUTES.USER.ORDERED_DETAIL}
            element={<OrderedDetailPage />}
          />

          <Route
            path={ROUTES.USER.CHANGE_PASSWORD}
            element={<ChangePasswordPage />}
          />

          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetail />}
          />
        </Route>
        <Route element={<CheckoutLayout />}>
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route
            path={ROUTES.USER.THANKYOU}
            element={<ThankyouOrderedPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
