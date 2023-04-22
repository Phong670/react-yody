import { useState } from "react";
import * as S from "./styles";
function Main() {
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
          <S.MainContainer>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/ao-polo-nuao-polo-nuao-polo-nuapn3724-cba-qjn4016-den-1-yody-vn-yody-vn-yody-vn.jpg?v=1677750989303"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/san5028-den-4-jpeg.jpg?v=1675313300173"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/scn3000-xnh-4.jpg?v=1665192090807"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/scn3000-xnh-4.jpg?v=1665192090807"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
          </S.MainContainer>
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
          <S.MainContainer>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/ao-polo-nuao-polo-nuao-polo-nuapn3724-cba-qjn4016-den-1-yody-vn-yody-vn-yody-vn.jpg?v=1677750989303"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/san5028-den-4-jpeg.jpg?v=1675313300173"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/scn3000-xnh-4.jpg?v=1665192090807"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
            <S.ItemList>
              <S.Img
                src="https://bizweb.dktcdn.net/100/438/408/products/smn4274-hog-qsn4222-tra-4.jpg?v=1676691142373"
                alt=""
              />
              <S.Infor>
                <span style={{ fontSize: "20px" }}>Áo Polo</span>
                <span style={{ fontSize: "25px", color: "#e91f29" }}>
                  200.000 đ
                </span>
              </S.Infor>
            </S.ItemList>
          </S.MainContainer>
        </S.ChildMain>
      </S.MainCover>
    </>
  );
}
export default Main;
