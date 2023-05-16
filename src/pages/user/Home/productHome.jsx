import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ROUTES } from "../../../constants/routes";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import * as S from "./styles";

function ProductHome({ subCategoryId, nameSwiper }) {
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
        <SwiperSlide className="productSwiperSlide">
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Image src={item.image} alt="" />
            <S.Info>
              <S.Title className="w-full h-[38px]">{item.title}</S.Title>
              <S.Price className="">{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="flex  w-full  relative ">
      <Swiper
        className={nameSwiper}
        slidesPerView={4}
        centeredSlides={false}
        // slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
            navigation: {
              nextEl: `.swiper-button-next-unique-${nameSwiper}`,
              prevEl: `.swiper-button-prev-unique-${nameSwiper}`,
            },
          },
          900: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 25,
            navigation: false,
            height: "auto",
          },
          300: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 14,
            navigation: false,
            height: "auto",
          },
          0: {
            spaceBetween: 25,
            navigation: false,
          },
        }}
        // scrollbar={true}

        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Navigation, Pagination]}
      >
        {renderListCart(productData)}
      </Swiper>
      <div
        className={`swiper-button-prev-unique-${nameSwiper} xxs:hidden lg:block absolute left-[-30px] top-[50%]`}
      >
        <img
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-prev-danhmuc.svg"
          alt=""
        />
      </div>
      <div
        className={`swiper-button-next-unique-${nameSwiper} xxs:hidden lg:block absolute right-[-30px] top-[50%]`}
      >
        <img
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-next-danhmuc.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default ProductHome;
