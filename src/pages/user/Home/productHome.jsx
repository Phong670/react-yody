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
          <div>
            <img src={item.image} alt="" />
          </div>
          <div>{item.title}</div>
          <div>{item.price}</div>
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        allowSlidePrev={false}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="px-[200px]"
        breakpoints={{
          300: {
            slidesPerView: 4,
            spaceBetween: 20,
            navigation: {
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              navigationDisabledClass: "swiper-navigation-disabled",
            },
          },
        }}
      >
        {renderListCart(productData)}
      </Swiper>
    </>
  );
}

export default ProductHome;
