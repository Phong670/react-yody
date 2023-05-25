import { useEffect, useState } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "constants/routes";
import * as S from "./styles";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
  guestOrderProductAction,
} from "../../../redux/actions";
import { IoIosArrowBack } from "react-icons/io";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Form, Input, Badge, Radio, Space, Select } from "antd";
import { uid } from "uid";
// import { values } from "json-server-auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
function Checkout() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const { orderList } = useSelector((state) => state.order);

  console.log("🚀 ~ file: index.jsx:27 ~ Checkout ~ cartList:", cartList);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(false);
  const [district, setDistrict] = useState(false);
  const [ward, setWard] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  let totalClone = 0;
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#30c5c5" }} spin />
  );
  useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaa");
    dispatch(getCityListAction());
    console.log("🚀 ~ file: index.jsx:28 ~ Checkout ~ cityList:", cityList);
  }, []);
  useEffect(() => {
    cartList.data?.map((item) => {
      totalClone = totalClone + item.price * item.quantity;
      setTotal(totalClone);
    });
  }, []);
  console.log("total", total);
  const handleSubmitCheckoutForm = (values) => {
    console.log(
      "🚀 ~ file: index.jsx:69 ~ handleSubmitCheckoutForm ~ values:",
      values
    );
    let idOrder = uid(4);
    axios
      .get(`http://localhost:4000/cities?value=${values.city}`)

      .then((res) => {
        let cityClone = res.data[0];
        console.log(res.data[0]);
        axios
          .get(`http://localhost:4000/districts?value=${values.district}`)

          .then((res) => {
            let districtClone = res.data[0];
            console.log(district);
            axios
              .get(`http://localhost:4000/wards?value=${values.ward}`)

              .then((res) => {
                let wardClone = res.data[0];

                if (userInfo.data.id) {
                  console.log(city);
                  dispatch(
                    orderProductAction({
                      data: {
                        ...values,
                        city: cityClone,
                        district: districtClone,
                        ward: wardClone,
                        userId: userInfo.data.id,
                        addressShow:
                          values.address +
                          ", " +
                          wardClone.label +
                          ", " +
                          districtClone.label +
                          ", " +
                          cityClone.label +
                          ".",
                        totalPrice: total,
                        statusOrder: "Đang xử lý",
                        costShip: total > 500000 ? 0 : 20000,
                        idOrder: idOrder,
                        statusPayment: "Chưa thanh toán",
                        vnp_ResponseCode: "",
                        vnp_TransactionStatus: "",
                      },
                      products: cartList,
                      callback() {
                        if (values.paymentMethod === "COD") {
                          navigate({
                            pathname: generatePath(ROUTES.USER.THANKYOU, {
                              id: idOrder,
                            }),
                          });
                        } else if (values.paymentMethod === "VN pay") {
                          let data = {
                            amount: total > 500000 ? total : total + 20000,
                            bankCode: "",
                            orderDescription: "Thanh toan hoa don" + idOrder,
                            orderType: 200000,
                            language: "vn",
                            idOrder: idOrder,
                          };

                          let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: "http://localhost:5000/order/create_payment_url",
                            data: data,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          };

                          axios
                            .request(config)
                            .then((res) => {
                              console.log(
                                "======================================",
                                res
                              );
                              window.location.replace(res.data.url);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }
                      },
                    })
                  );
                } else {
                  dispatch(
                    guestOrderProductAction({
                      data: {
                        ...values,
                        city: cityClone,
                        district: districtClone,
                        ward: wardClone,
                        addressShow:
                          values.address +
                          ", " +
                          wardClone.label +
                          ", " +
                          districtClone.label +
                          ", " +
                          cityClone.label +
                          ".",
                        totalPrice: total,
                        statusOrder: "Đang xử lý",
                        costShip: total > 500000 ? 0 : 20000,
                        idGuestOrder: idOrder,
                        statusPayment: "Chưa thanh toán",
                        vnp_ResponseCode: "",
                        vnp_TransactionStatus: "",
                      },
                      products: cartList,
                      callback() {
                        if (values.paymentMethod === "COD") {
                          navigate({
                            pathname: generatePath(ROUTES.USER.THANKYOU, {
                              id: idOrder,
                            }),
                          });
                        } else if (values.paymentMethod === "VN pay") {
                          let data = {
                            amount: total > 500000 ? total : total + 20000,
                            bankCode: "",
                            orderDescription: "Thanh toan hoa don" + idOrder,
                            orderType: 200000,
                            language: "vn",
                            idOrder: idOrder,
                          };

                          let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: "http://localhost:5000/order/create_payment_url",
                            data: data,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          };

                          axios
                            .request(config)
                            .then((res) => {
                              console.log(
                                "======================================",
                                res
                              );
                              window.location.replace(res.data.url);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }
                      },
                    })
                  );
                }
              });
          });
      });

    setLoading(true);
  };
  const renderCartList = () => {
    return cartList.data.map((item, index) => {
      return (
        <div
          key={index}
          className=" flex flex-nowrap py-3 border-b-[1px] border-solid border-[white] gap-2"
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
    <div className="mt-[0px] mb-[84px] xl:min-w-[1200px] xxs:w-full  grid lg:grid-cols-3 xxs:grid-cols-1 gap-4 xxs:px-4 lg:px-0">
      <div className="lg:col-span-2 h-auto  flex flex-wrap justify-center content-start my-4">
        <div className="w-full h-[80px]  flex justify-center pb-2 mb-2">
          <img
            className="cursor-pointer"
            onClick={() => {
              navigate({
                pathname: generatePath(ROUTES.USER.HOME),
              });
            }}
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/checkout_logo.png?1683881952485"
            alt=""
          />
        </div>
        <div className="w-full xxs:block lg:hidden bg-[#e7e8fc] p-4 my-4">
          <div className="pb-3 border-b-[1px] border-solid border-[white] ">
            <h4 className="text-[20px] font-bold">
              Đơn hàng ({cartList.data.length} sản phẩm)
            </h4>
          </div>
          <>{renderCartList()}</>
          <div className="w-full py-3 border-b-[1px] border-solid border-[white] flex flex-wrap gap-4">
            <div className="flex justify-between w-full">
              <div>Tạm tính</div>
              <div>{total.toLocaleString()}đ</div>
            </div>

            <div className="flex justify-between w-full  ">
              <div>Phí vận chuển</div>
              <div> {total > 500000 ? "Miễn phí vận chuyển" : "20.000đ"}</div>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4 py-3">
            <div className="w-full flex justify-between">
              <div className="text-[20px]">Tổng cộng</div>
              <div className="text-[20px] text-[orange]">
                {total > 500000
                  ? total.toLocaleString()
                  : (total + 20000).toLocaleString()}
                đ
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-2 xxs:grid-cols-1 gap-4">
          <div className="col-span-1">
            <div className="mb-2">
              <h4 className="text-[20px] font-bold">Thông tin giao hàng</h4>
            </div>
            <div>
              <Form
                form={checkoutForm}
                name="checkoutForm"
                layout="vertical"
                onFinish={(values) => handleSubmitCheckoutForm(values)}
                autoComplete="off"
                className="w-full p-2 text-[20px]"
              >
                <Form.Item
                  label=""
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên",
                    },
                  ]}
                >
                  <Input
                    placeholder="Họ và tên"
                    className="py-[10px] rounded-[4px]"
                  />
                </Form.Item>
                <Form.Item
                  label=""
                  name="numberPhone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ]}
                >
                  <Input
                    placeholder="Số điện thoại"
                    className="py-[10px] rounded-[4px]"
                  />
                </Form.Item>
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="py-[10px] rounded-[4px]"
                  />
                </Form.Item>

                <Form.Item
                  name="city"
                  rules={[
                    { required: true, message: "Bạn chưa chọn tỉnh thành" },
                  ]}
                >
                  <Select
                    className="selectCustomCheckout"
                    placeholder="Tỉnh thành"
                    name="city"
                    options={cityList.data}
                    onChange={(value) => {
                      dispatch(getDistrictListAction({ cityCode: value }));
                      checkoutForm.setFieldsValue({
                        district: undefined,
                        ward: undefined,
                      });
                    }}
                  ></Select>
                </Form.Item>

                <Form.Item
                  name="district"
                  rules={[
                    { required: true, message: "Bạn chưa chọn quận huyện" },
                  ]}
                >
                  <Select
                    className="selectCustomCheckout"
                    name="district"
                    placeholder="Quận huyện"
                    options={districtList.data}
                    onChange={(value) => {
                      dispatch(getWardListAction({ districtCode: value }));
                      checkoutForm.setFieldsValue({
                        ward: undefined,
                      });
                    }}
                    disabled={!checkoutForm.getFieldValue("city")}
                  ></Select>
                </Form.Item>

                <Form.Item
                  name="ward"
                  rules={[
                    { required: true, message: "Bạn chưa chọn phường xã" },
                  ]}
                >
                  <Select
                    className="selectCustomCheckout"
                    placeholder="Phường xã"
                    name="ward"
                    options={wardList.data}
                    disabled={!checkoutForm.getFieldValue("district")}
                  ></Select>
                </Form.Item>
                <Form.Item
                  label=""
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
                >
                  <Input
                    placeholder="Địa chỉ"
                    className="py-[10px] rounded-[4px]"
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <div className="mb-2">
                <h4 className="text-[20px] font-bold">Vận chuyển</h4>
              </div>
              <div className="flex justify-between mt-3 p-3 border-[1px]  border-[#cecdcd] rounded-[4px]">
                <div>Phí vận chuyển:</div>
                <div> {total > 500000 ? "Miễn phí vận chuyển" : "20.000đ"}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <h4 className="text-[20px] font-bold">Thanh toán</h4>
              </div>
              <div className="mt-3 p-2 border-[1px]  border-[#cecdcd] rounded-[4px] flex items-center">
                <Form
                  form={checkoutForm}
                  name="checkoutForm"
                  layout="vertical"
                  onFinish={(values) => handleSubmitCheckoutForm(values)}
                  autoComplete="off"
                  className="payment w-full p-2 text-[20px] flex items-center"
                >
                  <Form.Item
                    label=""
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn phương thức thành toán",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="COD">
                          <p className="flex gap-2 justify-content-between lg:w-[120%] xxs:w-[110%]">
                            <p>Thanh toán khi nhận hàng (COD)</p>
                            <FaMoneyBillAlt className="text-[24px] text-[orange]" />
                          </p>
                        </Radio>
                        <Radio value="VN pay" className="radioCustomCheckout ">
                          <p className="flex gap-2  justify-content-between lg:w-[100%] xxs:w-full">
                            <p>
                              Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng
                              VNPAY
                            </p>
                            <img
                              className="w-[50px] h-[40px]"
                              src="https://bizweb.dktcdn.net/assets/themes_support/payment_icon_vnpay.png"
                              alt=""
                            />
                          </p>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="w-full xxs:flex lg:hidden justify-between items-center my-4">
              <Link
                className="text-[orange] flex items-center gap-2 hover:cursor-pointer"
                to={ROUTES.USER.CART}
              >
                <IoIosArrowBack className="text-[20px]" /> Quay về giỏ hàng
              </Link>
              <button
                form="checkoutForm"
                // key="submit"
                className="bg-[orange] w-[40%] h-[42px] py-2 text-[white] rounded-[4px]"
                onClick={() => {
                  checkoutForm.onFinish();
                  console.log(123);
                }}
              >
                {loading ? (
                  <Spin indicator={antIcon} className="w-full" />
                ) : (
                  <p className="w-full">Đặt hàng</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:block xxs:hidden h-[100vh] w-[5] bg-[#e7e8fc] p-4">
        <div className="pb-3 border-b-[1px] border-solid border-[white] ">
          <h4 className="text-[20px] font-bold">
            Đơn hàng ({cartList.data.length} sản phẩm)
          </h4>
        </div>
        <div className="scroll overflow-auto h-[50%]">{renderCartList()}</div>
        <div className="w-full py-3 border-b-[1px] border-solid border-[white] flex flex-wrap gap-4">
          <div className="flex justify-between w-full">
            <div>Tạm tính</div>
            <div>{total.toLocaleString()}đ</div>
          </div>

          <div className="flex justify-between w-full  ">
            <div>Phí vận chuyển</div>
            <div> {total > 500000 ? "Miễn phí vận chuyển" : "20.000đ"}</div>
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-4 py-3">
          <div className="w-full flex justify-between">
            <div className="text-[20px]">Tổng cộng</div>
            <div className="text-[20px] text-[orange]">
              {total > 500000
                ? total.toLocaleString()
                : (total + 20000).toLocaleString()}
              đ
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <Link
              className="text-[orange] flex items-center gap-2 hover:cursor-pointer"
              to={ROUTES.USER.CART}
            >
              <IoIosArrowBack className="text-[20px]" /> Quay về giỏ hàng
            </Link>
            <button
              form="checkoutForm"
              // key="submit"
              className="bg-[orange] h-[42px] w-[40%] py-2 text-[white] rounded-[4px]"
              onClick={() => {
                checkoutForm.onFinish();
                console.log(123);
              }}
            >
              {loading ? (
                <Spin indicator={antIcon} className="w-full" />
              ) : (
                <p className="w-full">Đặt hàng</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
