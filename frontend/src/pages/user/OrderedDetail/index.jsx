import { useEffect, useState } from "react";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { logoutAction } from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";
import { AiOutlineArrowLeft } from "react-icons/ai";

function OrderedDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const renderListProductCartLaptop = () => {
    return state.data.orderDetails?.map((item, index) => {
      return (
        <div
          key={index}
          className="desktop w-full grid grid-cols-6 gap-4 mb-4 text-[14px] border-y-[1px] border-[#e0e0e0] py-2"
        >
          <img className="w-[80px] rounded-[4px]" src={item.image} alt="anh " />
          <div className="col-span-2 flex flex-wrap col justify-start align-content-md-start xl:ml-[-35px] lg:ml-[-45px] sm:ml-[-18px]">
            <Link
              className="hover:text-[orange] w-full text-[16px]"
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: item.productId,
              })}
            >
              {item.name}
            </Link>
            <div>Size: {item.size}</div>
          </div>
          <div className="flex justify-center text-[16px]">{item.price}</div>
          <div className="flex ">
            <div className="flex w-full h-[38px] justify-center text-[16px]">
              {item.quantity}
            </div>
          </div>
          <div className="flex flex-wrap col justify-center ">
            <div className="w-full  flex justify-center text-[16px] text-[orange]">
              {(item.price * item.quantity).toLocaleString()}đ
            </div>
          </div>
        </div>
      );
    });
  };
  const renderListProductCartMobile = () => {
    return state.data.orderDetails?.map((item, index) => {
      return (
        <div
          key={index}
          className="mobile w-full flex  gap-2 mb-4 text-[14px] border-y-[1px] border-[#e0e0e0] py-2"
        >
          <img className="w-[80px] rounded-[4px]" src={item.image} alt="anh " />
          <div className="col-span-2 flex flex-wrap col justify-start align-content-md-start xl:ml-[-35px] lg:ml-[-45px] ">
            <Link
              className="hover:text-[orange] w-full text-[16px]"
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: item.productId,
              })}
            >
              {item.name}
            </Link>
            <div className="w-full">Size: {item.size}</div>
            <div className="w-full flex justify-between text-[16px]">
              <p className="text-[16px]">X {item.quantity}</p>
              <p>{(item.price * item.quantity).toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full bg-[#f8f8f8] flex justify-center lpb-4 lg:mt-4 xxs:mt-2 text-[14px]">
      <div className="w-[1200px]">
        <div className="desktop lg:flex  xxs:hidden justify-be items-center flex-wrap flex-col mb-4 lg:mt-[45px] ">
          <div className="flex gap-2">
            <p
              className="cursor-pointer hover:text-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.HOME),
                });
              }}
            >
              Trang chủ
            </p>
            <p>/</p>
            <p
              className="cursor-pointer hover:text-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.ACCOUNT),
                });
              }}
            >
              Tài khoản
            </p>
          </div>
          <div className="text-[orange] text-[20px]">ĐƠN HÀNG CỦA TÔI</div>
        </div>
        <div className="w-full grid lg:grid-cols-4 gap-4">
          <div className="detailMobile lg:col-span-3 xxs:flex lg:hidden flex-wrap w-full bg-[white] justify-start items-start">
            <div className="w-full lg:h-[60px] xxs:h-auto xxs:py-2 lg:py-4 lg:px-[32px] xxs:px-[24px] flex xxs:flex-wrap justify-between border-b-[1px]  border-[#e0e0e0]">
              <div
                className="flex items-center h-[30px]  mb-2 "
                onClick={() => {
                  navigate(ROUTES.USER.ORDERS);
                }}
              >
                <AiOutlineArrowLeft className="text-[24px] text-[#7A7A9D]" />
                <p className="text-[20px] text-[orange] ml-2">
                  Chi tiết đơn hàng {state?.data?.idOrder}
                </p>
              </div>
              <p className="text-[14px] flex">
                Ngày tạo:
                <p className="ml-2">
                  {moment(state?.data?.createdAt).format("DD/MM/YYYY HH:mm")}
                </p>
              </p>
            </div>
            <div className=" w-full mt-3 lg: px-[32px] xxs:px-[24px]">
              <div className="w-full flex">
                Trạng thái đơn hàng:
                <p className="text-[orange] ml-2">{state?.data?.status}</p>
              </div>
              <div className="w-full mb-2 mt-3">Thông tin giao hàng</div>
              <div className=" p-3 border-[1px]  border-[#e0e0e0]">
                <h4 className="flex items-center">
                  Tên:
                  <p className="text-[18px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.name}
                  </p>
                </h4>
                <p className="flex items-center font-[500] my-1">
                  SĐT:
                  <p className="text-[14px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.numberPhone}
                  </p>
                </p>
                <p className="flex items-center">
                  Địa chỉ:
                  <p className="text-[14px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.addressShow}
                  </p>
                </p>
              </div>

              <div>
                <div className="xl:col-span-2 bg-[white] my-3">
                  <div className="w-full  lg:mb-4 xxs:mb-2 text-[16px] flex flex-nowrap gap-2">
                    Giỏ hàng
                    <p className="ml-3 text-[#7A7A9D] ">
                      ({state.data.orderDetails.length}) sản phẩm
                    </p>
                  </div>
                  <div
                    className="w-full  grid-cols-6 gap-4 mb-2 xxs:hidden lg:grid bg-[#F8F8F8] border-y-[1px] 
                   border-[#e0e0e0] py-2"
                  >
                    <div className="col-span-3 flex justify-center">
                      Sản phẩm
                    </div>
                    <div className="flex justify-center">Đơn giá</div>
                    <div className="flex justify-center">Số lượng</div>
                    <div className="flex justify-center">Tổng tiền</div>
                  </div>
                  <div className="w-full">
                    {screenSize.width > 990
                      ? renderListProductCartLaptop()
                      : renderListProductCartMobile()}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end flex-nowrap my-3">
                <div className="w-full flex justify-end flex-nowrap">
                  Phí vận chuyển:
                  <p className="ml-2 w-[100px] flex justify-end ">
                    {state.data.costShip.toLocaleString()}đ
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end flex-nowrap mb-3">
                <div className="w-full flex justify-end flex-nowrap text-[20px]">
                  Tổng tiền:
                  <p className="text-[orange] text-[20px] ml-2 w-[100px] flex justify-end">
                    {(
                      state.data.costShip + state.data.totalPrice
                    ).toLocaleString()}
                    đ
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="slider lg:col-span-1 w-full bg-[white] ">
            <div className="w-full p-4 h-auto  flex justify-center">
              <div className="flex justify-center items-center flex-wrap flex-col">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1683881952485"
                  alt=""
                />
                <p>{userInfo.data.fullName}</p>
                <button
                  className="bg-[orange] p-1 px-4 rounded-[999px] text-[white]
                  mt-2"
                  onClick={() => {
                    dispatch(logoutAction());
                    navigate(ROUTES.USER.HOME);
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <Link
                className="w-full flex gap-2 px-4 py-3"
                to={generatePath(ROUTES.USER.ACCOUNT)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_1.svg"
                  alt=""
                />
                Tài khoản của tôi
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3 bg-[#FEEEEA] text-[orange]">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_2_hover.svg"
                  alt=""
                />
                Đơn hàng của tôi
              </Link>
              <Link
                className="w-full flex gap-2 px-4 py-3"
                to={generatePath(ROUTES.USER.CHANGE_PASSWORD)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_3_hover.svg"
                  alt=""
                />
                Đổi mật khẩu
              </Link>
            </div>
          </div>
          <div className="detailDesktop lg:col-span-3 lg:flex xxs:hidden flex-wrap w-full bg-[white] justify-start items-start">
            <div className="w-full lg:h-[60px] xxs:h-auto xxs:py-2 lg:py-4 lg:px-[24px] xxs:px-[24px] flex xxs:flex-wrap justify-between border-b-[1px]  border-[#e0e0e0]">
              <div
                className="flex items-center h-[30px]  mb-2 "
                onClick={() => {
                  navigate(ROUTES.USER.ORDERS);
                }}
              >
                <AiOutlineArrowLeft className="text-[30px] text-[#7A7A9D]" />
                <p className="text-[16px] text-[orange] ml-2">
                  Chi tiết đơn hàng {state.data.idOrder}
                </p>
              </div>
              <p className="text-[14px] flex">
                Ngày tạo:
                <p className="ml-2">
                  {moment(state.data.createdAt).format("DD/MM/YYYY HH:mm")}
                </p>
              </p>
            </div>
            <div className=" w-full mt-3 lg: px-[32px] xxs:px-[24px]">
              <div className="w-full flex">
                Trạng thái đơn hàng:
                <p className="text-[orange] ml-2">{state.data.statusOrder}</p>
              </div>
              <div className="w-full mb-2 mt-3">Thông tin giao hàng</div>
              <div className=" p-3 border-[1px]  border-[#e0e0e0]">
                <h4 className="flex items-center">
                  Tên:
                  <p className="text-[18px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.name}
                  </p>
                </h4>
                <p className="flex items-center font-[500] my-1">
                  SĐT:
                  <p className="text-[14px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.numberPhone}
                  </p>
                </p>
                <p className="flex items-center">
                  Địa chỉ:
                  <p className="text-[14px] ml-2  text-center font-[400]  mb-[2px]">
                    {state.data.addressShow}
                  </p>
                </p>
              </div>

              <div className="w-full flex  mb-2 mt-3">
                Phương thức thanh toán:
                <p className="text-[orange] ml-2">
                  {state.data.paymentMethod === "COD"
                    ? "Tiền mặt"
                    : "Thanh toán online (VN pay)"}
                </p>
              </div>
              <div className="w-full flex  mb-2 mt-3">
                Tình trạng thanh toán:
                <p className="text-[orange] ml-2">
                  {state.data.vnp_ResponseCode === "00" &&
                  state.data.paymentMethod === "VN pay"
                    ? "Đã thanh toán"
                    : state.data.paymentMethod === "COD"
                    ? "Thanh toán khi nhận hàng"
                    : ""}
                </p>
              </div>

              <div>
                <div className="xl:col-span-2 bg-[white] my-3">
                  <div className="w-full  lg:mb-4 xxs:mb-2 text-[18px] flex flex-nowrap gap-2">
                    Giỏ hàng
                    <p className="ml-3 text-[#7A7A9D] ">
                      ({state.data.orderDetails.length}) sản phẩm
                    </p>
                  </div>
                  <div
                    className="w-full  grid-cols-6 gap-4 mb-2 xxs:hidden lg:grid bg-[#F8F8F8] border-y-[1px] 
                   border-[#e0e0e0] py-2"
                  >
                    <div className="col-span-3 flex justify-center">
                      Sản phẩm
                    </div>
                    <div className="flex justify-center">Đơn giá</div>
                    <div className="flex justify-center">Số lượng</div>
                    <div className="flex justify-center">Tổng tiền</div>
                  </div>
                  <div className="w-full">
                    {screenSize.width > 990
                      ? renderListProductCartLaptop()
                      : renderListProductCartMobile()}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end flex-nowrap my-3">
                <div className="w-full flex justify-end flex-nowrap">
                  Phí vận chuyển:
                  <p className="ml-2 w-[100px] flex justify-end ">
                    {state.data.costShip.toLocaleString()}đ
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end flex-nowrap mb-3">
                <div className="w-full flex justify-end flex-nowrap text-[20px]">
                  Tổng tiền:
                  <p className="text-[orange] text-[20px] ml-2 w-[100px] flex justify-end">
                    {(
                      state.data.costShip + state.data.totalPrice
                    ).toLocaleString()}
                    đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  lg:flex xxs:hidden justify-end my-3 px-4">
          <button
            className="bg-[orange] w-[200PX] h-[48px] text-[white] rounded-sm"
            onClick={() => {
              navigate(ROUTES.USER.ORDERS);
            }}
          >
            QUAY LẠI
          </button>
        </div>
      </div>
    </div>
  );
}
export default OrderedDetail;
