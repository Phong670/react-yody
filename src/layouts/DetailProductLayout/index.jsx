import { Outlet } from "react-router-dom";

import * as S from "./styles";

function DetailProductLayout() {
  return (
    <div className="wrapper">
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
    </div>
  );
}

export default DetailProductLayout;
