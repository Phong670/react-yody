import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper";
// import { delay } from "@reduxjs/toolkit/dist/utils";
function Carousel() {
  return (
    <div className="xxs:w-full lg:mt-[94px] xxs:mt-[54px] ">
      <>
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
          <SwiperSlide>
            <img
              className=""
              src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_1.jpg?1679362463677"
              alt="First slide"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className=""
              src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_2.jpg?1679362463677"
              alt="Second slide"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className=""
              src="https://bizweb.dktcdn.net/100/438/408/themes/900748/assets/slider_4.jpg?1679362463677"
              alt="Third slide"
            />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}

export default Carousel;
