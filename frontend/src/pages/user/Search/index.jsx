import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProductListAction } from "../../../redux/actions/";

import { ROUTES } from "constants/routes";
import RenderSearchList from "./renderSearchList";

import { TbPointFilled } from "react-icons/tb";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { PRODUCT_LIMIT } from "../../../constants/paging";

function Search() {
  const { searchKey } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [nextPage, setNextPage] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#ffc107" }} spin />
  );

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: 15,
        searchKey: searchKey,
        more: false,
      })
    );
  }, [searchKey]);
  return (
    <div className="max-w-[1200px] lg:min-h-[400px] flex justify-start items-center flex-wrap flex-col lg:mt-[55px] xxs:mt-[30px]">
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
      <div className="mb-4">"{searchKey}"</div>
      {productList.data.length === 0 && productList.load ? (
        <Spin indicator={antIcon} className="my-[100px]" />
      ) : (
        <>
          {productList.data.length > 0 ? (
            <RenderSearchList productList={productList} />
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
