import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductListSearchAction } from "../../../redux/actions/";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import axios from "axios";
import * as S from "./styles";

import RenderSearchList from "./renderSearchList";
function Search() {
  const navigate = useNavigate();
  const params = useParams();
  const { searchKey } = useParams();
  console.log(
    "🚀 ~ file: renderSearchList.jsx:5 ~ RenderSearchList ~ searchKey:",
    searchKey
  );
  // const { productSearchList } = useSelector((state) => state.productSearch);
  const [productSearchList, setProductSearchList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products?q=${searchKey}`)
      .then((res) => {
        setProductSearchList(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, [searchKey]);
  console.log(
    "🚀 ~ file: renderSearchList.jsx:20 ~ RenderSearchList ~ productSearchList:",
    productSearchList
  );
  return (
    <div className="xl:w-[1200px] lg:w-[990px] md:w-[740px] sm:w-[500px] xs:w-[240px]  flex justify-center items-center flex-wrap flex-col">
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

      <RenderSearchList productSearchList={productSearchList} />
    </div>
  );
}
export default Search;
