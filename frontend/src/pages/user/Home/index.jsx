import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AiOutlineRight } from "react-icons/ai";
import ProductHome from "./productHome";
import * as S from "./styles";

function HomeUser(props) {
  const navigate = useNavigate();
  return (
    <div className="w-full  ">
      <div className="p-2 w-full lg:border-none xxs:border-b-[6px] xxs:border-[#F2F3F7]">
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [5, 1],
                }),
              });
            }}
          >
            ÁO
          </div>
          <div
            className="cursor-pointer flex flex-nowrap justify-center  align-content-center 
            lg:mr-[48px] text-[16px] hover:text-[red]
            
            "
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [5, 1],
                }),
              });
            }}
          >
            Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
          </div>
        </div>
        <div className="w-full lg:hidden xxs:flex mb-2">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_2_image_mobile.jpg?1684998116749"
            alt=""
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [5, 1],
                }),
              });
            }}
          />
        </div>
        <div className=" w-full flex flex-row lg:justify-start xxs:justify-center flex-nowrap ">
          <div className="w-[180px] h-[360px] xxs:hidden lg:block ">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_2_image_desktop.jpg?1684998116749"
              alt=""
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                    subCategoryId: [5, 1],
                  }),
                });
              }}
            />
          </div>
          <div className="flex  lg:w-[calc(100%-260px)] xxs:w-[100%] lg:ml-[50px]">
            <ProductHome subCategoryId={[5, 1]} nameSwiper={"aoSwiper"} />
          </div>
        </div>
      </div>
      <div className="p-2 w-full lg:border-none xxs:border-b-[6px] xxs:border-[#F2F3F7]">
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [6, 2],
                }),
              });
            }}
          >
            Quần
          </div>
          <div
            className="cursor-pointer flex flex-nowrap justify-center  align-content-center 
            lg:mr-[48px] text-[16px] hover:text-[red]
            "
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [6, 2],
                }),
              });
            }}
          >
            Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
          </div>
        </div>
        <div className="w-full lg:hidden xxs:flex mb-2">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_5_image_mobile.jpg?1684217224299"
            alt=""
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [6, 2],
                }),
              });
            }}
          />
        </div>
        <div className=" w-full flex flex-row lg:justify-start xxs:justify-center flex-nowrap ">
          <div className="w-[180px] h-[360px] xxs:hidden lg:block ">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_5_image_desktop.jpg?1684217224299"
              alt=""
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                    subCategoryId: [6, 2],
                  }),
                });
              }}
            />
          </div>
          <div className="flex  lg:w-[calc(100%-260px)] xxs:w-[100%] lg:ml-[50px]">
            <ProductHome subCategoryId={[6, 2]} nameSwiper={"quanSwiper"} />
          </div>
        </div>
      </div>
      <div className="p-2 w-full lg:border-none xxs:border-b-[6px] xxs:border-[#F2F3F7]">
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [7, 3],
                }),
              });
            }}
          >
            Đồ thể thao
          </div>
          <div
            className="cursor-pointer flex flex-nowrap justify-center  align-content-center 
            lg:mr-[48px] text-[16px] hover:text-[red]
            "
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [7, 3],
                }),
              });
            }}
          >
            Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
          </div>
        </div>
        <div className="w-full lg:hidden xxs:flex mb-2">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_4_image_mobile.jpg?1684217224299"
            alt=""
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [7, 3],
                }),
              });
            }}
          />
        </div>
        <div className=" w-full flex flex-row lg:justify-start xxs:justify-center flex-nowrap ">
          <div className="w-[180px] h-[360px] xxs:hidden lg:block ">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_4_image_desktop.jpg?1684217224299"
              alt=""
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                    subCategoryId: [7, 3],
                  }),
                });
              }}
            />
          </div>
          <div className="flex  lg:w-[calc(100%-260px)] xxs:w-[100%] lg:ml-[50px]">
            <ProductHome subCategoryId={[7, 3]} nameSwiper={"theThaoSwiper"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeUser;
