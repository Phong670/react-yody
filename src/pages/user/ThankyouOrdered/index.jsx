import { useEffect, useState, useMemo } from "react";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { getOrderList } from "../../../redux/actions";
import { Button, Form, Input, Badge, Radio, Space } from "antd";
import axios from "axios";

function ThankyouOrdered() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("🚀 ~ file: index.jsx:14 ~ ThankyouOrdered ~ state:", state);
  const { orderList } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo.data.id) {
      console.log("ddang nhap");
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);
  let orderListFinalClone = [];
  orderList.data.map((item, index) => {
    orderListFinalClone.push({
      ...item,
      addressFinal:
        item.address +
        ", " +
        item.ward?.label +
        ", " +
        item.district?.label +
        ", " +
        item.city?.label,
    });
  });
  console.log(
    "🚀 ~ file: index.jsx:36 ~ orderList.data.map ~ orderList:",
    orderList
  );
  console.log(
    "🚀 ~ file: index.jsx:33 ~ Orders ~ orderListFinalClone:",
    orderListFinalClone
  );
  const templateParams = {
    email: "qphong670@gmail.com",
    subject: "test",
    content: "content",
  };
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/email/send", templateParams)

  //     .then((res) => {
  //       console.log("email ok");
  //     })
  //     .catch((err) => {
  //       console.log("loi roi");
  //     });
  // }, []);

  useEffect(() => {}, []);
  const renderCartList = () => {
    return state.products.data?.map((item, index) => {
      return (
        <div
          key={index}
          className=" flex flex-nowrap  py-3 border-b-[1px] border-solid border-[white] gap-2"
        >
          <Badge count={item.quantity} size="default">
            <div className="bg-[white] flex justify-center rounded-[4px] overflow-hidden">
              <img
                src={item.image}
                alt="anh"
                className="w-[100%] h-[80px] object-cover"
              />
            </div>
          </Badge>

          <div className=" ml-3 flex flex-col justify-between">
            <h3>{item.title}</h3>
            <p>Size: {item.size}</p>
          </div>
          <div className="flex flex-1 justify-end">
            <p>{item.price.toLocaleString()}đ</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="max-w-[1200px] w-full flex justify-center flex-wrap mt-4 p-3 min-h-[95vh]">
      <div className="w-full flex justify-center">
        <img
          className="cursor-pointer "
          onClick={() => {
            navigate({
              pathname: generatePath(ROUTES.USER.HOME),
            });
          }}
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/checkout_logo.png?1683881952485"
          alt=""
        />
      </div>
      <div className="w-full flex xxs:flex-wrap lg:flex-nowrap justify-between gap-2 mt-4">
        <div className="lg:max-w-[800px] w-full">
          <div className="w-full flex justify-center">
            <div className="w-full flex justify-center items-center">
              <img
                className="w-[80px]"
                src="https://www.easy-gst.in/wp-content/uploads/2017/07/success-icon-10.png"
                alt=""
              />
              <h4 className="text-[24px] ml-2"> Cảm ơn bạn đã đặt hàng</h4>
            </div>
          </div>
          <div className="flex text-[20px]">
            Mã đơn hàng:
            <p className="ml-[4px] text-[orange]">{state.data.idOrder}</p>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Thông tin người mua</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Tên người nhận: {state.data.name}
              </p>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Số điện thoại: {state.data.numberPhone}
              </p>
            </div>
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Địa chỉ nhận hàng</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Địa chỉ: {state.data.address}, {state.data.ward.label},
                {state.data.district.label},{state.data.city.label}
              </p>
            </div>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Phương thức thanh toán</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                {state.data.paymentMethod === "cod" &&
                  "Thanh toán khi nhận hàng (COD)"}
              </p>
            </div>
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Phương thức vận chuyển</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">--</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[650px] xxs:w-full">
          <div className=" lg:block h-auto max-h-[500px] w-[5] bg-[#e7e8fc] p-4">
            <div className="pb-3 border-b-[1px] border-solid border-[white] ">
              <h4 className="text-[20px] font-bold">
                Đơn hàng ({state.products.data.length} sản phẩm)
              </h4>
            </div>
            <div className="scroll overflow-auto h-[50%]">
              {renderCartList()}
            </div>
            <div className="w-full py-3 border-b-[1px] border-solid border-[white] flex flex-wrap gap-4">
              <div className="flex justify-between w-full">
                <div>Tạm tính</div>
                <div>{state.data.totalPrice.toLocaleString()}đ</div>
              </div>
              <div className="flex justify-between w-full  ">
                <div>Phí vận chuyển</div>
                <div>
                  {state.data.costShip === 0
                    ? "Miễn phí vận chuyển"
                    : `${state.data.costShip.toLocaleString()}đ`}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 py-3">
              <div className="w-full flex justify-between">
                <div className="text-[20px]">Tổng cộng</div>
                <div className="text-[20px] text-[orange]">
                  {state.data.totalPrice > 500000
                    ? state.data.totalPrice.toLocaleString()
                    : (state.data.totalPrice + 20000).toLocaleString()}
                  đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-4 h-[60px] gap-4">
        {userInfo.data.id && (
          <button
            form="checkoutForm"
            // key="submit"
            className="bg-[orange] w-[25%] py-2  text-[white] rounded-[4px]"
            onClick={() => {
              navigate(ROUTES.USER.ORDERS);
            }}
          >
            Xem đơn hàng của bạn
          </button>
        )}

        <button
          form="checkoutForm"
          // key="submit"
          className="bg-[orange] w-[25%] py-2  text-[white] rounded-[4px]"
          onClick={() => {
            navigate(ROUTES.USER.HOME);
          }}
        >
          Tiếp tục mua hàng
        </button>
      </div>
      <div className="w-full flex justify-center content-center my-2 border-t-[1px] border-[#4d494911]">
        Sau khi hoàn tất đơn hàng khoảng 60-90 phút (trong giờ hành chính), YODY
        sẽ nhanh chóng gọi điện xác nhận thời gian giao hàng với bạn. YODY xin
        cảm!
      </div>
    </div>
  );
}
export default ThankyouOrdered;
