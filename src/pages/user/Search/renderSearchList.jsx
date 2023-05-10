import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductListSearchAction } from "../../../redux/actions/";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useState } from "react";
import axios from "axios";
import * as S from "./styles";
const RenderSearchList = ({ productSearchList }) => {
  const renderListCart = () => {
    return productSearchList?.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Image src={item.image} alt="" />
            <S.Info>
              <S.Title className="w-full h-[38px]">{item.title}</S.Title>
              <S.Price className="">{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };

  return (
    <div className="max-w-full flex-wrap justify-center px-[8px] -z-0 grid col-span-4 gap-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2">
      {renderListCart()}
    </div>
  );
};
export default RenderSearchList;
