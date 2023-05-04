import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";

import "swiper/css";
import "swiper/css/navigation";

import "swiper/css";
import "swiper/css/pagination";

import { AiOutlineRight } from "react-icons/ai";
import ProductHome from "./productHome";

function HomeUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2 mt-[95px]">
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, {
              subCategoryId: [5, 1],
            })}
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
        <div className="flex flex-row justify-start  w-[1200px]">
          <div className="w-[180px] h-[360px] xxs:hidden lg:block">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/cvn5270-den-6.jpg?v=1663386076000"
              alt=""
            />
          </div>
          <ProductHome subCategoryId={[5, 1]} className="w-[1020px]" />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, {
              subCategoryId: [5, 1],
            })}
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [6, 2],
                }),
              });
            }}
          >
            QUẦN
          </div>
          <div
            className="cursor-pointer flex flex-nowrap justify-center  align-content-center mr-[48px] text-[16px] hover:text-[red]"
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
        <div className="flex flex-row justify-end  w-[1200px]">
          <div className="w-[180px] h-[360px]">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qam3190-nau-2131231.jpg?v=1678509267000"
              alt=""
            />
          </div>
          <ProductHome subCategoryId={[6, 2]} className="w-[1020px]" />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <div
            className="cursor-pointer text-[#11006F] font-medium  text-[20px] hover:text-[red]"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, {
              subCategoryId: [5, 1],
            })}
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [8, 3],
                }),
              });
            }}
          >
            ĐỒ THỂ THAO
          </div>
          <div
            className="cursor-pointer flex flex-nowrap justify-center  align-content-center mr-[48px] text-[16px] hover:text-[red]"
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                  subCategoryId: [8, 3],
                }),
              });
            }}
          >
            Xem thêm <AiOutlineRight className="mt-[5px] ml-2" />
          </div>
        </div>
        <div className="flex flex-row justify-end  w-[1200px]">
          <div className="w-[180px] h-[360px]">
            <img
              className="w-full, h-full "
              src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/san5034-den-17.jpg?v=1677139461000"
              alt=""
            />
          </div>
          <ProductHome subCategoryId={[8, 3]} className="w-[1020px]" />
        </div>
      </div>
    </>
  );
}
export default HomeUser;
