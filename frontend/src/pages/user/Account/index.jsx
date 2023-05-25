import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";

import { Collapse } from "antd";

import { logoutAction } from "../../../redux/actions";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full bg-[#f8f8f8] flex justify-center  lg:mt-4 xxs:mt-2 text-[14px]">
      <div className="w-[1200px]  mb-8">
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
          <div className="text-[orange] text-[20px]">TÀI KHOẢN</div>
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
                className="w-full flex gap-2 px-4 py-3 bg-[#FEEEEA] text-[orange]"
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
              <Link
                className="w-full flex gap-2 px-4 py-3  hover:bg-[#FEEEEA] hover:text-[orange]"
                to={generatePath(ROUTES.USER.CHANGE_PASSWORD)}
              >
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
                Thông tin cá nhân
              </p>
            </div>
            <div className="px-[40px] py-2">
              <div className="flex flex-nowrap justify-start items-center">
                <p className="">Họ và tên:</p>
                <p className="ml-2">{userInfo.data.fullName}</p>
              </div>
              <div className="flex flex-nowrap justify-start items-center">
                <p className="">Email:</p>
                <p className="ml-2">{userInfo.data.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
