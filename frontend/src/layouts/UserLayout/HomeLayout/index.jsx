import { Outlet } from "react-router-dom";
import Carousel from "../components/Carousel";
import Collection from "../components/SectionCollection";
import Promotion from "../components/SectionPromotion";
import SectionMenu from "../components/SectionMenu";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";

import * as S from "./styles";

function UserLayout() {
  return (
    <div className="w-full flex justify-center flex-wrap ">
      <HeaderPage />
      <S.wrapperMain>
        <Carousel />
        <Collection />
        <Promotion />
        <SectionMenu />
        <S.UserLayoutWrapper>
          <Outlet />
        </S.UserLayoutWrapper>
      </S.wrapperMain>
      <FooterPage />
    </div>
  );
}

export default UserLayout;
