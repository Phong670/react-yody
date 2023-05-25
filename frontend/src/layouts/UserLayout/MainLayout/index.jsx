import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";

import * as S from "./styles";

function ProductListLayout() {
  return (
    <S.wrapperMain>
      <HeaderPage />
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
      <FooterPage />
    </S.wrapperMain>
  );
}

export default ProductListLayout;
