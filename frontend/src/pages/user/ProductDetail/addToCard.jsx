import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addCartListAction } from "../../../redux/actions/";

import axios from "axios";
import { Rate, Space } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AddToCard({ productDetail, dataAllReview }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isSizeToCart, setIsSizeToCart] = useState("");
  const [boxSizeWarning, setBoxSizeWarning] = useState(false);
  const [sizeList, setSizeList] = useState([]);
  const [quantity, setQuantity] = useState(1);

  //Khoi tao
  const totalRate = useMemo(
    () =>
      dataAllReview.length
        ? dataAllReview
            .map((item) => item.rate)
            .reduce((total, item) => total + item)
        : 0,
    [dataAllReview]
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/sizes")
      .then((res) => {
        setSizeList(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, []);

  //function
  const renderSizeList = useMemo(() => {
    let listSizeProduct = productDetail.data.sizeId;
    let listSizeName = [];
    sizeList?.map((item) =>
      listSizeProduct?.map(
        (item2) => item2 === item.id && listSizeName?.push(item.size)
      )
    );
    return listSizeName?.map((item, index) => {
      return (
        <button
          key={index}
          onClick={() => {
            setIsSizeToCart(item);
            setBoxSizeWarning(false);
          }}
          className={`w-[56px] rounded-[4px] h-[40px] bg-[#dfe4e8] gap-2 
            
          ${
            isSizeToCart === item
              ? "bg-[orange]"
              : "bg-[#dfe4e8] text-[#000] hover:bg-[#FEECC7] hover:text-[orange]"
          }
          `}
        >
          {item}
        </button>
      );
    });
  }, [sizeList, isSizeToCart, productDetail.data]);

  const renderQuantity = () => {
    return (
      <div className="xxs:w-[40%] flex justify-center gap-0">
        <button
          className={`w-[56px] h-[48px] bg-[#ffffff] ${
            quantity === 1 ? "text-[#DEDDDD] " : "text-[#62676D]"
          }  
            order-solid border-[1px] border-[#e9ecef] rounded-l-[4px] text-[24px]`}
          onClick={() => {
            quantity !== 1 && setQuantity(quantity - 1);
          }}
        >
          -
        </button>
        <div className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] flex justify-center items-center">
          {quantity}
        </div>
        <button
          className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-[1px] border-[#e9ecef] rounded-r-[4px] text-[24px]"
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div className="xxs:w-full lg:w-[400px]  ">
      <div className=" text-[20px] font-bold">
        {" "}
        {!productDetail.load ? (
          productDetail.data.title
        ) : (
          <Skeleton height={60} width={360} />
        )}
      </div>
      <Space>
        <Rate value={totalRate / dataAllReview.length} disabled />
        <span>
          {dataAllReview.length > 0
            ? `${(totalRate / dataAllReview.length).toFixed(1)}/5 (${
                dataAllReview.length
              } đánh giá)`
            : "chưa có đánh giá"}
        </span>
      </Space>
      <div className="mt-4 text-[24px] text-[red] font-bold">
        {productDetail.data.price?.toLocaleString()}đ
      </div>
      <div
        className={`ml-[-4px] p-[4px]   ${
          boxSizeWarning && " border-dashed border-2 border-[red]"
        }`}
      >
        <div className="my-3">Kích thước:</div>
        <div
          className={`w-full flex flex-wrap gap-3 border-red-600  ${
            boxSizeWarning && "border-red-600"
          }`}
        >
          {renderSizeList}
        </div>
      </div>

      <div className="my-3">Số lượng:</div>
      <div className="w-full flex flex-wrap justify-center">
        <div className=" xxs:w-[100%] flex lg:justify-between xxs:flex-nowrap xxs:justify-center  sm:justify-between sm:w-[500px] gap-2">
          <>{renderQuantity()}</>
          <button
            className="max-w-[250px]   lg:w-[200px] sm:w-[50%] px-4 h-[48px] bg-[#ffc107] text-[#fff] hover:bg-[#FEECC7] hover:text-[#fcaf17] rounded-md"
            onClick={() => {
              isSizeToCart === ""
                ? setBoxSizeWarning(true)
                : dispatch(
                    addCartListAction({
                      id: parseInt(id),
                      image: productDetail.data.image,
                      title: productDetail.data.title,
                      size: isSizeToCart,
                      quantity: quantity,
                      price: productDetail.data.price,
                    })
                  );
            }}
          >
            {isSizeToCart === "" ? "Chọn kích thước" : "Thêm vào giỏ hàng"}
          </button>
        </div>
        <div className="flex sm:gap-32 sm:w-[500px] lg:w-full xxs:gap-4  xxs:justify-center p-[20px]">
          <div className="md:w-[180px] flex justify-center flex-wrap">
            <div className="max-w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_freeship.svg?1682503247858"
                alt=""
              />
              <p className="text-[12px] flex justify-end items-center text-center flex-wrap">
                Miễn phí vận chuyển với mọi đơn hàng từ 498k
              </p>
            </div>
            <div className="max-w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/empty-wallet-tick.svg?1682503247858"
                alt=""
              />
              <p
                className="text-[12px] flex justify-end items-center text-center"
                flex-wrap
              >
                Đa dạng phương thức thanh toán (VNPay, Momo, COD)
              </p>
            </div>
          </div>
          <div className="md:w-[180px]  flex justify-center flex-wrap">
            <div className="max-w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_freechange.svg?1682503247858"
                alt=""
              />
              <p className="text-[12px] flex justify-end items-center text-center flex-wrap">
                Miễn phí đổi trả tại 230+ cửa hàng trong 15 ngày
              </p>
            </div>
            <div className="max-w-[140px] flex flex-wrap justify-center items-center pb-[10px]">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/ic_payment_fastship.svg?1682503247858"
                alt=""
              />
              <p className="text-[12px] flex justify-end items-center text-center flex-wrap">
                Vận chuyển siêu tốc từ 1 đến 3 ngày
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCard;
