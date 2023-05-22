import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { Link, generatePath } from "react-router-dom";
import qs from "qs";
import { notification } from "antd";

import { loginAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  console.log("🚀 ~ file: index.jsx:16 ~ LoginPage ~ search:", search);
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  console.log("🚀 ~ file: index.jsx:18 ~ LoginPage ~ query:", query);

  const { loginData } = useSelector((state) => state.auth);
  const [loginForm] = Form.useForm();

  const accessToken = useMemo(() => {
    localStorage.getItem("accessToken");
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithSuccess = (type) => {
    api[type]({
      message: "Đổi mật khẩu thành công",
    });
  };

  useEffect(() => {
    query.changePassWord === "true" && openNotificationWithSuccess("success");
  }, []);
  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: (role) =>
          query.ReturnUrl === "account/orders"
            ? navigate(ROUTES.USER.ORDERS)
            : navigate(
                role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME
                //tra ve trang truoc do?
              ),
      })
    );
  };

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <S.LoginWrapper className=" lg:mt-[35px] xxs:mt-[40px]">
      {contextHolder}
      <S.LoginContainer className="max-w-[500px] lg:my-[40px] sm:p-[40px] xxs:px-[8px] py-[40px]">
        <div className="w-full flex justify-center flex-wrap gap-4">
          <h6 className="w-full flex justify-center gap-2 xxs:text-[18px]">
            Chào mừng bạn đến với Yody!
          </h6>
          <h6 className="w-full flex justify-center gap-2 xxs:text-[26px]">
            ĐĂNG <p className="text-[orange]">NHẬP</p>
          </h6>
          <Form
            form={loginForm}
            name="loginForm"
            layout="vertical"
            onFinish={(values) => handleLogin(values)}
            autoComplete="off"
            className="w-full p-2 text-[20px]"
          >
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
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password className="py-[10px] rounded-sm" />
            </Form.Item>
            <S.ButtonCustom
              // type="primary"
              htmlType="submit"
              block
              className="bg-[#fcaf17]  hover:text-white "
            >
              Đăng nhập
            </S.ButtonCustom>
          </Form>
          <div
            className="w-full flex justify-center flex-wrap gap-2 xxs:text-[16px]"
            onClick={() => {
              navigate(ROUTES.USER.REGISTER);
            }}
          >
            Bạn chưa có tài khoản?{" "}
            <p className="text-[orange] hover:cursor-pointer">Đăng ký ngay</p>
          </div>
        </div>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
}

export default LoginPage;
