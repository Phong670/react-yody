import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductListAction } from "../../../redux/actions/";
import { useDispatch } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import * as S from "./styles";
import { useEffect, useState } from "react";

let hasMoreClone = true;
const RenderSearchList = ({ productList }) => {
  useEffect(() => {
    console.log("dismount");
    hasMoreClone = true;
  }, []);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#ffc107" }} spin />
  );
  const dispatch = useDispatch();
  const renderListCart = () => {
    return productList.data?.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.WrapImg className="overflow-hidden">
              <S.Image src={item.image} alt="" />
            </S.WrapImg>
            <S.Info>
              <S.Title className="w-full">{item.title}</S.Title>
              <S.Price className="">{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };
  console.log(hasMoreClone);

  const fetchMoreData = () => {
    console.log(hasMoreClone);
    if (productList.data.length >= productList.meta.total) {
      // hasMoreClone = false;

      return;
    }
    // setNextPage(true);
    // a fake async api call like which sends
    // 20 more records in .5 secs
    else
      setTimeout(() => {
        dispatch(
          getProductListAction({
            page: productList.meta.page + 1,
            limit: 15,
            more: true,
            searchKey: productList.meta.searchKey,
          })
        );
      }, 0);
  };
  return (
    <>
      <InfiniteScroll
        dataLength={productList.data.length}
        next={fetchMoreData}
        hasMore={hasMoreClone}
        loader={""}
        className="max-w-full flex-wrap justify-center px-[20px] grid  
    xs:gap-[20px] xxs:gap-[10px] xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2"
      >
        {renderListCart()}
      </InfiniteScroll>
      {productList.data.length > 0 && productList.load ? (
        <Spin indicator={antIcon} className="my-[100px]" />
      ) : productList.data.length >= productList.meta.total ? (
        <div className="my-2">Bạn đã xem hết kết quả tìm kiếm</div>
      ) : (
        <></>
      )}
    </>
  );
};
export default RenderSearchList;
