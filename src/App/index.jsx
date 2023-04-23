import "../App.css";
import HeaderPage from "../layouts/Header";
import CarouselPage from "../layouts/Carousel";
import HomePage from "../pages/user/Home";
import ProducDetail from "../pages/user/ProductDetail";
import ProductList from "../pages/user/ProductList";

import FooterPage from "../layouts/Footer";
import UserLayout from "../layouts/UserLayout/";
import DetailProducLayout from "../layouts/DetailProducLayout/";
import ProductListLayout from "../layouts/ProductListLayout/";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ROUTES } from "../constants/routes";

function App() {
  return (
    <>
      <HeaderPage />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        </Route>
        <Route element={<DetailProducLayout />}>
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProducDetail />} />
        </Route>
        <Route element={<ProductListLayout />}>
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductList />} />
        </Route>
      </Routes>

      <FooterPage />
    </>
  );
}

export default App;
