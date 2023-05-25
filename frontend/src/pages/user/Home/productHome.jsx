import { useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ROUTES } from "../../../constants/routes";
import { Navigation, Pagination, Keyboard } from "swiper";
import * as S from "./styles";
import { LoadingOutlined } from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductHome({ subCategoryId, nameSwiper }) {
  const [productData, setProductDress] = useState([]);
  // const [loading, setLoading] = useState(false);

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

  const renderListCart = (productChild) => {
    return productChild.map((item, index) => {
      return (
        <SwiperSlide key={index} className="productSwiperSlide">
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.WrapImg className="overflow-hidden">
              <S.Image src={item.image} alt="" />
            </S.WrapImg>
            <S.Info>
              <S.Title className="w-full h-[38px]">{item.title}</S.Title>
              <S.Price className="">{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </SwiperSlide>
      );
    });
  };
  const arrayLoading = [1, 2, 3, 4, 5, 6, 7, 8];
  const renderCartListLoading = (array) => {
    return array?.map((item) => {
      return (
        <SwiperSlide key={item} className="productSwiperSlide">
          <S.CustomLink>
            <Skeleton height={280} width={214} />
            <S.Info className="flex items-end">
              <Skeleton height={40} width={214} />
              <Skeleton height={20} width={70} />
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
        {productData.length === 0
          ? renderCartListLoading(arrayLoading)
          : renderListCart(productData)}
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
