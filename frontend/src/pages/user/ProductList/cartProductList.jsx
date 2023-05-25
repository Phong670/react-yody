import { Row, Button } from "antd";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getProductListAction } from "../../../redux/actions";
import * as S from "./styles";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartProductList = ({ listProduct, filterParams }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#ffc107" }} spin />
  );
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
            <S.WrapImg className="overflow-hidden">
              <S.Image src={item.image} alt="" />
            </S.WrapImg>
            <S.Info className="flex items-end">
              <S.Title>{item.title}</S.Title>
              <S.Price>{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };
  const arrayLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const renderCartListLoading = (array) => {
    return array?.map((item) => {
      return (
        <S.ItemList key={item}>
          <S.CustomLink>
            <Skeleton height={280} width={214} />
            <S.Info className="flex items-end">
              <Skeleton height={35} width={214} />
              <Skeleton height={20} width={70} />
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };
  return (
    <>
      <div className="grid lg:col-span-4 md:gap-[20px] xxs:gap-[10px] xl:grid-cols-4 lg:grid-cols-4 xxs:col-span-5 sm:grid-cols-3 xxs:grid-cols-2 xxs:mt-[16px] lg:mt-2">
        {productList.load && productList.data.length === 0
          ? renderCartListLoading(arrayLoading)
          : renderCartList(listProduct)}
      </div>
      {productList.load && productList.data.length > 0 && (
        <Spin indicator={antIcon} className="col-span-5 w-full my-4" />
      )}
      {productList.data.length !== productList.meta.total && (
        <Row
          justify="center"
          style={{ marginTop: 16 }}
          className="col-span-5 h-10"
        >
          <Button
            className="hover:!border-[orange] hover:!text-[orange]"
            onClick={() => handleShowMore()}
          >
            Xem thêm
          </Button>
        </Row>
      )}
    </>
  );
};
export default CartProductList;
