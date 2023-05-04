import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import * as S from "./styles";

import { Steps, Table, Button, Input, Space } from "antd";
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import { REQUEST } from "../../../redux/constants";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "../../../redux/actions/index";

function Cart() {
  const { cartList } = useSelector((state) => state.cart);
  console.log("🚀 ~ file: index.jsx:14 ~ Cart ~ cartList:", cartList);

  const dispatch = useDispatch();
  const renderListProductCart = () => {
    return cartList.data?.map((item, index) => {
      return (
        <div key={index} className=" w-full grid grid-cols-6 gap-4 mb-2">
          <img src={item.image} alt="anh " />
          <div className="col-span-2 flex flex-wrap col">
            <div>{item.title}</div>
            <div>Size: {item.size}</div>
          </div>
          <div className="flex justify-center">200.000đ</div>
          <div className="flex ">
            <div className="flex w-full h-[38px] justify-center gap-0">
              <div className="flex justify-center gap-0">
                <button
                  className={`w-[56px] h-[48px] ${
                    item.quantity === 1 ? "bg-[#d2d0d0] " : "bg-[#ffffff]"
                  }  
            order-solid border-[1px] border-[#e9ecef] rounded-l-xl text-[24px]`}
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
                <div className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] flex justify-center items-center">
                  {item.quantity}
                </div>
                <button
                  className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] rounded-r-xl text-[24px]"
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
          <div className="flex flex-wrap col justify-center ">
            <div className="w-full text-center">213.123đ</div>
            <div
              className="w-full flex justify-end items-end pb-2"
              onClick={() =>
                dispatch(deleteCartItemAction({ id: item.id, size: item.size }))
              }
            >
              <RiDeleteBinLine className="text-[26px]" />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-[1200px] flex justify-start">
      <div className="w-[774px]">
        <div className="w-full border-b-2">
          Giỏ hàng ({cartList.data.length}) sản phẩm
        </div>
        <div className="w-full grid grid-cols-6 gap-4 mb-2">
          <div className="col-span-3">Sản phẩm</div>
          <div className="flex justify-center">Đơn giá</div>
          <div className="flex justify-center">Số lượng</div>
          <div className="flex justify-center">Tổng tiền</div>
        </div>
        <div className="w-full">{renderListProductCart()}</div>
      </div>
    </div>
  );
}
export default Cart;