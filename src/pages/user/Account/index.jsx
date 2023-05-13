import { useEffect, useState } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import { useRef } from "react";
import { REQUEST } from "../../../redux/constants";

import { Button } from "antd";

function Account() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="lg:min-h-[400px] flex justify-be items-center flex-wrap flex-col lg:mt-[125px] xxs:mt-[80px]">
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
          / Tài khoản
        </div>
        <div className="text-[orange]">TÀI KHOẢN</div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <div>
            <div>
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1683881952485"
                alt=""
              />
              <p>Name</p>
              <button>Đăng xuất</button>
            </div>
          </div>
          <Link> Tài khoản của tôi</Link>
        </div>
        <div className="col-span-3">
          <div>Thông tin cá nhân </div>
          <div>
            <div>Họ và tền: </div>
            <div>Địa chỉ email </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
