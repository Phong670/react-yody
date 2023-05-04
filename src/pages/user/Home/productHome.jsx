import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

function ProductHome({ subCategoryId }) {
  const [productData, setProductDress] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/products/?_page=1&_limit=8", {
        params: { subCategoryId: subCategoryId },
      })
      .then((res) => {
        setProductDress(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, []);
  let productChildOne = productData.slice(0, 4);
  let productChildTwo = productData.slice(4);

  const renderListCart = (productChild) => {
    return productChild.map((item, index) => {
      return (
        <SwiperSlide>
          <S.ItemList key={item.id}>
            <S.CustomLink
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              <S.Image src={item.image} alt="" />
              <S.Info>
                <h3 className="w-full h-[38px]">{item.title}</h3>
                <span className="">{item.price.toLocaleString()}đ</span>
              </S.Info>
            </S.CustomLink>
          </S.ItemList>
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <S.MainCover className=" xxs: w-[100vw] lg:w-[1020px]">
        <S.ChildMain className="w-full">
          <S.SideBarMenu className="w-full">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              speed={1500}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  width: 640,
                  slidesPerView: 4,
                  spaceBetween: 1,
                  navigation: false,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
              }}
            >
              {renderListCart(productData)}

              {/* <SwiperSlide>
                <S.MenuListContainer className="flex  justify-start align-items-center ">
                  {renderListCart(productChildTwo)}
                </S.MenuListContainer>
              </SwiperSlide> */}
            </Swiper>
          </S.SideBarMenu>
        </S.ChildMain>
      </S.MainCover>
    </>
  );
}
export default ProductHome;
