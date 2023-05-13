import { Outlet } from "react-router-dom";
import Carousel from "../Carousel/index";
import Collection from "../SectionCollection";
import Promotion from "./SectionPromotion";
import SectionMenu from "../SectionMenu";

import * as S from "./styles";

function UserLayout() {
  return (
    <S.wrapperMain>
      <Carousel />
      <Collection />
      <Promotion />
      <SectionMenu />
      <S.UserLayoutWrapper>
        <Outlet />
      </S.UserLayoutWrapper>
    </S.wrapperMain>
  );
}

export default UserLayout;
