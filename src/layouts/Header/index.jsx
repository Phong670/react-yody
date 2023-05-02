import * as S from "./styles";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import {
  BsSearch,
  BsGeoAltFill,
  BsCart3,
  BsTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/actions";
import SearchBox from "./searchBox";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");

  console.log("🚀 ~ file: index.jsx:25 ~ Header ~ searchKey:", searchKey);
  const { userInfo } = useSelector((state) => state.auth);
  const male = [
    {
      key: "1",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 1 })}
          >
            Áo
          </Link>
        </div>
      ),
    },
    {
      key: "ư",
      label: (
        <div className="w-[120px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 2 })}
          >
            Quần
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="w-[120px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 3 })}
          >
            Đồ Thể Thao Nam
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 4 })}
          >
            Phụ Kiện Nam
          </Link>
        </div>
      ),
    },
  ];
  const female = [
    {
      key: "1",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 5 })}
          >
            Áo
          </Link>
        </div>
      ),
    },
    {
      key: "ư",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 6 })}
          >
            Quần
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 7 })}
          >
            Váy
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="w-[100px]">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 8 })}
          >
            Đồ Thể Thao
          </Link>
        </div>
      ),
    },
  ];
  const account = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Tài khoản của tôi
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Thay đổi mật khẩu
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      onClick: () => {
        console.log("dang xuat ");
        dispatch(logoutAction());
      },
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          // to={generatePath(ROUTES.USER.PRODUCT_LIST, { subCategoryId: 5 })}
        >
          Đăng xuất
        </Link>
      ),
    },
  ];

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.HeaderTop className="w-full flex justify-between items-center ">
          <Link
            to={ROUTES.USER.HOME}
            className="logo"
            style={{ cursor: "pointer" }}
          >
            <img src="//bizweb.dktcdn.net/100/438/408/themes/899432/assets/logo.svg?1678786925300"></img>
          </Link>
          <S.InputCover className=" ml-4 relative">
            <div className="flex">
              <S.Input
                type="text"
                className="w-[305px]"
                onChange={(e) => {
                  setSearchKey(e.target.value.trim());
                }}
              />
              <S.SearchBtn className=" w-[85px] hover:bg-[#f8b021]">
                <BsSearch className="text-[24px]" />
              </S.SearchBtn>
            </div>
            <div className="w-full flex flex-col z-50  bg-[#f9f6f6] absolute top-[40px] left-0 ">
              <SearchBox searchKey={searchKey} />
            </div>
          </S.InputCover>

          <div className="flex justify-around items-center gap-2 ">
            <a
              href=""
              className="flex justify-around items-center text-center gap-1 text-[#11006F] hover:text-[#FCAF17]"
            >
              <BsGeoAltFill className=" text-[#11006F]" />
              <span className="text-[16px] h-30  flex justify-around items-center">
                Tìm
              </span>
              <span className="text-[#11006F] text-[19px] h-30px flex justify-around items-center">
                230+
              </span>
              <span>Cửa hàng </span>
            </a>
            <a href="" className="flex justify-around items-center">
              <BsTelephoneFill className="mr-1 text-[#11006F]" /> 18002086
            </a>
            <span className="rounded-full bg-[#FCAF17] px-2 ">Free</span>
            <span className="">-</span>
            <span className="text-[#11006F]  flex justify-around items-center">
              Đặt hàng gọi
            </span>
            <a
              href=""
              className="flex justify-around items-center ml-4 text-[#11006F]"
            >
              <BsTelephoneFill /> 02499986999
            </a>
          </div>
        </S.HeaderTop>
        <S.HeaderBottom className="flex justify-center items-center w-full">
          <div className="flex justify-start items-center w-3/5">
            <S.Nav className="h-full mb-8">
              <Dropdown
                menu={{
                  items: female,
                }}
                placement="bottomLeft"
                arrow
              >
                <div className="w-[80px]">
                  <Space>
                    Nữ
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>

              <Dropdown
                menu={{
                  items: male,
                }}
                placement="bottomLeft"
                arrow
              >
                <div className="w-[80px]">
                  <Space className="flex justify-center align-content-center">
                    Nam
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </S.Nav>
          </div>
          <div className="text-[10px] flex justify-end items-center w-2/4">
            <S.Cart className="mr-2">
              <BsCart3 className="text-[24px]" />
            </S.Cart>
            <span className="mr-10 text-[18px]">Giỏ Hàng</span>
            <S.Person className="mr-2">
              <BsPersonCircle className="text-[24px]" />
            </S.Person>
            <div>
              {userInfo.data.id ? (
                <Link>
                  <Dropdown
                    menu={{
                      items: account,
                    }}
                    placement="bottomRight"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>{userInfo.data.fullName}</Space>
                    </a>
                  </Dropdown>
                </Link>
              ) : (
                <div>
                  <Link to={generatePath(ROUTES.USER.REGISTER)}>Đăng Ký</Link>
                  <span className="m-2">/</span>
                  <Link to={generatePath(ROUTES.USER.LOGIN)}>Đăng Nhập</Link>
                </div>
              )}
            </div>
          </div>
        </S.HeaderBottom>
      </S.HeaderContainer>
    </S.Header>
  );
}
export default Header;
