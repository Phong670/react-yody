import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { registerAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function RegisterPage() {
  const [registerForm] = Form.useForm();

  const { registerData } = useSelector((state) => state.auth);
  console.log(
    "🚀 ~ file: index.jsx:15 ~ RegisterPage ~ registerData:",
    registerData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: ["registerData.error"],
        },
      ]);
    }
  }, [registerData.error]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
        },
        callback: () => navigate(ROUTES.LOGIN),
      })
    );
  };

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <S.RegisterWrapper>
      <S.RegisterContainer>
        <h3>Register</h3>
        <Form
          form={registerForm}
          name="registerForm"
          layout="vertical"
          onFinish={(values) => handleRegister(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
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
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
}

export default RegisterPage;
