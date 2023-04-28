import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { loginAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function LoginPage() {
  const [loginForm] = Form.useForm();

  const { loginData } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: index.jsx:15 ~ LoginPage ~ loginData:", loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useMemo(() => {
    localStorage.getItem("accessToken");
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
          navigate(
            role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME
            //tra ve trang truoc do?
          ),
      })
    );
  };

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <S.LoginWrapper className="w-full bg-[url(https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/bg_login.jpg?1682348011396)]">
      <S.LoginContainer>
        <h3>Login</h3>
        <Form
          form={loginForm}
          name="loginForm"
          layout="vertical"
          onFinish={(values) => handleLogin(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <S.ButtonCustom
            // type="primary"
            htmlType="submit"
            block
            className="bg-[#fcaf17] hover:text-white "
          >
            Submit
          </S.ButtonCustom>
        </Form>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
}

export default LoginPage;
