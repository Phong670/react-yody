import { useEffect, useState, useMemo } from "react";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { getOrderList } from "../../../redux/actions";
import { Badge } from "antd";
import axios from "axios";
import moment from "moment";
import * as crypto from "crypto-js";

function ThankyouOrdered() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log("🚀 ~ file: index.jsx:14 ~ ThankyouOrdered ~ state:", state);
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

  useEffect(() => {
    const emailBody = `
    <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #f5f5f5;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-top: 50px;
           border: 1px solid rgb(238, 162, 31);
      }
     #topTitle{
      width: 100%;
      display: flex;
        margin: auto;

      justify-content: center !important;
      align-items: center !important;
  }
  #logoImg{
         width: 100%;
        margin: auto;

      display: flex;
      justify-content: center !important;
      align-items: center !important;
  }
      .logo {
          display: flex;
        justify-content: center;
        max-width: 200px;
        margin: auto;
        margin-bottom: 20px;
      }

      h1 {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: #000000;
        margin-top: 0;
      }

      p {
        font-size: 16px;
        color: #000000;
      }

      .success-icon {
        font-size: 48px;
        color: #4caf50;
        margin-bottom: 20px;
      }

      .order-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }

      .order-table th,
      .order-table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    
      }
#quantity{
   text-align: center;
}
      .order-table th {
        background-color: #f2f2f2;
         text-align: center;
      }

      .total-price {
        font-size: 18px;
        font-weight: bold;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
  <div id="topTitle" style="flex-wrap: wrap; justify-content: center">    
     <div id="logoImg">
      <img
        class="logo"
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/checkout_logo.png?1683881952485"
        alt="Your Logo"
      ></div>
  
  </div>
  <p>Chào ${state.data.name}.</p>
  <div style="display: flex"><p style="color: rgb(238, 162, 31); margin: 0; margin-right: 4px">Yody</p> 
   <p style="margin: 0">cảm ơn bạn đã đặt hàng.</p>
</div>
  <p>Chúng tôi đã nhận được yêu cầu đặt hàng của bạn. Chi tiết ở bên dưới:</p>
   <div style="display: flex"> 
        <p style="margin: 0">Mã đơn hàng:</p>
        <p style="color: rgb(238, 162, 31); margin: 0; margin-left: 4px; margin-right: 4px"> ${
          state.data.idOrder
        } </p>
        <p style="margin: 0">(Ngày đặt: ${moment(state.data.createdAt).format(
          "DD/MM/YYYY HH:mm"
        )})</p>
  </div>
     <div style="display: flex"> 
        <p style="">Trạng thái đơn hàng:</p>
        <p style="color: rgb(238, 162, 31);  margin-left: 4px"> ${
          state.data.status
        } </p>
  </div>

  <p style="margin: 0">Chi tiết đơn hàng:</p>
  <table class="order-table">
   <thead>
      <tr>
        <th>Tên sản phẩm</th>
        <th>Số lượng</th>
        <th>Giá</th>
        <th>Tổng</th>
      </tr>
    </thead>
    <tbody>
      ${state.products.data
        .map(
          (item) =>
            `<tr>
              <td>${item.title}</td>
              <td id="quantity">${item.quantity}</td>
              <td>${item.price.toLocaleString()}đ</td>
              <td>${(item.quantity * item.price).toLocaleString()}đ</td>
            </tr>`
        )
        .join("")}
    </tbody>
  </table>

  <p class="order-letter">Phí vận chuyển: ${state.data.costShip.toLocaleString()}đ</p>
  <p class="order-letter" style:"display: flex">Tổng giá trị đơn hàng: <p style="color:rgb(238, 162, 31); margin-left: 4px; "> ${
    state.data.totalPrice + state.data.costShip
  }đ</p></p>
  <p class="">Phương thức thanh toán: ${
    state.data.paymentMethod === "cod"
      ? "Thanh toán khi nhận hàng"
      : "Thanh toán online"
  }</p>
  
  <i style="font-size: 16px">Cảm ơn quý khách hàng đã tin tưởng và đặt hàng sản phẩm của chúng tôi.</i>
 <p style="margin:0"> <i style="width: 100% ">Xem lịch sử mua hàng tại: http://localhost:3000/account/orders </i></p> 
<p style="margin:0">  <i style="width: 100%">Mọi thông tin xin liên hệ: </i></p>
<p style="margin:0">  <i style="width: 100%">- Đường dây miễn phí: 18002086</i></p>
<p style="margin:0">  <i style="width: 100%">- Trang chủ cửa hàng: http://localhost:3000/</i></p>




</div>
</body>
</html>
`;
    let data = JSON.stringify({
      // email: state.data.email,
      subject: "Thông báo đặt hàng thành công ",
      content: emailBody,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/email/send",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  }, []);

  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
  useEffect(() => {}, []);

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
            <p className="ml-[4px] text-[orange]">{state?.data.idOrder}</p>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Thông tin người mua</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Tên người nhận: {state?.data.name}
              </p>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Số điện thoại: {state?.data.numberPhone}
              </p>
            </div>
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Địa chỉ nhận hàng</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Địa chỉ: {state?.data.address}, {state?.data.ward.label},
                {state?.data.district.label},{state?.data.city.label}
              </p>
            </div>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Phương thức thanh toán</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                {state?.data.paymentMethod === "cod" &&
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
          <div className=" lg:block h-auto max-h-[500px] w-[5] bg-[#e7e8fc] p-4 ">
            <div className="pb-3 border-b-[1px] border-solid border-[white] ">
              <h4 className="text-[20px] font-bold ">
                Đơn hàng ({state?.products.data.length} sản phẩm)
              </h4>
            </div>
            <div className="h-[200px] w-full scroll overflow-y-scroll ">
              {renderCartList()}
            </div>
            <div className="w-full py-3 border-b-[1px] border-solid border-[white] flex flex-wrap gap-4">
              <div className="flex justify-between w-full">
                <div>Tạm tính</div>
                <div>{state?.data.totalPrice.toLocaleString()}đ</div>
              </div>
              <div className="flex justify-between w-full  ">
                <div>Phí vận chuyển</div>
                <div>
                  {state?.data.costShip === 0
                    ? "Miễn phí vận chuyển"
                    : `${state?.data.costShip.toLocaleString()}đ`}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 py-3">
              <div className="w-full flex justify-between">
                <div className="text-[20px]">Tổng cộng</div>
                <div className="text-[20px] text-[orange]">
                  {state?.data.totalPrice > 500000
                    ? state?.data.totalPrice.toLocaleString()
                    : (state?.data.totalPrice + 20000).toLocaleString()}
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
