import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { Link, generatePath } from "react-router-dom";

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
    <S.RegisterWrapper className="w-full lg:mt-[95px] mt-[55px]">
      <S.RegisterContainer className="sm:p-[50px] xxs:p-[8px] lg:my-[40px]">
        <div className="w-full flex justify-center flex-wrap gap-4">
          <h6 className="w-full flex justify-center gap-2 xxs:text-[18px]">
            Chào mừng bạn đến với Yody!
          </h6>
          <h6 className="w-full flex justify-center gap-2 xxs:text-[26px]">
            ĐĂNG <p className="text-[orange]">KÝ</p>
          </h6>
          <Form
            form={registerForm}
            name="registerForm"
            layout="vertical"
            onFinish={(values) => handleRegister(values)}
            autoComplete="off"
            className="w-full p-2 text-[20px] max-w-[500px]"
          >
            <Form.Item
              label="Họ và Tên"
              name="fullName"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập tên!",
                },
              ]}
            >
              <Input className="py-[10px] rounded-sm " />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
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
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password className="py-[10px] rounded-sm" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập xác nhậN mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu chưa trùng nhau!")
                    );
                  },
                }),
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
          <Link
            className="w-full flex justify-center flex-wrap gap-2 xxs:text-[16px]"
            to={generatePath(ROUTES.USER.LOGIN)}
          >
            Bạn đã có tài khoản?
            <p className="text-[orange] hover:cursor-pointer">Đăng nhập ngay</p>
          </Link>
        </div>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
}

export default RegisterPage;
