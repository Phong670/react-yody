import * as S from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
function CarouselMenuSection() {
  const MenuList = [
    {
      id: 1,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 2,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 3,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 4,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 5,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 6,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 7,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
    {
      id: 8,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830",
      title: "ao nu",
    },
  ];
  // const [twoSlide, settwoSlide] = useState(false);

  if (MenuList.length > 6) {
    // settwoSlide(true);

    var MenuListChildOne = MenuList.slice(0, 6);
    var MenuListChildTwo = MenuList.slice(6);
  }

  const renderMenuList = (array) => {
    return array.map((item, index) => {
      return (
        <S.ItemPromotion
          key={index}
          className="flex flex-col justify-center align-items-center "
        >
          <S.Img src={item.img}></S.Img>
          <S.Content className="flex justify-center align-items-center">
            {item.id}
          </S.Content>
        </S.ItemPromotion>
      );
    });
  };
  return (
    <S.SideBarMenu className="">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {MenuList.length > 6 ? (
          <>
            <SwiperSlide>
              <S.MenuListContainer className="flex  justify-start align-items-center ">
                {renderMenuList(MenuListChildOne)}
              </S.MenuListContainer>
            </SwiperSlide>
            <SwiperSlide>
              <S.MenuListContainer className="flex  justify-start align-items-center ">
                {renderMenuList(MenuListChildTwo)}
              </S.MenuListContainer>
            </SwiperSlide>
          </>
        ) : (
          <SwiperSlide>
            <S.MenuListContainer className="flex  justify-start align-items-center ">
              {renderMenuList(MenuList)}
            </S.MenuListContainer>
          </SwiperSlide>
        )}
      </Swiper>
    </S.SideBarMenu>
  );
}

export default CarouselMenuSection;
