import { useMemo } from "react";
import { useState } from "react";
import {
  Link,
  useParams,
  generatePath,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";
import * as S from "./styles";
import { useEffect } from "react";

import { addCartListAction } from "../../../redux/actions/index";

function AddToCard({ productDetail }) {
  const [isSizeToCart, setIsSizeToCart] = useState("");
  const [boxSizeWarning, setBoxSizeWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { sizeList } = useSelector((state) => state.size);
  const [quality, setQuality] = useState(1);

  const renderSizeList = useMemo(() => {
    let listSizeProduct = productDetail.data.sizeId;

    let listSizeName = [];
    sizeList?.data?.map((item) =>
      listSizeProduct.map(
        (item2) => item2 === item.id && listSizeName.push(item.size)
      )
    );
    return listSizeName.map((item, index) => {
      return (
        <button
          key={index}
          onClick={() => {
            setIsSizeToCart(item);
            setBoxSizeWarning(false);
            console.log(
              "🚀 ~ file: index.jsx:91 ~ returnListSizeName.map ~ isSizeToCart:",
              isSizeToCart
            );
          }}
          className={`w-[56px] h-[40px] bg-[#dfe4e8] gap-2 
            
          ${isSizeToCart === item ? "bg-[red]" : "bg-[green]"}
          `}
        >
          {item}
        </button>
      );
    });
  }, [sizeList.data, isSizeToCart]);
  console.log("isSizeToCart", isSizeToCart);
  console.log("🚀 ~ file: addToCard.jsx:64 ~ useEffect ~ quality:", quality);
  const renderQuality = () => {
    return (
      <div className="flex justify-center gap-0">
        <button
          className={`w-[56px] h-[48px] ${
            quality === 1 ? "bg-[#d2d0d0] " : "bg-[#ffffff]"
          }  
            order-solid border-[1px] border-[#e9ecef] rounded-l-xl text-[24px]`}
          onClick={() => {
            quality !== 1 && setQuality(quality - 1);
            console.log("quality", quality);
          }}
        >
          -
        </button>
        <div className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] flex justify-center items-center">
          {quality}
        </div>
        <button
          className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] rounded-r-xl text-[24px]"
          onClick={() => {
            setQuality(quality + 1);
            console.log("quality", quality);
          }}
        >
          +
        </button>
      </div>
    );
  };
  return (
    <div className="w-[400px]">
      <div>{productDetail.data.title}</div>
      <Rate allowHalf defaultValue={2.5} />
      <div>{productDetail.data.price?.toLocaleString()}</div>
      <div
        className={`ml-[-4px] p-[4px] ${
          boxSizeWarning && " border-dashed border-2 border-[red]"
        }`}
      >
        <div className="my-3">Kích thước:</div>
        <div
          className={`w-full flex flex-wrap gap-3 border-red-600 ${
            boxSizeWarning && "border-red-600"
          }`}
        >
          {renderSizeList}
        </div>
      </div>

      <div className="my-3">Số lượng:</div>
      <div className="w-full flex justify-between">
        <>{renderQuality()}</>
        <button
          className="w-[220px] h-[48px] bg-[#ffc107] text-[#fff] hover:bg-[#FEECC7] hover:text-[#fcaf17] rounded-md"
          onClick={() => {
            isSizeToCart === ""
              ? setBoxSizeWarning(true)
              : dispatch(
                  addCartListAction([
                    {
                      id: parseInt(id),
                      image: productDetail.data.image,
                      title: productDetail.data.title,
                      size: isSizeToCart,
                      quality: quality,
                    },
                  ])
                );
          }}
        >
          {isSizeToCart === "" ? "Chọn kích thước" : "Thêm vào giỏ hàng"}
        </button>
      </div>

      <div className="flex justify-between p-[20px]">
        <div>
          <div className="w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_freeship.svg?1682503247858"
              alt=""
            />
            <p className="text-[12px] flex justify-end items-center text-center">
              Miễn phí vận chuyển với mọi đơn hàng từ 498k
            </p>
          </div>
          <div className="w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/empty-wallet-tick.svg?1682503247858"
              alt=""
            />
            <p className="text-[12px] flex justify-end items-center text-center">
              Đa dạng phương thức thanh toán (VNPay, Momo, COD)
            </p>
          </div>
        </div>
        <div>
          <div className="w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_freechange.svg?1682503247858"
              alt=""
            />
            <p className="text-[12px] flex justify-end items-center text-center">
              Miễn phí đổi trả tại 230+ cửa hàng trong 15 ngày
            </p>
          </div>
          <div className="w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_fastship.svg?1682503247858"
              alt=""
            />
            <p className="text-[12px] flex justify-end items-center text-center">
              Vận chuyển siêu tốc từ 1 đến 3 ngày
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCard;
