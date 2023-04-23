import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

function HomeUser(props) {
  const [DataList, setDataList] = useState([]);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    searchKey: "",
  });

  const renderProduct = (keyWord) => {
    const result = productList.data.filter(
      (item) => item.categoryId === keyWord
    );

    return result.map((item, index) => {
      return (
        <S.ItemList key={index}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Img src={item.image} alt="" />
            <S.Infor>
              <span style={{ fontSize: "20px" }}>
                {item.title.slice(0, 10)}
              </span>
              <span style={{ fontSize: "25px", color: "#e91f29" }}>
                {item.price}$
              </span>
            </S.Infor>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  };
  const handleFilterCategory = (values) => {
    setFilterParams({
      ...filterParams,
      categoryId: values,
    });
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
        categoryId: values,
      })
    );
  };
  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListAction());
    handleFilterCategory(1);
  }, []);
  return (
    <>
      <S.MainCover>
        <S.Title>HÀNG MỚI VỀ</S.Title>
        <S.ChildMain>
          <S.SideBar>
            <S.ImgSideBar
              src="https://bizweb.dktcdn.net/100/438/408/themes/899432/assets/home_preivew_sanpham_7_image_desktop.jpg?1678786925300"
              alt=""
            />
          </S.SideBar>
          <S.MainContainer>{renderProduct(5)}</S.MainContainer>
        </S.ChildMain>
      </S.MainCover>

      <S.MainCover>
        <S.Title>ĐỒ CÔNG SỞ</S.Title>
        <S.ChildMain>
          <S.SideBar>
            <S.ImgSideBar
              src="https://bizweb.dktcdn.net/100/438/408/themes/899432/assets/home_preivew_sanpham_6_image_desktop.jpg?1678786925300"
              alt=""
            />
          </S.SideBar>
          <S.MainContainer>{renderProduct(1)}</S.MainContainer>
        </S.ChildMain>
      </S.MainCover>
    </>
  );
}
export default HomeUser;
