import * as S from "./styles";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input, Badge, message, Drawer } from "antd";
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
  BsTruck,
} from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";

import { BiMap, BiSupport } from "react-icons/bi";
import {
  AiOutlineMenu,
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "../../redux/actions";

import { logoutAction } from "../../redux/actions";
import SearchBox from "./searchBox";

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
  const { cartList } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  let totalClone = 0;

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
    onClose();
  };

  const { Search } = Input;
  const onSearch = (value) => {
    console.log("🚀 ~ file: index.jsx:275 ~ onSearch ~ value:", value);
    if (value) {
      setOpenSearchBox(false);
      navigate({
        pathname: generatePath(ROUTES.USER.SEARCH, {
          searchKey: searchKey,
        }),
      });
      setSearchKey(false);
    } else warning();
  };
  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Vui lòng nhập nội dung tìm kiếm",
    });
  };
  useEffect(() => {
    cartList.data?.map((item) => {
      totalClone = totalClone + item.price * item.quantity;
      setTotal(totalClone);
    });
  }, [cartList.data]);
  const renderListProductCartMobile = () => {
    return cartList.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full grid grid-cols-5 gap-2 mb-4 text-[14px] "
        >
          <img
            className="w-[80px] col-span-1 rounded-[4px] mt-[4px]"
            src={item.image}
            alt="anh "
          />
          <div className="w-[100%] col-span-3 flex flex-wrap col justify-between  align-content-between ml-[5px]">
            <Link
              className="hover:text-[orange] w-full "
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              {item.title}
            </Link>
            <div className="flex justify-center text-[orange]">
              {item.price.toLocaleString()}đ
            </div>
            <div className="w-full">Size: {item.size}</div>
            <div className="flex w-full ">
              <div className="flex w-full  gap-0">
                <div className="flex justify-center gap-0">
                  <button
                    className={`w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center ${
                      item.quantity === 1 ? "bg-[#d2d0d0] " : "bg-[#ffffff]"
                    }  
            order-solid border-[0.8px] border-[#e9ecef] rounded-l-[4px] text-[24px]`}
                    onClick={() => {
                      item.quantity !== 1 &&
                        dispatch(
                          updateCartItemAction({
                            id: item.id,
                            size: item.size,
                            quantity: item.quantity - 1,
                          })
                        );
                    }}
                  >
                    -
                  </button>
                  <div className="w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center order-solid border-[0.8px] border-[#e9ecef] text-[16px]">
                    {item.quantity}
                  </div>
                  <button
                    className="w-[27px] h-[26px] text-[#62676D] leading-[24px] font-[inherit] flex justify-center items-center  rounded-r-[4px] order-solid border-[0.8px] border-[#e9ecef] text-[24px]"
                    onClick={() => {
                      dispatch(
                        updateCartItemAction({
                          id: item.id,
                          size: item.size,
                          quantity: item.quantity + 1,
                        })
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between items-end ">
            <div
              className="w-full flex justify-end items-end pb-2"
              onClick={() =>
                dispatch(deleteCartItemAction({ id: item.id, size: item.size }))
              }
            >
              <RiDeleteBinLine className="text-[20px] cursor-pointer" />
            </div>
            <div className="flex  justify-center flex-nowrap gap-2 ">
              <p className="w-[80px]"> Tổng cộng:</p>
              <p className="text-[red]">
                {(item.price * item.quantity).toLocaleString()}đ
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <S.Header className="fixed top-[0px] z-10">
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
                className="w-[305px] text-[12px]"
                value={searchKey === false ? "" : searchKey}
                placeholder="Nhập nội dung tìm kiếm"
                onChange={(e) => {
                  setSearchKey(e.target.value.trim());
                }}
              />
              <S.SearchBtn
                className=" w-[85px] hover:bg-[#f8b021]"
                onClick={() => {
                  if (searchKey !== "") {
                    navigate({
                      pathname: generatePath(ROUTES.USER.SEARCH, {
                        searchKey: searchKey,
                      }),
                    });
                    setSearchKey(false);
                    setOpenSearchBox(false);
                  }
                }}
              >
                <BsSearch className="text-[24px]" />
              </S.SearchBtn>
            </div>
            <div className="w-full flex flex-col z-50  bg-[#ffffff] absolute top-[40px] left-0 ">
              <SearchBox searchKey={searchKey} setSearchKey={setSearchKey} />
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
            <Link
              to={ROUTES.USER.CART}
              className="mr-2 flex justify-center items-center gap-2 relative group h-[40px]"
            >
              <Badge count={cartList.data.length} size="small">
                <BsCart3 className="text-[24px]" />
              </Badge>
              <p className="mr-10 text-[16px]">Giỏ Hàng</p>
              <div className="group-hover:flex hidden w-[477px]   justify-center flex-col items-center bg-white absolute top-[50px] right-[-150px]">
                <img
                  className="absolute top-[-10px] right-[240px]"
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/arrow-cart.png?1683303178082"
                  alt=""
                />
                <div>
                  <div className="p-4 text-[24px] text-white bg-[orange] w-full flex justify-center border-b-[0.8px] border-[#D9D9D9]">
                    Giỏ hàng của bạn
                  </div>
                  <div className="scroll w-full p-4 max-h-[400px]  overflow-auto">
                    {renderListProductCartMobile()}
                  </div>
                  <div className="w-full gap-2 p-4 flex justify-end text-[16px] border-y-[0.8px] border-[#D9D9D9]">
                    Tổng cộng đơn hàng:
                    <p className="text-[red]">{total.toLocaleString()}đ</p>
                  </div>
                  <div className="w-full p-4 flex justify-center">
                    <Link
                      to={generatePath(ROUTES.USER.CART)}
                      className="bg-[orange] w-full flex justify-center items-center h-[48px] text-[white] text-[20px] rounded-[4px]"
                    >
                      Xem giỏ hàng
                    </Link>
                  </div>
                </div>
              </div>
              <div className="group-hover:flex hidden  justify-center flex-col items-center bg-white absolute top-[50px] right-[-150px]">
                <img
                  className="absolute top-[-10px] right-[240px]"
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/arrow-cart.png?1683303178082"
                  alt=""
                />
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/blank_cart.svg?1683303155312"
                  alt=""
                />
                <p>Giỏ hàng của bạn trống</p>
              </div>
            </Link>

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
                      <Space className="text-[18px] h-[40px] ">
                        {userInfo.data.fullName}
                      </Space>
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
      <div className="w-full lg:hidden xxs:flex justify-around items-center py-2  xxs:px-0 xs:px-6 bg-white  ">
        <div
          className="w-[30px]"
          onClick={() => {
            showDrawer();
          }}
        >
          <AiOutlineMenu className="text-[20px]" />
        </div>
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={open}
          className="max-w-[100%]"
          style={{
            maxWidth: "100%",
          }}
        >
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
          <div>
            <div className="flex flex-wrap gap-3 border-t-2 pt-2">
              <div className="flex w-full justify-start items-center ml-[28px] gap-2">
                <BsPersonCircle />
                {userInfo.data.id ? (
                  <Link>Tài khoảng của tôi</Link>
                ) : (
                  <Link
                    to={generatePath(ROUTES.USER.LOGIN)}
                    onClick={() => onClose()}
                  >
                    Đăng Nhập
                  </Link>
                )}
              </div>
              <Link
                className="flex w-full justify-start items-center ml-[28px] gap-2"
                to={generatePath(ROUTES.USER.CART)}
                onClick={() => onClose()}
              >
                <BsTruck />
                Đơn hàng của tôi
              </Link>
              <div className="flex w-full justify-start items-center ml-[28px] gap-2">
                <BiMap />
                Hệ thống cửa hàng
              </div>
              <div className="flex w-full justify-start items-center ml-[28px] gap-2">
                <BiSupport />
                Chính sách hỗ trợ khách hàng
              </div>
            </div>
          </div>
        </Drawer>

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
          <div
            className=""
            onClick={() => {
              setOpenSearchBox(true);
            }}
          >
            <BsSearch className="text-[20px]" />
          </div>
          {openSearchBox && (
            <div className="fixed right-0 top-0 transition-all  duration-700  ease-linear translate-x-0 bg-white w-full h-[100vh] p-4 z-10 ">
              <div className="flex justify-between mb-2">
                <div
                  onClick={() => {
                    setSearchKey(false);
                    setOpenSearchBox(false);
                  }}
                >
                  <AiOutlineArrowLeft />
                </div>
                <div>Tìm kiếm sản phẩm</div>
              </div>
              {contextHolder}
              <Space direction="vertical" className="w-full mb-2">
                <Search
                  placeholder="Nhập từ khoá tìm kiếm"
                  onSearch={onSearch}
                  onChange={(e) => {
                    setSearchKey(e.target.value.trim());
                  }}
                  style={{
                    width: "100%",
                  }}
                />
              </Space>

              <SearchBox
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                setOpenSearchBox={setOpenSearchBox}
              />
            </div>
          )}

          <Link
            to={ROUTES.USER.CART}
            className="mr-2 flex justify-center gap-2 z-1"
          >
            <Badge count={cartList.data.length} size="small">
              <BsCart3 className="text-[24px]" />
            </Badge>
          </Link>
        </div>
      </div>
    </S.Header>
  );
}
export default Header;
