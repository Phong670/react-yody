import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction, logoutAction } from "../../../redux/actions";

import { ROUTES } from "../../../constants/routes";

import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Spin } from "antd";
import * as S from "./styles";

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, changePasswordData } = useSelector((state) => state.auth);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#06c4f4" }} spin />
  );
  const [changePasswordForm] = Form.useForm();

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        oldData: {
          email: userInfo.data.email,
          password: values.password,
        },
        newPassword: {
          password: values.newPassword,
        },
        idUser: userInfo.data.id,
        callback(resultSuccess) {
          dispatch(logoutAction());
          resultSuccess === "success" &&
            navigate({
              pathname: generatePath(ROUTES.USER.LOGIN),
              search: `changePassWord=true`,
            });
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
              <div className="text-[red] ml-[40px] mt-2 min-h-[20px]">
                {changePasswordData.error === "Incorrect password"
                  ? "Mật khẩu cũ không chính xác"
                  : changePasswordData.error === "Password is too short"
                  ? "Mật khẩu quá ngắn"
                  : changePasswordData.error}
              </div>

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
                    {changePasswordData.load ? (
                      <Spin indicator={antIcon} className="w-full" />
                    ) : (
                      <p className="w-full">Lưu</p>
                    )}
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
            {changePasswordData.load ? (
              <Spin indicator={antIcon} className="w-full" />
            ) : (
              <p className="w-full">Lưu</p>
            )}
          </S.ButtonCustom>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
