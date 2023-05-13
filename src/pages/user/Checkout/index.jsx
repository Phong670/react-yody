import { useEffect, useState, useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
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
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
} from "../../../redux/actions";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Form, Input, Badge } from "antd";
import Select from "react-select";
import { values } from "json-server-auth";
function Checkout() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  console.log("🚀 ~ file: index.jsx:27 ~ Checkout ~ cartList:", cartList);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabledDistrict, setIsDisabledDistrict] = useState(true);
  const [isDisabledWard, setIsDisabledWard] = useState(true);
  const [selectedOptionCity, setSelectedOptionCity] = useState(null);
  const [selectedOptionDistrict, setSelectedOptionDistrict] = useState(null);

  const [selectedOptionWard, setSelectedOptionWard] = useState(null);

  console.log(
    "🚀 ~ file: index.jsx:36 ~ Checkout ~ selectedOptionCity:",
    selectedOptionCity
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  let totalClone = 0;

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
  }, [cartList.data]);
  const handleSubmitCheckoutForm = (values) => {
    console.log("00000000000000000000000000000000000000000000");
    console.log(values);
  };
  const renderCartList = () => {
    return cartList.data.map((item, index) => {
      return (
        <div
          key={index}
          className="grid grid-cols-5 py-3 border-b-[1px] border-solid border-[white] gap-2"
        >
          <Badge count={item.quantity} size="default">
            <div className="col-span-1 bg-[white] flex justify-center rounded-sm overflow-hidden">
              <img
                src={item.image}
                alt="anh"
                className="w-[100%] h-[80px] object-cover"
              />
            </div>
          </Badge>

          <div className="col-span-3 ml-2 flex flex-col justify-between">
            <h3>{item.title}</h3>
            <p>Size: {item.size}</p>
          </div>
          <div className="col-span-1">
            <p>{item.price.toLocaleString()}đ</p>
          </div>
        </div>
      );
    });
  };

  // const renderCityOptions = useMemo(() => {
  //   return cityList.data.map((item) => {
  //     return (
  //       <Select.Option key={item.id} value={item.code}>
  //         {item.name}
  //       </Select.Option>
  //     );
  //   });
  // }, [cityList.data]);

  // const renderDistrictOptions = useMemo(() => {
  //   return districtList.data.map((item) => {
  //     return (
  //       <Select.Option key={item.id} value={item.code}>
  //         {item.name}
  //       </Select.Option>
  //     );
  //   });
  // }, [districtList.data]);

  // const renderWardListOptions = useMemo(() => {
  //   return wardList.data.map((item) => {
  //     return (
  //       <Select.Option key={item.id} value={item.code}>
  //         {item.name}
  //       </Select.Option>
  //     );
  //   });
  // }, [wardList.data]);
  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];

  return (
    <div className="mt-[100px] w-[1200px] grid grid-cols-3">
      <div className="col-span-2 flex flex-wrap justify-center">
        <div className="w-full flex justify-center pb-2">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/checkout_logo.png?1683881952485"
            alt=""
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
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
                  label="Họ và tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên",
                    },
                  ]}
                >
                  <Input className="py-[10px] rounded-sm" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="numberPhone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ]}
                >
                  <Input className="py-[10px] rounded-sm" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                  ]}
                >
                  <Input className="py-[10px] rounded-sm" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn tỉnh thành",
                    },
                  ]}
                >
                  <Select
                    className="Tinh"
                    classNamePrefix="select"
                    defaultValue={""}
                    // isDisabled={isDisabled}

                    isSearchable={isSearchable}
                    name="city"
                    options={cityList.data}
                    onChange={(value) => {
                      dispatch(
                        getDistrictListAction({ cityCode: value.value })
                      );
                      setIsDisabledDistrict(false);
                      setSelectedOptionDistrict(null);
                      setSelectedOptionWard(null);
                      setIsDisabledWard(true);
                      setSelectedOptionCity(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Quận huyện"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn quận huyện",
                    },
                  ]}
                >
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={selectedOptionDistrict}
                    value={selectedOptionDistrict}
                    isDisabled={isDisabledDistrict}
                    isSearchable={isSearchable}
                    name="district"
                    options={districtList.data}
                    onChange={(value) => {
                      dispatch(
                        getWardListAction({ districtCode: value.value })
                      );
                      setIsDisabledWard(false);
                      setSelectedOptionWard(null);
                      setSelectedOptionDistrict(value);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Phường xã"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn phường xã",
                    },
                  ]}
                >
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={selectedOptionWard}
                    value={selectedOptionWard}
                    isDisabled={isDisabledWard}
                    isSearchable={isSearchable}
                    name="Ward"
                    options={wardList.data}
                    onChange={(value) => {
                      setSelectedOptionWard(value);
                    }}
                  />
                </Form.Item>
                {/* <Select
                    className="selectCheckoutBox"
                    onChange={(value) => {
                      dispatch(getDistrictListAction({ cityCode: value }));
                      checkoutForm.setFieldsValue({
                        districtCode: undefined,
                        wardCode: undefined,
                      });
                    }}
                  >
                    {renderCityOptions}
                  </Select> */}

                {/* <Form.Item
                  label="Quận/Huyện"
                  name="districtCode"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select
                    onChange={(value) => {
                      dispatch(getWardListAction({ districtCode: value }));
                      checkoutForm.setFieldsValue({
                        wardCode: undefined,
                      });
                    }}
                    disabled={!checkoutForm.getFieldValue("cityCode")}
                  >
                    {renderDistrictOptions}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Phường/Xã"
                  name="wardCode"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select
                    disabled={!checkoutForm.getFieldValue("districtCode")}
                  >
                    {renderWardListOptions}
                  </Select>
                </Form.Item> */}
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
                >
                  <Input className="py-[10px] rounded-sm" />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-span-1">
            <div className="mb-2">
              <h4 className="text-[20px] font-bold">Vận chuyển</h4>
            </div>
            <div>20.0000đ</div>
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-[#e7e8fc] p-4">
        <div className="pb-3 border-b-[1px] border-solid border-[white] ">
          <h4 className="text-[20px] font-bold">
            Đơn hàng ({cartList.data.length} sản phẩm){" "}
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
            <div> {total > 500000 ? "-" : "20.000đ"}</div>
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
              className="bg-[orange] w-[40%] h-[48px] text-[white] rounded-sm"
              onClick={() => checkoutForm.handleSubmitCheckoutForm()}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
