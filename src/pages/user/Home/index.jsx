import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";

import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
function HomeUser(props) {
  const [DataList, setDataList] = useState([]);

  useEffect(() => {
    // API_ENDPOINT là bất kỳ đường dẫn API nào trả về dạng JSON
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        // Kiểm tra trạng thái phản hồi
        if (!response.ok) {
          throw new Error(response);
        }

        // Phản hồi không lỗi, trả về JSON cho then tiếp theo lấy dữ liệu
        return response.json();
      })
      .then((data) => {
        // Lấy dữ liệu và setState cho data
        setDataList(data);
      })
      .catch((err) => alert("Có lỗi"))
      .finally(() => {
        console.log("End");
      });
  }, []);

  const renderProduct = (keyWord) => {
    const result = DataList.filter((e) => e.category === keyWord);

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
          <S.MainContainer>{renderProduct("electronics")}</S.MainContainer>
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
          <S.MainContainer>{renderProduct("men's clothing")}</S.MainContainer>
        </S.ChildMain>
      </S.MainCover>
    </>
  );
}
export default HomeUser;
