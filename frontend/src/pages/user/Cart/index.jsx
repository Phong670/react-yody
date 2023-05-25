import { useEffect, useState, useRef } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { ROUTES } from "../../../constants/routes";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "../../../redux/actions/index";
import { Modal } from "antd";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [openModalDeleteCartItem, setOpenModalDeleteCartItem] = useState(false);
  const [contentDeleteItem, setContentDeleteItem] = useState("");
  let totalClone = 0;

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  //ant modal showDelete
  const showModalDeleteCartItem = () => {
    setOpenModalDeleteCartItem(true);
  };
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
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
          <div className="flex justify-center">
            {item.price.toLocaleString()}đ
          </div>
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
              onClick={() => {
                setContentDeleteItem(item);
                showModalDeleteCartItem();
              }}
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
            className="w-[80px] col-span-1 rounded-[4px] lg:mt-[8px]"
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
            <div className="w-full">Size: {item.size.toLocaleString()}đ</div>
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
              onClick={() => {
                setContentDeleteItem(item);
                showModalDeleteCartItem();
              }}
            >
              <RiDeleteBinLine className="text-[20px] cursor-pointer" />
            </div>
            <div className="flex justify-center">
              {item.price.toLocaleString()}đ
            </div>
          </div>
        </div>
      );
    });
  };

  const windowWidth = useRef(window.innerWidth);
  console.log("width: ", windowWidth.current);
  return (
    <div className="w-[100vw] flex justify-center content-center bg-[#f8f8f8]">
      <Modal
        open={openModalDeleteCartItem}
        footer={null}
        closable={null}
        padding={null}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="!w-[410px] !p-0 modalDeleteCartItem"
      >
        <div className="w-full">
          <p className="text-[red] w-full flex justify-center text-[16px] text-center">
            Bạn có chắc chắn muốn xoá sản phẩm này?
          </p>
          <p className=" w-full flex justify-center text-center">
            {contentDeleteItem.title}
          </p>
        </div>
        <div className="w-full flex mt-3">
          <div
            className="bg-[orange] w-[50%] flex justify-center text-[white] p-[4px] rounded-sm cursor-pointer"
            onClick={() => {
              dispatch(
                deleteCartItemAction({
                  id: contentDeleteItem.id,
                  size: contentDeleteItem.size,
                })
              );
              setOpenModalDeleteCartItem(false);
            }}
          >
            Đồng ý
          </div>
          <div
            className="w-[50%] flex justify-center p-[4px] rounded-sm cursor-pointer  border-[1px]  !border-[#F2F2F2]"
            onClick={() => setOpenModalDeleteCartItem(false)}
          >
            Không
          </div>
        </div>
      </Modal>
      {cartList.data.length > 0 ? (
        <div className="max-w-[1200px] md:w-[680px] lg:w-[900px] xl:w-full lg:mt-[85px] lg:mb-4 xxs:mt-[0px] lg:grid-cols-1 grid xl:grid-cols-3 gap-4 ">
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
              <div className="flex justify-end">Tổng tiền</div>
            </div>
            <div className="w-full">
              {screenSize.width > 620
                ? renderListProductCartLaptop()
                : renderListProductCartMobile()}
            </div>
          </div>
          <div className="xl:col-span-1 mb-3 ">
            <img
              className="w-full"
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ui_banner_pc.jpg?1683278564918"
              alt=""
            />
            <div className="p-2  bg-[white]">
              <p className=" flex justify-between py-4">
                Tổng đơn (tạm tính):
                <p className="text-[20px]">{total.toLocaleString()}đ </p>
              </p>
              <button
                className="bg-[orange] w-full h-[48px] text-[white] rounded-sm"
                onClick={() => {
                  navigate(ROUTES.USER.CHECKOUT);
                }}
              >
                Đặt hàng ({cartList.data.length})
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:mt-[100px] xxs:mt-[60px] flex flex-col items-center justify-center flex-1  min-h-[260px] mb-[20px]">
          <img
            className="w-[120px] h-[110px]"
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/blank_cart.svg?1683303155312"
            alt=""
          />
          <h6 className="text-[16px] my-2 text-[#7A7A9D]">
            Giỏ hàng của bạn trống
          </h6>
          <button
            className="text-[20px] text-[orange] flex justify-center items-center px-2 py-1  border-[orange] border-solid border-2 rounded-md hover:bg-[orange] hover:text-[white] "
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.HOME),
              });
            }}
          >
            Mua ngay
          </button>
        </div>
      )}
    </div>
  );
}
export default Cart;
