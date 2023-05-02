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
              <h3 className="w-full h-[38px]">{item.title}</h3>
              <span className="">{item.price.toLocaleString()}đ</span>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };

  return (
    <div className="max-w-full flex flex-wrap justify-center px-[8px] -z-0 ">
      {renderListCart()}
    </div>
  );
};
export default RenderSearchList;
