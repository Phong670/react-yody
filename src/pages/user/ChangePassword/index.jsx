import { useEffect, useState } from "react";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";

import { ROUTES } from "../../../constants/routes";
import { useRef } from "react";
import { REQUEST } from "../../../redux/constants";

import { Button, Table, Collapse } from "antd";

import moment from "moment";
import { changePasswordAction } from "../../../redux/actions";

import { getOrderList } from "../../../redux/actions";
import { logoutAction } from "../../../redux/actions";
import { Fragment } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Form, Input } from "antd";
import * as S from "./styles";

function ChangePassword() {
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("🚀 ~ file: index.jsx:24 ~ OrderedDetail ~ state:", state);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: index.jsx:20 ~ Orders ~ userInfo:", userInfo);
  const { orderList } = useSelector((state) => state.order);
  console.log("🚀 ~ file: index.jsx:21 ~ Orders ~ orderList:", orderList.data);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [changePasswordForm] = Form.useForm();
  const [successPassword, setSuccessPassword] = useState(false);
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
  console.log(
    "🚀 ~ file: index.jsx:46 ~ OrderedDetail ~ screenSize:",
    screenSize
  );
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
        item.ward.label +
        ", " +
        item.district.label +
        ", " +
        item.city.label,
    });
  });
  console.log(
    "🚀 ~ file: index.jsx:33 ~ Orders ~ orderListFinalClone:",
    orderListFinalClone
  );
  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        data: {
          email: userInfo.data.email,
          password: values.password,
        },
        newPassword: {
          password: values.newPassword,
        },
        idUser: userInfo.data.id,
        callback: (success) => {
          console.log("thay doi thanh cong");
          changePasswordForm.resetFields();

          success === "success"
            ? setSuccessPassword(true)
            : setSuccessPassword(false);
        },
      })
    );
  };
  return (
    <div className="w-full bg-[#f8f8f8] flex justify-center lpb-4 lg:mt-4 xxs:mt-2 text-[14px]">
      <div className="w-[1200px]">
        <div className="desktop flex  justify-be items-center flex-wrap flex-col mb-4 lg:mt-[45px] ">
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
          <div className="text-[orange] text-[20px]">ĐỔI MẬT KHẨU</div>
        </div>
        <div className=" w-full grid lg:grid-cols-4 gap-4">
          <div className="xxs:order-2 lg:order-1 slider lg:col-span-1 w-full bg-[white] ">
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
                className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]"
                to={generatePath(ROUTES.USER.ACCOUNT)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_1.svg"
                  alt=""
                />
                Tài khoản của tôi
              </Link>
              <Link
                className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]"
                to={generatePath(ROUTES.USER.ORDERS)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_2_hover.svg"
                  alt=""
                />
                Đơn hàng của tôi
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3 bg-[#FEEEEA] text-[orange]">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_3_hover.svg"
                  alt=""
                />
                Đổi mật khẩu
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_6.svg"
                  alt=""
                />
                Sản phẩm yêu thích
              </Link>
            </div>
          </div>
          <div className="xxs:order-1 lg:order-2 lg:col-span-3 w-full  bg-[white]">
            <div className="w-full px-[40px] py-2 border-b-[1px]  border-[#DDE1EF] flex items-center xxs:flex-wrap lg:flex-nowrap">
              <p className="text-[orange] text-[16px] xxs:w-full lg:w-auto">
                Đổi mật khẩu
              </p>
              <p className="font-[400] lg:ml-2 text-[#7A7A9D] xxs:w-full lg:w-auto">
                (Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác)
              </p>
            </div>
            <div>
              {successPassword ? (
                <div>Thay đổi mật khẩu thành công</div>
              ) : (
                <></>
              )}
              <Form
                form={changePasswordForm}
                name="changePasswordForm"
                layout="vertical"
                onFinish={(values) => handleChangePassword(values)}
                autoComplete="off"
                className="w-full py-2 px-[40px] text-[20px] max-w-[500px]"
              >
                <Form.Item
                  label="Mật khẩu hiện tại"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu hiện tại",
                    },
                  ]}
                >
                  <Input.Password className="py-[10px] rounded-sm" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu mới"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu mới",
                    },
                  ]}
                >
                  <Input.Password className="py-[10px] rounded-sm" />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Xác nhận mật khẩu mới"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập xác nhậN mật khẩu mới",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu chưa trùng nhau")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className="py-[10px] rounded-sm" />
                </Form.Item>
                <Form.Item>
                  <S.ButtonCustom
                    form="changePasswordForm"
                    onClick={() => {
                      changePasswordForm.onFinish();
                    }}
                    // type="primary"
                    htmlType="submit"
                    block
                    className="lg:hidden xxs:block bg-[#fcaf17]  xxs:w-full  hover:text-white "
                  >
                    Lưu
                  </S.ButtonCustom>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="w-full my-[20px] flex justify-end gap-4 px-2 lg:flex xxs:hidden">
          <button
            onClick={() => {
              console.log("ok");
              navigate(generatePath(ROUTES.USER.ACCOUNT));
            }}
            className=" bg-[#FEEEEA] hover:bg-[orange] text-[orange] hover:text-[white] w-[200px] rounded-[8px]"
          >
            Hủy
          </button>
          <S.ButtonCustom
            form="changePasswordForm"
            onClick={() => {
              changePasswordForm.onFinish();
            }}
            // type="primary"
            htmlType="submit"
            block
            className="bg-[#fcaf17]  xxs:!max-w-[200px] xxs:w-full  hover:text-white "
          >
            Lưu
          </S.ButtonCustom>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
