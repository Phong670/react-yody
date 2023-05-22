import { useEffect, useState } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";

import { ROUTES } from "../../../constants/routes";
import { useRef } from "react";
import { REQUEST } from "../../../redux/constants";

import { Button, Table, Collapse } from "antd";

import moment from "moment";

import { getOrderList } from "../../../redux/actions";
import { logoutAction } from "../../../../src/redux/actions";
import { Fragment } from "react";

function Orders() {
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: index.jsx:20 ~ Orders ~ userInfo:", userInfo);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    !userInfo.data.id &&
      navigate({
        pathname: generatePath(ROUTES.USER.LOGIN),
        search: `ReturnUrl=account/orders`,
      });
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      console.log("ddang nhap");
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);
  let orderListFinalClone = [];
  orderList.data.map((item, index) => {
    orderListFinalClone.push({
      ...item,
      addressFinal:
        item.address +
        ", " +
        item.ward.label +
        ", " +
        item.district.label +
        ", " +
        item.city.label,
    });
  });

  const renderOrderList = () => {
    return orderListFinalClone.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="w-full flex flex-wrap justify-between ">
            <div className="w-full flex justify-start flex-nowrap p-2 px-4 bg-[#e1e1e1]">
              <div className="w-[165px] ">Đơn hàng</div>
              <div className="flex flex-1 text-[orange] hover:cursor-pointer">
                {item.idOrder}
              </div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Ngày đặt hàng</div>
              <div className="flex flex-1">
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Địa chỉ</div>
              <div className="flex flex-1">{item.addressFinal}</div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Giá trị đơn hàng</div>
              <div className="flex flex-1">
                {item.totalPrice.toLocaleString()}đ
              </div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Tình trạng</div>
              <div className="flex flex-1">{item.status}</div>
            </div>
            <div
              className="w-full flex justify-center text-[blue] my-2 cursor-pointer"
              onClick={() => {
                console.log(item);
                navigate(
                  {
                    pathname: generatePath(ROUTES.USER.ORDERED_DETAIL),
                  },
                  {
                    state: {
                      data: { ...item },
                    },
                  }
                );
              }}
            >
              Xem chi tiết đơn hàng
            </div>
          </div>
        </Fragment>
      );
    });
  };

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "idOrder",
      key: "idOrder",
      render: (idOrder) => (
        <button className="text-[orange] ">{idOrder}</button>
      ),
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text.toLocaleString()}đ`,
    },
    {
      title: "Địa chỉ",
      dataIndex: "addressFinal",
      key: "addressFinal",
      render: (text) => text,
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => status,
    },
  ];

  return (
    <div className="w-full xxs:mt-[-40px] bg-[#f8f8f8] flex justify-center pb-4">
      <div className="w-[1200px]">
        <div className=" flex justify-be items-center flex-wrap flex-col mb-4 lg:mt-[125px] xxs:mt-[80px]">
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
          <div className="text-[orange]">ĐƠN HÀNG CỦA TÔI</div>
        </div>
        <div className="w-full grid lg:grid-cols-4 gap-4">
          <div className="w-full p-4 xxs:block lg:hidden bg-[white]">
            <div className="w-full  pb-2 xxs:flex lg:hidden bg-[white] text-[orange] justify-between flex-nowrap">
              <p className="w-[60%]"> ĐƠN HÀNG CỦA TÔI</p>
              <p className="w-[30%] flex ">{orderList.data.length} đơn hàng</p>
            </div>
            {renderOrderList()}
          </div>
          <div className="lg:col-span-1  w-full bg-[white] justify-start">
            <div className="w-full p-4 ">
              <div className="flex justify-center items-center flex-wrap flex-col gap-3 ">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1683881952485"
                  alt=""
                />
                <p>{userInfo.data.fullName}</p>
                <button
                  className="bg-[orange] p-1 px-4 rounded-[999px] text-[white]"
                  onClick={() => {
                    dispatch(logoutAction());
                    navigate(ROUTES.USER.HOME);
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start ">
              <Link
                className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]"
                to={generatePath(ROUTES.USER.ACCOUNT)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_1.svg"
                  alt=""
                />
                Tài khoản của tôi
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3 bg-[#FEEEEA] text-[orange]">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_2_hover.svg"
                  alt=""
                />
                Đơn hàng của tôi
              </Link>
              <Link
                className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]"
                to={generatePath(ROUTES.USER.CHANGE_PASSWORD)}
              >
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_3_hover.svg"
                  alt=""
                />
                Đổi mật khẩu
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3 hover:bg-[#FEEEEA] hover:text-[orange]">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_6.svg"
                  alt=""
                />
                Sản phẩm yêu thích
              </Link>
            </div>
          </div>

          <div className="col-span-3 xxs:hidden lg:block">
            <div className="w-full justify-between flex py-4 px-3 bg-[white]">
              <h4 className="text-[orange] ">ĐƠN HÀNG CỦA TÔI</h4>
              <p className="text-[orange] ">{orderList.data.length} đơn hàng</p>
            </div>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    navigate(
                      {
                        pathname: generatePath(ROUTES.USER.ORDERED_DETAIL),
                      },
                      {
                        state: {
                          data: { ...record },
                        },
                      }
                    );
                  }, // click row
                  onDoubleClick: (event) => {}, // double click row
                  onContextMenu: (event) => {}, // right button click row
                  onMouseEnter: (event) => {}, // mouse enter row
                  onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
              className="w-[100%] cursor-pointer"
              columns={tableColumns}
              dataSource={orderListFinalClone}
              rowKey="id"
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orders;
