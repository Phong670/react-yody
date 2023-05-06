import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { useRef } from "react";
import { REQUEST } from "../../../redux/constants";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "../../../redux/actions/index";

function Cart() {
  const { cartList } = useSelector((state) => state.cart);
  console.log("🚀 ~ file: index.jsx:14 ~ Cart ~ cartList:", cartList);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  let totalClone = 0;
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
  console.log("width", screenSize.width);
  useEffect(() => {
    cartList.data?.map((item) => {
      totalClone = totalClone + item.price * item.quantity;
      setTotal(totalClone);
    });
  }, [cartList.data]);
  const renderListProductCartLaptop = () => {
    return cartList.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full grid grid-cols-6 gap-4 mb-4 text-[14px] "
        >
          <img className="w-[80px] rounded-[4px]" src={item.image} alt="anh " />
          <div className="col-span-2 flex flex-wrap col justify-start align-content-md-between xl:ml-[-35px] lg:ml-[-45px] sm:ml-[-18px]">
            <Link
              className="hover:text-[orange] w-full"
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              {item.title}
            </Link>
            <div>Size: {item.size}</div>
          </div>
          <div className="flex justify-center">{item.price}</div>
          <div className="flex ">
            <div className="flex w-full h-[38px] justify-center gap-0">
              <div className="flex justify-center gap-0">
                <button
                  className={`w-[37px] h-[36px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center ${
                    item.quantity === 1 ? "text-[#DEDDDD] " : "text-[#62676D]"
                  }  
            order-solid border-[0.8px] border-[#e9ecef] rounded-l-[4px] text-[24px]`}
                  onClick={() => {
                    item.quantity !== 1 &&
                      dispatch(
                        updateCartItemAction({
                          id: item.id,
                          size: item.size,
                          quantity: item.quantity - 1,
                        })
                      );
                  }}
                >
                  -
                </button>
                <div className="w-[37px] h-[36px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center order-solid border-[0.8px] border-[#e9ecef] text-[16px]">
                  {item.quantity}
                </div>
                <button
                  className="w-[37px] h-[36px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center  rounded-r-[4px] order-solid border-[0.8px] border-[#e9ecef] text-[24px]"
                  onClick={() => {
                    dispatch(
                      updateCartItemAction({
                        id: item.id,
                        size: item.size,
                        quantity: item.quantity + 1,
                      })
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap col justify-end ">
            <div className="w-full  flex justify-end">
              {(item.price * item.quantity).toLocaleString()}đ
            </div>
            <div
              className="w-full flex justify-end items-end pb-2"
              onClick={() =>
                dispatch(deleteCartItemAction({ id: item.id, size: item.size }))
              }
            >
              <RiDeleteBinLine className="text-[20px] cursor-pointer" />
            </div>
          </div>
        </div>
      );
    });
  };
  const renderListProductCartMobile = () => {
    return cartList.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full grid grid-cols-5 gap-2 mb-4 text-[14px] "
        >
          <img
            className="w-[80px] col-span-1 rounded-[4px] mt-[8px]"
            src={item.image}
            alt="anh "
          />
          <div className="w-[100%] col-span-3 flex flex-wrap col justify-between  align-content-between ml-[5px]">
            <Link
              className="hover:text-[orange] w-full "
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              {item.title}
            </Link>
            <div className="w-full">Size: {item.size}</div>
            <div className="flex w-full ">
              <div className="flex w-full  gap-0">
                <div className="flex justify-center gap-0">
                  <button
                    className={`w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center ${
                      item.quantity === 1 ? "text-[#DEDDDD] " : "text-[#62676D]"
                    }  
            order-solid border-[0.8px] border-[#e9ecef] rounded-l-[4px] text-[20px]`}
                    onClick={() => {
                      item.quantity !== 1 &&
                        dispatch(
                          updateCartItemAction({
                            id: item.id,
                            size: item.size,
                            quantity: item.quantity - 1,
                          })
                        );
                    }}
                  >
                    -
                  </button>
                  <div className="w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center order-solid border-[0.8px] border-[#e9ecef] text-[14px]">
                    {item.quantity}
                  </div>
                  <button
                    className="w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center  rounded-r-[4px] order-solid border-[0.8px] border-[#e9ecef] text-[20px]"
                    onClick={() => {
                      dispatch(
                        updateCartItemAction({
                          id: item.id,
                          size: item.size,
                          quantity: item.quantity + 1,
                        })
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between items-end ">
            <div
              className="w-full flex justify-end items-end pb-2"
              onClick={() =>
                dispatch(deleteCartItemAction({ id: item.id, size: item.size }))
              }
            >
              <RiDeleteBinLine className="text-[20px] cursor-pointer" />
            </div>
            <div className="flex justify-center">{item.price}</div>
          </div>
        </div>
      );
    });
  };

  const windowWidth = useRef(window.innerWidth);
  console.log("width: ", windowWidth.current);
  return (
    <div className="max-w-[1200px] md:w-[680px] lg:w-[900px] xl:w-full mt-[105px] lg:grid-cols-1 grid xl:grid-cols-3 gap-4 p-4">
      <div className="xl:col-span-2 bg-[white] p-4">
        <div className="w-full  mb-4 text-[18px] flex flex-nowrap gap-2">
          Giỏ hàng{" "}
          <p className="ml-3 text-[#7A7A9D] ">
            ({cartList.data.length}) sản phẩm
          </p>
        </div>
        <div className="w-full  grid-cols-6 gap-4 mb-2 xxs:hidden lg:grid">
          <div className="col-span-3">Sản phẩm</div>
          <div className="flex justify-center">Đơn giá</div>
          <div className="flex justify-center">Số lượng</div>
          <div className="flex justify-center">Tổng tiền</div>
        </div>
        <div className="w-full">
          {screenSize.width > 620
            ? renderListProductCartLaptop()
            : renderListProductCartMobile()}
        </div>
      </div>
      <div className="xl:col-span-1 ">
        <img
          className="w-full"
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ui_banner_pc.jpg?1683278564918"
          alt=""
        />
        <div className="p-2 bg-[white]">
          <p className=" flex justify-between">
            Tổng đơn (tạm tính):
            <p className="text-[20px]">{total.toLocaleString()}đ </p>
          </p>
          <button className="bg-[orange] w-full h-[48px] text-[white] rounded-sm">
            Đặt hàng ({cartList.data.length})
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
