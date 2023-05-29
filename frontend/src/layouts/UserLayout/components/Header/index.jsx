import * as S from "./styles";
import { getProductListSearchAction } from "../../../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown, Space, Input, Badge, Drawer, Menu, Modal } from "antd";
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
import { BiMap, BiSupport } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai";
import {
  deleteCartItemAction,
  updateCartItemAction,
  deleteAddNewCard,
} from "../../../../redux/actions";
import { logoutAction } from "../../../../redux/actions";
import SearchBox from "./searchBox";
import { ROUTES } from "../../../../constants/routes";

//function ant menu
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

//ant menu
const items = [
  getItem("NỮ", "sub1", <BsGenderFemale />, [
    getItem("Áo", "5"),
    getItem("Quần", "6"),
    getItem("Váy", "8"),
    getItem("Đồ thể thao", "7"),
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
  const [open, setOpen] = useState(false);
  const [isOpenOneNewCart, setIsOpenOneNewCart] = useState(false);
  // const [goSearchPage, setGoSearchPage] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { oneAddCard } = useSelector((state) => state.cart);
  const [openModalDeleteCartItem, setOpenModalDeleteCartItem] = useState(false);
  //cloneValue
  let totalClone = 0;

  useEffect(() => {
    cartList.data?.map((item) => {
      totalClone = totalClone + item.price * item.quantity;
      setTotal(totalClone);
    });
  }, [cartList.data]);
  useEffect(() => {
    if (oneAddCard.length > 0) {
      setIsOpenOneNewCart(true);
      setTimeout(() => {
        setIsOpenOneNewCart(false);
        dispatch(deleteAddNewCard());
      }, 3000);
    }
    return () => setIsOpenOneNewCart(false);
  }, [oneAddCard]);
  useEffect(() => {
    return () => {
      dispatch(deleteAddNewCard());
      setIsOpenOneNewCart(false);
    };
  }, []);
  const getResultSearch = (value) => {
    dispatch(
      getProductListSearchAction({
        page: 1,
        limit: 5,
        searchKey: value,
      })
    );
  };
  //ant modal showDelete
  const showModalDeleteCartItem = () => {
    setOpenModalDeleteCartItem(true);
  };
  //dropdown
  const male = [
    {
      key: "1",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [1],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Áo
          </div>
        </div>
      ),
    },
    {
      key: "2",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [2],
          }),
        });
      },
      label: (
        <div className="w-[120px]">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Quần
          </div>
        </div>
      ),
    },
    {
      key: "3",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [3],
          }),
        });
      },
      label: (
        <div className="w-[120px]">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Đồ Thể Thao Nam
          </div>
        </div>
      ),
    },
    {
      key: "4",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [4],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Phụ Kiện Nam
          </div>
        </div>
      ),
    },
  ];
  const female = [
    {
      key: "1",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [5],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Áo
          </div>
        </div>
      ),
    },
    {
      key: "2",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [6],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Quần
          </div>
        </div>
      ),
    },
    {
      key: "3",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [8],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Váy
          </div>
        </div>
      ),
    },
    {
      key: "4",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
            subCategoryId: [7],
          }),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Đồ Thể Thao
          </div>
        </div>
      ),
    },
  ];
  const collection = [
    {
      key: "1",
      label: (
        <div className="">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Đồ thể thao đa năng
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Xuân/hè 2023
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Polo Yody - Everyday Wear
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Thời Trang Công Sở
          </Link>
        </div>
      ),
    },
  ];
  const aboutYody = [
    {
      key: "1",
      label: (
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Ưu đãi & Chính sách
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Câu chuyện & Nhân vật
          </Link>
        </div>
      ),
    },
  ];
  const account = [
    {
      key: "0",

      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.ACCOUNT),
        });
      },
      label: (
        <div
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[orange]"
        >
          Tài khoản của tôi
        </div>
      ),
    },
    {
      key: "1",
      onClick: () => {
        navigate({
          pathname: generatePath(ROUTES.USER.CHANGE_PASSWORD),
        });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Thay đổi mật khẩu
          </div>
        </div>
      ),
    },
    {
      key: "2",
      onClick: () => {
        !userInfo.data.id
          ? navigate({
              pathname: generatePath(ROUTES.USER.LOGIN),
              search: `ReturnUrl=account/orders`,
            })
          : navigate({
              pathname: generatePath(ROUTES.USER.ORDERS),
            });
      },
      label: (
        <div className="">
          <div
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[orange]"
          >
            Đơn hàng của tôi
          </div>
        </div>
      ),
    },
    {
      key: "3",
      onClick: () => {
        dispatch(logoutAction());
      },
      label: (
        <a target="_blank" rel="noopener noreferrer" className="flex">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/logout.svg"
            alt=""
          />
          Đăng xuất
        </a>
      ),
    },
  ];
  //function open menu item
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onClick = (e) => {
    e.key < 10 &&
      navigate({
        pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
          subCategoryId: [e.key],
        }),
      });
    onClose();
  };

  //search in mobile

  const onSearch = (value, e) => {
    e.preventDefault();
    if (value.trim()) {
      setSearchKey(value?.trim());
      getResultSearch(value);
      setOpenSearchBox(false);
      setEmpty(true);
      navigate({
        pathname: generatePath(ROUTES.USER.SEARCH, {
          searchKey: searchKey,
        }),
      });
      setSearchKey("");
    }
  };

  const renderListProductCartMini = () => {
    return cartList.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full grid grid-cols-5 gap-2 mb-2 text-[14px] "
        >
          <img
            className="w-[80px] col-span-1  mt-[4px]"
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
            border-solid border-[0.8px] border-[#e9ecef] rounded-l-[4px] text-[24px]`}
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
              onClick={showModalDeleteCartItem}
            >
              <RiDeleteBinLine className="text-[20px] cursor-pointer" />
            </div>
            <Modal
              open={openModalDeleteCartItem}
              footer={null}
              closable={null}
              padding={null}
              bodyStyle={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              className="!w-[410px] !p-0 modalDeleteCartItem"
            >
              <div className="w-full">
                <p className="text-[red] w-full flex justify-center text-[16px]">
                  Bạn có chắc chắn muốn xoá sản phẩm này?
                </p>
                <p className=" w-full flex justify-center">{item.title}</p>
              </div>
              <div className="w-full flex mt-3">
                <div
                  className="bg-[orange] w-[50%] flex justify-center text-[white] p-[4px] rounded-sm cursor-pointer"
                  onClick={() =>
                    dispatch(
                      deleteCartItemAction({ id: item.id, size: item.size })
                    )
                  }
                >
                  Đồng ý
                </div>
                <button
                  className="w-[50%] flex justify-center p-[4px] rounded-sm cursor-pointer border-[1px]  !border-[#F2F2F2]"
                  onClick={() => setOpenModalDeleteCartItem(false)}
                >
                  Không
                </button>
              </div>
            </Modal>
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
  //ant Drawer
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const renderOneProductAddCartDesktop = () => {
    return (
      <S.BoxAddCart
        className={`w-[300px] fixed   ${
          isOpenOneNewCart ? "visible opacity-100" : "invisible opacity-0"
        }  rounded-md p-3   z-10  flex flex-col items-center justify-center flex-nowrap`}
      >
        <div className="w-full p-2 mt-[-10px] text-[18px]  flex justify-center border-b-[0.8px] border-[#d9d9d9] mb-2">
          Đã thêm vào giỏ hàng
        </div>

        <div>
          <div className="w-full grid grid-cols-3 gap-2 mb-4 text-[14px] ">
            <img
              className="w-[100px] col-span-1 rounded-[4px] mt-[4px]"
              src={oneAddCard[0]?.image}
              alt="anh "
            />
            <div className="w-[100%] col-span-2 flex flex-wrap col justify-between  align-content-between ml-[5px]">
              <div className="hover:text-[orange] w-full ">
                {oneAddCard[0]?.title}
              </div>
              <div className="flex justify-center text-[orange]">
                {oneAddCard[0]?.price?.toLocaleString()}đ
              </div>
              <div className="w-full">Size: {oneAddCard[0]?.size}</div>
              <div className="flex w-full ">
                <div className="flex w-full  gap-0"></div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={generatePath(ROUTES.USER.CART)}
          className="w-full flex justify-center rounded-md p-2 bg-[orange] text-[16px]"
        >
          Xem giỏ hàng
        </Link>
      </S.BoxAddCart>
    );
  };
  const renderOneProductAddCartMobile = () => {
    return (
      <S.BoxAddCart
        className={`xxs:w-[220px] fixed   ${
          isOpenOneNewCart ? "visible opacity-100" : "invisible opacity-0"
        }  rounded-md p-1   z-10  flex flex-col items-center justify-center flex-nowrap`}
      >
        <div className="w-full p-2 pb-1 mt-[-10px] text-[14px]  flex justify-center border-b-[0.8px] border-[#d9d9d9] ">
          Đã thêm vào giỏ hàng
        </div>

        <div className="w-full grid grid-cols-3 gap-2 mb-2 text-[14px] ">
          <img
            className="w-[80px] col-span-1 rounded-[4px] mt-[4px]"
            src={oneAddCard[0]?.image}
            alt="anh "
          />
          <div className="w-[100%] col-span-2 flex flex-wrap col justify-between  align-content-between ml-[5px]">
            <div className="hover:text-[orange] w-full text-[12px]">
              {oneAddCard[0]?.title}
            </div>
            <div className="flex justify-center text-[orange]  text-[12px]">
              {oneAddCard[0]?.price?.toLocaleString()}đ
            </div>
            <div className="w-full">Size: {oneAddCard[0]?.size}</div>
            <div className="flex w-full ">
              <div className="flex w-full  gap-0"></div>
            </div>
          </div>
        </div>

        <Link
          to={generatePath(ROUTES.USER.CART)}
          className="w-[100%] flex justify-center rounded-md p-1 bg-[orange] text-[14px]"
        >
          Xem giỏ hàng
        </Link>
      </S.BoxAddCart>
    );
  };
  return (
    <S.Header className="fixed top-[0px] z-10 ">
      <S.HeaderContainer className="xxs:hidden lg:flex mb-[15px] lg:px-4 xl:px-0">
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
              <form
                onSubmit={(e) => onSearch(searchKey, e)}
                className="z-[999] flex flex-nowrap"
              >
                <S.Input
                  type="text"
                  className="w-[305px] text-[12px]"
                  defaultValue={""}
                  value={searchKey}
                  required
                  placeholder="Nhập nội dung tìm kiếm"
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      setOpenSearchBox(false);
                      setEmpty(false);
                      setSearchKey(e.target.value);
                      getResultSearch(e.target.value.trim());
                    } else {
                      setEmpty(true);
                      setSearchKey(null);
                    }
                  }}
                />
                <S.SearchBtn
                  type="submit"
                  className=" w-[85px] hover:bg-[#f8b021]"
                >
                  <BsSearch className="text-[24px]" />
                </S.SearchBtn>
              </form>
            </div>
            <div className="w-full flex flex-col z-50  bg-[#ffffff] absolute top-[40px] left-0 ">
              <SearchBox
                searchKey={searchKey}
                openSearchBox={openSearchBox}
                setSearchKey={setSearchKey}
                setOpenSearchBox={setOpenSearchBox}
                empty={empty}
                setEmpty={setEmpty}
              />
            </div>
          </S.InputCover>

          <div className="flex justify-around items-center gap-2 ">
            <Link
              href=""
              className="flex justify-around items-center text-center gap-1 text-[#11006F] hover:text-[#FCAF17]"
            >
              <BsGeoAltFill className=" text-[#11006F]" />
              <span className="text-[16px] h-30  flex justify-around items-center">
                Tìm
              </span>
              <span className="mb-[1px] text-[#11006F] text-[19px] h-30px flex justify-around items-center">
                230+
              </span>
              <span>Cửa hàng </span>
            </Link>

            <span className="flex justify-around items-center mb-[0px]  text-[#11006F]">
              <BsTelephoneFill className="mr-1 ml-2 mb-[2px]  text-[#11006F]" />
              18002086
            </span>
            <span className="rounded-full bg-[#FCAF17] px-2 ">Free</span>
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
                <div className="mr-4  hover:text-[orange] hover:cursor-pointer">
                  <Space>Nữ</Space>
                </div>
              </Dropdown>

              <Dropdown
                menu={{
                  items: male,
                }}
                placement="bottomLeft"
                arrow
              >
                <div className="mx-4 hover:text-[orange] hover:cursor-pointer">
                  <Space className="flex justify-center align-content-center">
                    Nam
                  </Space>
                </div>
              </Dropdown>
              <Dropdown
                menu={{
                  items: collection,
                }}
                placement="bottomLeft"
                arrow
              >
                <div className="mx-4 hover:text-[orange] hover:cursor-pointer">
                  <Space className="flex justify-center align-content-center">
                    Bộ sưu tập
                  </Space>
                </div>
              </Dropdown>
              <Dropdown
                menu={{
                  items: aboutYody,
                  style: {
                    width: "200px",
                    flexWWrap: "nowrap",
                  },
                }}
                placement="bottomLeft"
                arrow
              >
                <div className="mx-4 hover:text-[orange] hover:cursor-pointer">
                  <Space className="flex justify-center align-content-center">
                    Về Yody
                  </Space>
                </div>
              </Dropdown>
            </S.Nav>
          </div>
          <div className="text-[10px] flex justify-end items-center w-2/4 relative">
            <div className="mr-2 flex justify-center items-center gap-2 relative group h-[40px]">
              <Badge count={cartList.data.length} size="small">
                <BsCart3 className="text-[24px]" />
              </Badge>
              <p className="mr-10 text-[16px]">Giỏ Hàng</p>
              <div className="absolute top-[40px] right-[250px]  z-[99]">
                {renderOneProductAddCartDesktop()}
              </div>
              <div
                className={` ${
                  cartList?.data.length > 0 ? "group-hover:flex" : "hidden"
                }   w-[477px] hidden  justify-center flex-col items-center bg-white absolute top-[40px] right-[-150px] drop-shadow-md`}
              >
                <img
                  className="absolute top-[-10px] right-[240px]"
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/arrow-cart.png?1683303178082"
                  alt=""
                />
                <div>
                  <div className="p-2 text-[24px] text-white bg-[orange] w-full flex justify-center border-b-[0.8px] border-[#D9D9D9]">
                    Giỏ hàng của bạn
                  </div>
                  <div className="scroll w-full px-3 py-3 max-h-[400px]  overflow-auto">
                    {renderListProductCartMini()}
                  </div>
                  <div className="w-full gap-2 p-4 flex justify-end text-[16px] border-y-[0.8px] border-[#D9D9D9]">
                    Tổng cộng đơn hàng:
                    <p className="text-[red]">{total.toLocaleString()}đ</p>
                  </div>
                  <div className="w-full p-4 flex justify-center">
                    <div
                      onClick={() => {
                        navigate(ROUTES.USER.CART);
                      }}
                      className="bg-[orange] hover:cursor-pointer w-full flex justify-center items-center h-[48px] text-[white] text-[20px] rounded-[4px]"
                    >
                      Xem giỏ hàng
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  cartList?.data.length < 1 ? "group-hover:flex" : "hidden"
                }  w-[400px] h-[200px] hidden justify-center flex-col items-center bg-white absolute top-[40px] right-[-125px] drop-shadow-md`}
              >
                <img
                  className="absolute top-[-10px] right-[200px]"
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/arrow-cart.png?1683303178082"
                  alt=""
                />
                <img
                  className="w-[90px] h-[100px]"
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/blank_cart.svg?1683303155312"
                  alt=""
                />
                <h6 className="text-[20px] my-2">Giỏ hàng của bạn trống</h6>
                <Link
                  className="text-[20px] hover:text-[orange]"
                  to={generatePath(ROUTES.USER.HOME)}
                >
                  Mua ngay
                </Link>
              </div>
            </div>

            <S.Person className="mr-2">
              <BsPersonCircle className="text-[24px]" />
            </S.Person>
            <div>
              {userInfo.data.id ? (
                <div>
                  <Dropdown
                    menu={{
                      items: account,
                    }}
                    placement="bottomRight"
                  >
                    <div className="  hover:cursor-pointer">
                      <div className="flex text-[20px] justify-center align-content-center">
                        {userInfo.data.fullName}
                      </div>
                    </div>
                  </Dropdown>
                </div>
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
                  <Link to={ROUTES.USER.ACCOUNT} onClick={() => onClose()}>
                    Tài khoảng của tôi
                  </Link>
                ) : (
                  <Link
                    to={generatePath(ROUTES.USER.LOGIN)}
                    onClick={() => onClose()}
                  >
                    Đăng Nhập
                  </Link>
                )}
              </div>
              <div
                className="flex w-full justify-start items-center ml-[28px] gap-2"
                onClick={() => {
                  !userInfo.data.id
                    ? navigate({
                        pathname: generatePath(ROUTES.USER.LOGIN),
                        search: `ReturnUrl=account/orders`,
                      })
                    : navigate({
                        pathname: generatePath(ROUTES.USER.ORDERS),
                      });
                  onClose();
                }}
              >
                <BsTruck />
                Đơn hàng của tôi
              </div>
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
              <div className="flex justify-between mb-4">
                <div
                  onClick={() => {
                    setEmpty(true);
                    // setSearchKey(false);
                    setOpenSearchBox(false);
                  }}
                >
                  <AiOutlineArrowLeft />
                </div>
                <div className="flex flex-1 justify-center">
                  Tìm kiếm sản phẩm
                </div>
              </div>

              <div className="flex mb-2">
                <form
                  onSubmit={(e) => onSearch(searchKey, e)}
                  className="z-[999] w-full flex flex-nowrap"
                >
                  <input
                    type="text"
                    className="flex flex-1  
                    border-solid border-[0.8px] 
                    border-[#e9ecef] rounded-l-[4px] 
                    rounded-r-[0px] text-[16px] 
                    py-1 px-2 
                    
                     focus:outline-none focus:border-[orange] 
      "
                    defaultValue={""}
                    value={searchKey}
                    required
                    placeholder="Nhập nội dung tìm kiếm"
                    onChange={(e) => {
                      if (e.target.value.trim() !== "") {
                        setEmpty(false);
                        setSearchKey(e.target.value);
                        getResultSearch(e.target.value.trim());
                      } else {
                        setEmpty(true);
                        setSearchKey(null);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className={`${
                      searchKey?.length > 0 ? "bg-[#FFA500]" : "bg-[#cbc6c6]"
                    } w-[85px] hover:bg-[#f8b021] p-2  flex justify-center rounded-l-[0px] rounded-r-[4px] ml-[-2px]`}
                  >
                    <BsSearch className="text-[24px]" />
                  </button>
                </form>
              </div>
              <div className="flex justify-center w-full">
                <SearchBox
                  searchKey={searchKey}
                  openSearchBox={openSearchBox}
                  setOpenSearchBox={setOpenSearchBox}
                  empty={empty}
                  setEmpty={setEmpty}
                />
              </div>
            </div>
          )}

          <Link
            to={ROUTES.USER.CART}
            className="mr-2 flex justify-center gap-2 z-1"
          >
            <Badge count={cartList.data.length} size="small">
              <BsCart3 className="text-[24px] relative" />
            </Badge>
            <div className="absolute top-[54px] right-[240px]  z-[99]">
              {renderOneProductAddCartMobile()}
            </div>
          </Link>
        </div>
      </div>
    </S.Header>
  );
}
export default Header;
