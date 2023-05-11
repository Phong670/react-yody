import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductListAction } from "../../../redux/actions/";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";
import * as S from "./styles";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import RenderSearchList from "./renderSearchList";

function Search() {
  const navigate = useNavigate();
  const params = useParams();
  const { searchKey } = useParams();
  const dispatch = useDispatch();
  console.log(
    "🚀 ~ file: renderSearchList.jsx:5 ~ RenderSearchList ~ searchKey:",
    searchKey
  );
  // const { productList } = useSelector((state) => state.productSearch);

  const { productList } = useSelector((state) => state.product);
  console.log("🚀 ~ file: index.jsx:27 ~ Search ~ productList:", productList);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const getResultSearch = (value) => {};
  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: 5,
        searchKey: searchKey,
      })
    );
  }, [searchKey]);
  return (
    <div className="lg:min-h-[400px] flex justify-start items-center flex-wrap flex-col lg:mt-[125px] xxs:mt-[80px]">
      <div className="flex gap-2">
        <p
          className="cursor-pointer hover:text-[orange]"
          onClick={() => {
            navigate({
              pathname: generatePath(ROUTES.USER.HOME),
            });
          }}
        >
          Trang chủ
        </p>
        / Tìm kiếm
      </div>
      <div className="text-[orange]">KẾT QUẢ TÌM KIỂM SẢN PHẨM</div>
      <div>"{searchKey}"</div>
      {productList.load ? (
        <Spin indicator={antIcon} className="my-[100px]" />
      ) : (
        <>
          {productList.data.length > 0 ? (
            <RenderSearchList productList={productList.data} />
          ) : (
            <div className="max-w-[400px] m-auto my-4 px-4">
              <div className="flex justify-center mb-2">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/search-page.svg?1683190865643"
                  alt=""
                />
              </div>
              <div className="block gap-2">
                Tìm kiếm <b className="text-[orange]">{searchKey}</b> của bạn
                không có sản phẩm phù hợp
              </div>
              <div className="">HÃY THỬ LẠI CÁCH KHÁC NHƯ</div>
              <div className="flex items-center">
                <TbPointFilled />
                Sử dụng thuật ngữ chung nhiều hơn
              </div>
              <div className="flex items-center">
                <TbPointFilled />
                Kiểm tra chính tả của bạn
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Search;
