import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { AiOutlineRight } from "react-icons/ai";
import ProductHome from "./productHome";
import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

function HomeUser(props) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between mb-4">
        <Link
          className="text-[#11006F] font-medium  text-[20px] hover:text-[red]"
          to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: [5, 1] })}
        >
          CHÂN VÁY
        </Link>
        <Link className="flex flex-nowrap justify-center  align-content-center mr-[48px] text-[16px] hover:text-[red]">
          Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
        </Link>
      </div>
      <div className="flex flex-row justify-end  w-[1200px]">
        <div className="w-[180px] h-[360px]">
          <img
            className="w-full, h-full "
            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/cvn5270-den-6.jpg?v=1663386076000"
            alt=""
          />
        </div>
        <ProductHome className="w-[1020px]" />
      </div>
      <div className="flex justify-between mb-4">
        <Link className="text-[#11006F] font-medium  text-[20px] hover:text-[red]">
          Áo
        </Link>
        <Link className="flex flex-nowrap justify-center  align-content-center mr-[48px] text-[16px] hover:text-[red]">
          Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
        </Link>
      </div>
      <div className="flex flex-row justify-end  w-[1200px]">
        <div className="w-[200px] h-[360px]">
          <img
            className="w-full, h-full "
            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/cvn5270-den-6.jpg?v=1663386076000"
            alt=""
          />
        </div>
        <ProductHome className="w-[1000px]" />
      </div>
    </>
  );
}
export default HomeUser;
