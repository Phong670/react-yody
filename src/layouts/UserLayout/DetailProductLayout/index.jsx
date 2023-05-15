import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";

import * as S from "./styles";

function DetailProductLayout() {
  return (
    <div>
      <S.wrapperMain>
        <HeaderPage />
        <S.MainWrapper>
          <Outlet />
        </S.MainWrapper>
        <FooterPage />
      </S.wrapperMain>
    </div>
  );
}

export default DetailProductLayout;
