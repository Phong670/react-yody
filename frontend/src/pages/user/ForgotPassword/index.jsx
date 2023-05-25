import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, generatePath } from "react-router-dom";
import axios from "axios";
import { uid } from "uid";
import moment from "moment";

import { Form, Input, notification } from "antd";
import { forgotPasswordAction } from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";
import { emailForgotPasswordTemp } from "../../../constants/emailForgotPasswordTemp";
import * as S from "./styles";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPasswordData } = useSelector((state) => state.auth);

  const [sendEmailForgotPasswordForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();

  const [showInputNewPassPage, setShowInputNewPassPage] = useState(false);
  const [showErrorEmailFail, setShowErrorEmailFail] = useState("");
  const [showFailToken, setShowFailToken] = useState("");
  const [id, setId] = useState("");

  // check sign in
  const accessToken = useMemo(() => {
    localStorage.getItem("accessToken");
  }, []);

  // ant notif
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithSentEmail = (type) => {
    api[type]({
      message: "Chúng tôi đã gửi một mã thay đổi mật khẩu đến email của bạn",
    });
  };

  //show error when server users return error (password short,...)
  useEffect(() => {
    if (forgotPasswordData.error) {
      changePasswordForm.setFields([
        {
          name: "password",
          errors: [forgotPasswordData.error],
        },
      ]);
    }
  }, [forgotPasswordData.error]);
  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;

  const handleSendToken = (values) => {
    //creat token and tokenExpirationTime
    const calculateExpirationTime = () => {
      const expirationDurationHours = 24 * 60 * 60 * 1000; // Set the expiration duration in hours
      let createDate = moment().valueOf();
      let expirationTime = createDate + expirationDurationHours;
      return expirationTime;
    };

    let token = {
      token: uid(6),
    };
    let tokenExpirationTime = {
      tokenExpirationTime: calculateExpirationTime(),
    };
    //search id and patch token and tokenExpirationTime
    axios

      .get(`http://localhost:4000/users?email=${values.email}`)
      .then((res) => {
        let dataSendEmail = {
          name: res.data[0].fullName,
          token: token.token,
        };

        setId(res.data[0].id);
        axios.patch(`http://localhost:4000/users/${res.data[0].id}`, token);
        axios
          .patch(
            `http://localhost:4000/users/${res.data[0].id}`,
            tokenExpirationTime
          )
          .then((res) => {
            openNotificationWithSentEmail("success");
            setShowInputNewPassPage(true);

            changePasswordForm.setFieldsValue({
              token: "",
              password: "",
            });
            // send email
            let data = JSON.stringify({
              email: res.data.email,
              subject: "Mã thay đổi mật khẩu ",
              content: emailForgotPasswordTemp(dataSendEmail),
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
          });
      })
      .catch((err) => {
        console.log("loi roi");
        setShowErrorEmailFail("Email chưa đăng ký!");
      });
  };
  const handChangePassword = (values) => {
    let now = moment().valueOf();
    // get token at API
    axios.get(`http://localhost:4000/users/${id}`).then((res) => {
      // check token and tokenExpirationTime
      if (
        res.data.token === values.token &&
        now < res.data.tokenExpirationTime
      ) {
        dispatch(
          forgotPasswordAction({
            data: {
              id: id,
              password: values.password,
            },
            callback: (success) => {
              console.log("calllback");
              success === "success"
                ? navigate({
                    pathname: generatePath(ROUTES.USER.LOGIN),
                    search: `changePassWord=true`,
                  })
                : setShowFailToken("Thay đổi mật khẩu không thành công");
            },
          })
        );
      } else setShowFailToken("Mã mã thay đổi mật khẩu không đúng");
    });
  };
  return (
    <S.LoginWrapper className=" lg:mt-[35px] xxs:mt-[0px]">
      {contextHolder}
      <S.LoginContainer className="max-w-[500px] lg:my-[40px] sm:p-[40px] xxs:px-[8px] py-[40px]">
        <div className="w-full flex justify-center flex-wrap gap-4">
          <h6 className="w-full flex justify-center gap-2 xxs:text-[26px] text-[orange]">
            QUÊN MẬT KHẨU
          </h6>
          <p className="text-center font-[400]">
            Nếu bạn quên mật khẩu, vui lòng nhập địa chỉ email đã đăng ký của
            bạn. Chúng tôi sẽ gửi cho bạn một mã để đặt lại mật khẩu.
          </p>
          <Form
            form={sendEmailForgotPasswordForm}
            name="sendEmailForgotPasswordForm"
            layout="vertical"
            onFocus={() => setShowErrorEmailFail("")}
            onFinish={(values) => handleSendToken(values)}
            autoComplete="off"
            className={`w-full p-2 text-[20px] ${
              showInputNewPassPage ? "hidden" : "block"
            }`}
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
            <p className="text-[14px] text-[red] mb-3 mt-[-12px]">
              {showErrorEmailFail}
            </p>

            <div className="w-full flex gap-3 mt-[40px]">
              <S.ButtonCustom
                // type="primary"
                htmlType="cancel"
                block
                className="bg-[#FEEEEA]  hover:!text-orange text-[orange]"
                onClick={() => navigate(ROUTES.USER.LOGIN)}
              >
                HỦY
              </S.ButtonCustom>
              <S.ButtonCustom
                // type="primary"
                htmlType="submit"
                block
                className="bg-[#fcaf17]  hover:!text-white text-[white] "
              >
                TIẾP TỤC
              </S.ButtonCustom>
            </div>
          </Form>
          <Form
            form={changePasswordForm}
            name="changePasswordForm"
            layout="vertical"
            onFocus={() => setShowFailToken("")}
            onFinish={(values) => handChangePassword(values)}
            autoComplete="off"
            className={`w-full p-2 text-[20px] ${
              showInputNewPassPage ? "block" : "hidden"
            }`}
          >
            <Form.Item
              label="Mã thay đổi mật khẩu"
              name="token"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng nhập mã thay đổi mật khẩu được gửi về email",
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
            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập xác nhậN mật khẩu",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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
            <p className="text-[14px] text-[red] mb-3 mt-[-12px]">
              {showFailToken}
            </p>

            <div className="w-full flex gap-3">
              <S.ButtonCustom
                // type="primary"
                htmlType="cancel"
                block
                className="bg-[#FEEEEA]  hover:!text-orange text-[orange]"
                onClick={() => navigate(ROUTES.USER.LOGIN)}
              >
                HỦY
              </S.ButtonCustom>
              <S.ButtonCustom
                // type="primary"
                form="changePasswordForm"
                htmlType="submit"
                block
                className="bg-[#fcaf17]  hover:!text-white text-[white] "
              >
                THAY ĐỔI
              </S.ButtonCustom>
            </div>
          </Form>
        </div>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
}

export default ForgotPassword;
