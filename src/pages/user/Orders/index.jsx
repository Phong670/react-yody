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
  console.log("🚀 ~ file: index.jsx:21 ~ Orders ~ orderList:", orderList);
  useEffect(() => {
    if (userInfo.data.id) {
      console.log("ddang nhap");
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  const renderOrderList = () => {
    return orderList.data.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="w-full flex flex-wrap justify-between ">
            <div className="w-full flex justify-start flex-nowrap p-2 px-4 bg-[#e1e1e1]">
              <div className="w-[165px] ">Đơn hàng</div>
              <div className="flex flex-1 text-[orange] hover:cursor-pointer">
                #23{item.id}
              </div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Ngày đặt hàng</div>
              <div className="flex flex-1">
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
            </div>
            <div className="w-full flex justify-start p-2 px-4">
              <div className="w-[165px]">Số lượng sản phẩm</div>
              <div className="flex flex-1">{item.orderDetails.length}</div>
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
            <div>Xem chi tiết đơn hàng</div>
          </div>
        </Fragment>
      );
    });
  };

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (id) => <button>#23{id}</button>,
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderList.data.length} sản phẩm`,
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
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
  const childColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <a>{price}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",

      render: (quantity) => <a>{quantity}</a>,
    },
  ];

  return (
    <div className="w-full bg-[#f8f8f8] flex justify-center pb-4">
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
            / Tài khoản
          </div>
          <div className="text-[orange]">TÀI KHOẢN</div>
        </div>
        <div className="w-full grid lg:grid-cols-4 gap-4">
          <div className="w-[100vw] p-4 xxs:block lg:hidden bg-[white]">
            <div className="w-[100vw] px-4 pb-2 xxs:block lg:hidden bg-[white] text-[orange]">
              ĐƠN HÀNG CỦA TÔI
            </div>
            {renderOrderList()}
          </div>
          <div className="lg:col-span-1 flex flex-wrap w-full bg-[white] justify-start">
            <div className="w-full p-4 ">
              <div className="flex justify-center items-center flex-wrap flex-col gap-3 ">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1683881952485"
                  alt=""
                />
                <p>{userInfo.data.fullName}</p>
                <button
                  className="bg-[orange] p-1 px-4 rounded-[999px] text-[white]"
                  onClick={() => dispatch(logoutAction())}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <Link className="w-full flex gap-2 px-4 py-3">
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
                />{" "}
                Đơn hàng của tôi
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3">
                {" "}
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_3_hover.svg"
                  alt=""
                />{" "}
                Đổi mật khẩu
              </Link>
              <Link className="w-full flex gap-2 px-4 py-3">
                {" "}
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/acc_user_6.svg"
                  alt=""
                />{" "}
                Sản phẩm yêu thích
              </Link>
            </div>
          </div>

          <div className="col-span-3 xxs:hidden lg:block">
            <div className="w-full justify-between flex py-4 px-2 bg-[white]">
              <h4 className="">Đơn hàng của tôi</h4>
              <p className="">{orderList.data.length} đơn hàng</p>
            </div>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    console.log(record);
                  }, // click row
                  onDoubleClick: (event) => {}, // double click row
                  onContextMenu: (event) => {}, // right button click row
                  onMouseEnter: (event) => {}, // mouse enter row
                  onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
              className="w-[100%] "
              columns={tableColumns}
              dataSource={orderList.data}
              rowKey="id"
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="w-[100%]">
                    <Table
                      className="w-[100%]"
                      dataSource={record.orderDetails}
                      columns={childColumns}
                      rowKey="id"
                      pagination={false}
                    />
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orders;
