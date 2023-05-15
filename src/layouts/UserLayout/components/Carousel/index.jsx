import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper";
// import { delay } from "@reduxjs/toolkit/dist/utils";
function Carousel() {
  return (
    <div className="max-w-[1200px] w-[100%] lg:mt-[94px] xxs:mt-[54px] ">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide className="carouselItem">
          <img
            className=""
            src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_1.jpg?1679362463677"
            alt="First slide"
          />
        </SwiperSlide>
        <SwiperSlide className="carouselItem">
          <img
            className=""
            src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_2.jpg?1679362463677"
            alt="Second slide"
          />
        </SwiperSlide>
        <SwiperSlide className="carouselItem">
          <img
            className=""
            src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_4.jpg?1679362463677"
            alt="Third slide"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
