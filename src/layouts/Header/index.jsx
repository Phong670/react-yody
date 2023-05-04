import * as S from "./styles";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import {
  BsSearch,
  BsGeoAltFill,
  BsCart3,
  BsTelephoneFill,
  BsPersonCircle,
  BsGenderFemale,
  BsGenderMale,
  BsCollectionFill,
  BsShopWindow,
} from "react-icons/bs";
import {
  AiOutlineMenu,
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";

import { logoutAction } from "../../redux/actions";
import SearchBox from "./searchBox";
import { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { AudioOutlined } from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("NỮ", "sub1", <BsGenderFemale />, [
    getItem("Áo", "5"),
    getItem("Quần", "6"),
    getItem("Váy", "7"),
    getItem("Đồ thể thao", "8"),
  ]),

  getItem("NAM", "sub2", <BsGenderMale />, [
    getItem("Áo", "1"),
    getItem("Quần", "2"),
    getItem("Phụ kiện", "3"),
    getItem("Đồ thể thao", "4"),
  ]),
  getItem("BỘ SƯU TẬP", "sub3", <BsCollectionFill />, [
    getItem("Đồ thể thao đa năng", "10"),
    getItem("Xuân/Hè 2023", "11"),
    getItem("Polo Yody - Everyday Wear", "12"),
    getItem("Thời Trang Công Sở", "13"),
  ]),
  getItem("VỀ YODY", "sub4", <BsShopWindow />, [
    getItem("Ưu đãi & Chính sách", "14"),
    getItem("Câu chuyện & Nhân vật", "15"),
  ]),
];
const rootSubmenuKeys = ["sub1", "sub2"];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);

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
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onClick = (e) => {
    console.log("🚀 ~ file: index.jsx:231 ~ onClick ~ e:", e);
    e.key < 10 &&
      navigate({
        pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
          subCategoryId: [e.key],
        }),
      });
    setOpenMenu(false);
  };
  const { Search } = Input;
  const onSearch = (value) => {
    navigate({
      pathname: generatePath(ROUTES.USER.SEARCH, {
        searchKey: searchKey,
      }),
    });
    setOpenSearchBox(false);
  };

  return (
    <S.Header className="fixed top-[0px] z-10 ">
      <S.HeaderContainer className="xxs:hidden lg:flex mb-[15px]">
        <S.HeaderTop className="w-full flex justify-between items-center">
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

            <span className="text-[#11006F]  flex justify-around items-center xl:flex xxs:hidden">
              - Đặt hàng gọi
            </span>
            <a
              href=""
              className="xl:flex xxs:hidden justify-around items-center gap-1 text-[#11006F]   "
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
            <span className="mr-10 text-[16px]">Giỏ Hàng</span>
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
                <div className="text-[14px]">
                  <Link to={generatePath(ROUTES.USER.REGISTER)}>Đăng Ký</Link>
                  <span className="m-2">/</span>
                  <Link to={generatePath(ROUTES.USER.LOGIN)}>Đăng Nhập</Link>
                </div>
              )}
            </div>
          </div>
        </S.HeaderBottom>
      </S.HeaderContainer>
      <div className="w-full lg:hidden xxs:flex justify-around items-center py-2  xxs:px-0 xs:px-4 bg-white  ">
        <div className="w-[30px]" onClick={() => setOpenMenu(true)}>
          <AiOutlineMenu className="text-[20px]" />
        </div>
        {openMenu && (
          <div className="w-full h-[100vh] fixed left-[0px] top-0  z-100 bg-white p-4">
            <div className="flex justify-between mb-2">
              <div>Menu</div>
              <AiOutlineClose
                className="cursor-pointer text-[24px]"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onClick={onClick}
              style={{
                width: "100%",
                border: "none",
                padding: "none",
              }}
              items={items}
            />
          </div>
        )}
        <Link
          className="flex-1 flex justify-center "
          to={ROUTES.USER.HOME}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/logo.svg?1683190865643"
            alt=""
          />
        </Link>
        <div className="w-[50px] flex gap-3">
          <div className="" onClick={() => setOpenSearchBox(true)}>
            <BsSearch className="text-[20px]" />
          </div>
          {openSearchBox && (
            <div className="fixed right-0 top-0 bg-white w-full h-[100vh] p-4 ">
              <div className="flex justify-between mb-2">
                <div onClick={() => setOpenSearchBox(false)}>
                  <AiOutlineArrowLeft />
                </div>
                <div>Tìm kiếm sản phẩm</div>
              </div>
              <Space direction="vertical" className="w-full mb-2">
                <Search
                  placeholder="Nhập từ khoá tìm kiếm"
                  onSearch={onSearch}
                  onChange={(e) => {
                    setSearchKey(e.target.value.trim());
                    setOpenSearchBox(false);
                  }}
                  style={{
                    width: "100%",
                  }}
                />
              </Space>

              <SearchBox searchKey={searchKey} />
            </div>
          )}

          <div>
            <BsCart3 className="text-[20px]" />
          </div>
        </div>
      </div>
    </S.Header>
  );
}
export default Header;
