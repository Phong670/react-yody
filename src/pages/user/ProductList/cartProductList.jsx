import { Checkbox, Select, Col, Row, Button, Slider, Form } from "antd";
import {
  Link,
  useParams,
  generatePath,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getProductListAction } from "../../../redux/actions";
import * as S from "./styles";

const CartProductList = ({ listProduct, filterParams }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };
  const renderCartList = (array) => {
    return array?.map((item) => {
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
    <div className=" grid col-span-4 gap-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 ">
      {renderCartList(listProduct)}
      {productList.data.length !== productList.meta.total && (
        <Row justify="center" style={{ marginTop: 16 }}>
          <Button onClick={() => handleShowMore()}>Show more</Button>
        </Row>
      )}
    </div>
  );
};
export default CartProductList;
