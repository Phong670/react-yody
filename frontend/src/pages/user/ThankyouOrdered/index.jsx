import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/routes";
import { Badge, Spin } from "antd";
import axios from "axios";
import { emailSuccessTemp } from "../../../constants/emailSuccessTemp";
import { LoadingOutlined } from "@ant-design/icons";

function ThankyouOrdered() {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#eeb50d" }} spin />
  );
  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    if (userInfo.data.id) {
      console.log("dang nap 1");
      axios
        .get("http://localhost:4000/orders?", {
          params: {
            idOrder: params.id,
            _embed: "orderDetails",
          },
        })

        .then((res) => {
          console.log("then dang nhap", res.data[0]);
          setDataShow(res.data[0]);
        })
        .catch((err) => {
          console.log("loi roi");
        });
    } else {
      console.log("dang xuat 1");
      axios
        .get("http://localhost:4000/guestOrders?", {
          params: {
            idGuestOrder: params.id,
            _embed: "guestOrderDetails",
          },
        })

        .then((res) => {
          // chuyen guestOrder sang order de de dang code chung
          let dataShowMid = {
            ...res.data[0],
            orderDetails: res.data[0].guestOrderDetails,
            idOrder: res.data[0].idGuestOrder,
          };
          setDataShow(dataShowMid);
        })
        .catch((err) => {
          console.log("loi roi");
        });
    }
  }, [userInfo.data.id]);

  useEffect(() => {
    let emailSuccessTemp22 = emailSuccessTemp(dataShow);

    let data = JSON.stringify({
      email: dataShow?.email,
      subject: "Thông báo đặt hàng thành công ",
      content: emailSuccessTemp22,
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

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataShow]);

  const renderCartList = () => {
    return dataShow?.orderDetails?.map((item, index) => {
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
  return dataShow === {} || 1 === undefined ? (
    <div className="w-full h-[100vh] flex justify-content-center align-items-center ">
      <Spin indicator={antIcon} className="w-full" />
    </div>
  ) : (
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
            <p className="ml-[4px] text-[orange]">{dataShow?.idOrder}</p>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Thông tin người mua</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Tên người nhận: {dataShow?.name}
              </p>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Số điện thoại: {dataShow?.numberPhone}
              </p>
            </div>
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Địa chỉ nhận hàng</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                Địa chỉ: {dataShow?.addressShow}
              </p>
            </div>
          </div>
          <div className="w-full flex xxs:flex-wrap my-2">
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Phương thức thanh toán</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                {dataShow?.paymentMethod === "COD"
                  ? "Tiền mặt"
                  : "Thanh toán online (VN pay)"}
              </p>
            </div>
            <div className="lg:w-[50%] xxs:w-full">
              <h4 className="text-[20px]">Tình trạng thanh toán</h4>
              <p className="text-[14px] font-[500px]  my-2 px-2">
                {dataShow?.vnp_ResponseCode === "00" &&
                dataShow?.paymentMethod === "VN pay"
                  ? "Đã thanh toán"
                  : dataShow?.paymentMethod === "COD"
                  ? "Thanh toán khi nhận hàng"
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[650px] xxs:w-full">
          <div className=" lg:block h-auto max-h-[500px] w-[5] bg-[#e7e8fc] p-4 ">
            <div className="pb-3 border-b-[1px] border-solid border-[white] ">
              <h4 className="text-[20px] font-bold ">
                Đơn hàng ({dataShow?.orderDetails?.length} sản phẩm)
              </h4>
            </div>
            <div className="h-[200px] w-full scroll overflow-y-scroll ">
              {renderCartList()}
            </div>
            <div className="w-full py-3 border-b-[1px] border-solid border-[white] flex flex-wrap gap-4">
              <div className="flex justify-between w-full">
                <div>Tạm tính</div>
                <div>{dataShow?.totalPrice?.toLocaleString()}đ</div>
              </div>
              <div className="flex justify-between w-full  ">
                <div>Phí vận chuyển</div>
                <div>
                  {dataShow?.costShip === 0
                    ? "Miễn phí vận chuyển"
                    : `${dataShow?.costShip?.toLocaleString()}đ`}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 py-3">
              <div className="w-full flex justify-between">
                <div className="text-[20px]">Tổng cộng</div>
                <div className="text-[20px] text-[orange]">
                  {dataShow?.totalPrice > 500000
                    ? dataShow?.totalPrice?.toLocaleString()
                    : (dataShow?.totalPrice + 20000)?.toLocaleString()}
                  đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-4 h-[50px] gap-4">
        <button
          form="checkoutForm"
          // key="submit"
          className="bg-[orange] px-3 py-1  text-[white] rounded-[4px]"
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
