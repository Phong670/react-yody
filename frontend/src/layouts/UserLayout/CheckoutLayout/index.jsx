import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";

import * as S from "./styles";

function CheckoutLayout() {
  return (
    <S.wrapperMain>
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
    </S.wrapperMain>
  );
}

export default CheckoutLayout;
