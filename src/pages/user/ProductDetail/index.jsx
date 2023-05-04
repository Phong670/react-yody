import { useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Link,
  useParams,
  generatePath,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Row, Col, Card, Button, Space, notification } from "antd";
import { Rate, Form, Input, Modal } from "antd";
import { ROUTES } from "../../../constants/routes";
import CursorZoom from "react-cursor-zoom";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
  getSizeListAction,
} from "../../../redux/actions";
import AddToCard from "./addToCard";
import ReviewProduct from "./review";
import * as S from "./styles";

function ProductDetail() {
  const [isSizeToCart, setIsSizeToCart] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(
      getProductListAction({
        page: 1,
        limit: 12,
      })
    );
    dispatch(getSizeListAction());
  }, [id]);
  const { TextArea } = Input;
  const renderListCart = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Image src={item.image} alt="" />
            <S.Infor>
              <h3 className="w-full h-[38px]">{item.title}</h3>
              <span className="">{item.price.toLocaleString()}đ</span>
            </S.Infor>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  }, [productList.data]);

  const renderTitle = useMemo(() => {
    return (
      <>
        <p>Trang chủ</p> <span>/</span>
        <p>{productDetail.data.subCategory?.name}</p>
        <span>/</span>
        <p>{productDetail.data.category?.name}</p>
      </>
    );
  }, [productDetail.data]);
  return (
    <div className="flex flex-wrap flex-col justify-between w-[1200px] mt-[95px]">
      <div className="flex gap-2">{renderTitle}</div>
      <div className="flex justify-between">
        <div className="w-[400px]">
          <Spin spinning={productDetail.load}>
            <div>
              <img src={productDetail.data.image} alt="" />
            </div>
          </Spin>
        </div>
        <AddToCard productDetail={productDetail} />
      </div>
      <div className="mt-[20px]">ĐẶC TÍNH NỔI BẬT</div>
      <div className="mb-[200px]">{productDetail.data.description} </div>
      <ReviewProduct idProduct={id} />
      <p className="mt-4">GỢI Ý CHO BẠN</p>
      <Row gutter={[16, 16]} className="w-full">
        {renderListCart}
      </Row>
    </div>
  );
}

export default ProductDetail;
