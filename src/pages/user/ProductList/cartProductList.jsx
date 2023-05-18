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
  console.log(
    "🚀 ~ file: cartProductList.jsx:17 ~ CartProductList ~ listProduct:",
    listProduct
  );
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
            <S.Info className="flex items-end">
              <S.Title>{item.title}</S.Title>
              <S.Price>{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };

  return (
    <>
      <div className="grid lg:col-span-4 lg:gap-[20px] xxs:gap-[10px] xl:grid-cols-4 lg:grid-cols-4 xxs:col-span-5 sm:grid-cols-3 xxs:grid-cols-2 xxs:mt-[16px] lg:mt-2">
        {renderCartList(listProduct)}
      </div>
      {productList.data.length !== productList.meta.total && (
        <Row
          justify="center"
          style={{ marginTop: 16 }}
          className="col-span-5 h-10"
        >
          <Button onClick={() => handleShowMore()}>Xem thêm</Button>
        </Row>
      )}
    </>
  );
};
export default CartProductList;
