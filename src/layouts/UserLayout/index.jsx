import { Outlet } from "react-router-dom";
import Carousel from "./Carousel";
import Collection from "./SectionCollection";
import Promotion from "./SectionPromotion";
import SectionMenu from "./SectionMenu";
import HeaderPage from "../UserLayout/Header";
import FooterPage from "../UserLayout/Footer";

import * as S from "./styles";

function UserLayout() {
  return (
    <div>
      <S.wrapperMain>
        <HeaderPage />
        <Carousel />
        <Collection />
        <Promotion />
        <SectionMenu />
        <S.UserLayoutWrapper>
          <Outlet />
        </S.UserLayoutWrapper>
        <FooterPage />
      </S.wrapperMain>
    </div>
  );
}

export default UserLayout;
