import * as S from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination } from "swiper";

function SectionCollection() {
  return (
    <>
      <S.wrapperCollection className="max-w-[1200px] xxs:hidden sm:block sm:px-2 xl:px-0 order-4">
        <S.Title className="mt-6 xxs:text-[16px]">BỘ SƯU TẬP</S.Title>
        <S.ImageContainer className=" sm:flex justify-between items-center sm:flex-row xxs:flex-col gap-4  ">
          <S.Img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_1_image.jpg?1681726130231"
            alt=""
          ></S.Img>
          <S.Img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_2_image.jpg?1681805101830"
            alt=""
          ></S.Img>
          <S.Img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_3_image.jpg?1681805101830"
            alt=""
          ></S.Img>
        </S.ImageContainer>
      </S.wrapperCollection>
      <div className="sm:hidden px-2 order-4">
        <S.Title className="mt-4 xxs:text-[16px]">BỘ SƯU TẬP</S.Title>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          pagination={{
            clickable: true,
            type: "progressbar",
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: " 60%" }}>
            <img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_1_image.jpg?1681726130231" />
          </SwiperSlide>
          <SwiperSlide style={{ width: " 60%" }}>
            <img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_2_image.jpg?1681805101830" />
          </SwiperSlide>
          <SwiperSlide style={{ width: " 60%" }}>
            <img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_3_image.jpg?1683190865643" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default SectionCollection;
