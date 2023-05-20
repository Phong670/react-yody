import { generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProductListAction } from "../../../redux/actions/";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import * as S from "./styles";
import { useState } from "react";

let hasMoreClone = true;
const RenderSearchList = ({ productList }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(hasMoreClone);
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
  const fetchMoreData = () => {
    console.log(
      "🚀 ~ file: renderSearchList.jsx:34 ~ fetchMoreData ~ productList:",
      productList
    );
    if (productList.data.length >= productList.meta.total) {
      hasMoreClone = false;
      setHasMore(false);
      console.log("het111111111111111111");
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      dispatch(
        getProductListAction({
          page: productList.meta.page + 1,
          limit: PRODUCT_LIMIT,
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
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        className="max-w-full flex-wrap justify-center px-[20px] grid  
    xs:gap-[20px] xxs:gap-[10px] xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2"
      >
        {renderListCart()}
      </InfiniteScroll>
      {productList.data.length > 0 && productList.load ? (
        <Spin indicator={antIcon} className="my-[100px]" />
      ) : (
        <></>
      )}
    </>
  );
};
export default RenderSearchList;
