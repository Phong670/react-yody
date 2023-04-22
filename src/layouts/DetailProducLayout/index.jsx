import { Outlet } from "react-router-dom";

import * as S from "./styles";

function DetailProducLayout() {
  return (
    <div className="wrapper">
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
    </div>
  );
}

export default DetailProducLayout;
