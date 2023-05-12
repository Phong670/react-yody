import { useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Link,
  useParams,
  generatePath,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Row, Col, Card, Button, Space, notification } from "antd";
import { Rate, Form, Input, Modal, Collapse } from "antd";
import { ROUTES } from "../../../constants/routes";
import axios from "axios";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
  getSizeListAction,
} from "../../../redux/actions";
import AddToCard from "./addToCard";
import ReviewProduct from "./review";
import * as S from "./styles";

function ProductDetail() {
  const [isSizeToCart, setIsSizeToCart] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector((state) => state.product);
  const { sendReview } = useSelector((state) => state.review);
  const { listReview } = useSelector((state) => state.review);

  const { oneAddCard } = useSelector((state) => state.cart);
  const [notiAddCartData, setNotiAddCartData] = useState({});
  const [isOpen, setIsOpen] = useState(null);
  const [dataTotalReview, setDataTotalReview] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx:36 ~ ProductDetail ~ dataTotalReview:",
    dataTotalReview
  );
  const { Panel } = Collapse;
  useEffect(() => {
    console.log("khoi tao lan 2");
    console.log("222222222222222222222222222222222222222222222222222", id);
    axios
      .get("http://localhost:4000/reviews/", {
        params: { productId: productDetail.data.id },
      })
      .then((res) => {
        setDataTotalReview(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
    console.log(
      "looooooooooooooooooooooooooooooooooooooooooooooooooooo",
      dataTotalReview
    );
  }, [id, listReview]);
  // useEffect(
  //   () => () => {
  //     console.log("unmount 1111111111111111111111111111111111");
  //     axios
  //       .get("http://localhost:4000/reviews/", {
  //         params: { id: productDetail.data.id },
  //       })
  //       .then((res) => {
  //         setDataTotalReview(res.data);
  //       })
  //       .catch((err) => {
  //         console.log("loi roi");
  //       });
  //   },
  //   []
  // );
  useEffect(() => {
    setNotiAddCartData(oneAddCard);
    setIsOpen(oneAddCard.id);
    setTimeout(() => setIsOpen(null), 3000);
  }, [oneAddCard]);
  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(
      getProductListAction({
        page: 1,
        limit: 12,
      })
    );
    dispatch(getSizeListAction());
  }, [id]);
  const { TextArea } = Input;
  const renderListCart = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Image src={item.image} alt="" />
            <S.Info>
              <h3 className="w-full h-[38px]">{item.title}</h3>
              <span className="">{item.price.toLocaleString()}đ</span>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  }, [productList.data]);

  const renderTitle = useMemo(() => {
    return (
      <div className="lg:flex gap-2  xxs:hidden text-[14px]  ">
        <Link
          className="hover:text-[orange] hover:cursor-pointer font-medium"
          to={ROUTES.USER.HOME}
        >
          Trang chủ
        </Link>
        <span>/</span>
        <p
          className="hover:text-[orange] hover:cursor-pointer font-medium"
          onClick={() =>
            navigate(
              generatePath(ROUTES.USER.PRODUCT_LIST, {
                subCategoryId: productDetail.data.subCategory.id,
              })
            )
          }
        >
          {productDetail.data.subCategory?.name}
        </p>
        <span>/</span>
        <p className="font-[700]">{productDetail.data.category?.name}</p>
      </div>
    );
  }, [productDetail.data]);
  const renderOneProductAddCart = useMemo(() => {
    return (
      <S.BoxAddCart
        className={`w-[300px] fixed  ${
          !isOpen ? "visible opacity-100" : "invisible opacity-0"
        }  rounded-md p-3 fixed top-[100px] right-[400px]  z-10  flex flex-col items-center justify-center flex-nowrap`}
      >
        <div className="w-full p-2 mt-[-10px] text-[18px]  flex justify-center border-b-[0.8px] border-[#d9d9d9] mb-2">
          Đã thêm vào giỏ hàng
        </div>

        <div>
          <div className="w-full grid grid-cols-3 gap-2 mb-4 text-[14px] ">
            <img
              className="w-[100px] col-span-1 rounded-[4px] mt-[4px]"
              src={notiAddCartData?.image}
              alt="anh "
            />
            <div className="w-[100%] col-span-2 flex flex-wrap col justify-between  align-content-between ml-[5px]">
              <div className="hover:text-[orange] w-full ">
                {notiAddCartData?.title}
              </div>
              <div className="flex justify-center text-[orange]">
                {notiAddCartData?.price?.toLocaleString()}đ
              </div>
              <div className="w-full">Size: {notiAddCartData?.size}</div>
              <div className="flex w-full ">
                <div className="flex w-full  gap-0"></div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={generatePath(ROUTES.USER.CART)}
          className="w-full flex justify-center rounded-md p-2 bg-[orange]"
        >
          Xem giỏ hàng
        </Link>
      </S.BoxAddCart>
    );
  }, [isOpen]);

  return (
    <div className="flex flex-wrap flex-col justify-center xl:w-[1200px] lg:mt-[50px] xxs:mt-[8px] relative">
      {/* {renderOneProductAddCart} */}
      <div>{renderTitle}</div>
      <div className="flex my-4 h-auto xl:   xxs:justify-center lg:justify-between xxs:flex-wrap  ">
        <div className="  xl:w-[750px]  xxs:w-full mb-3 overflow-auto ">
          <div
            spinning={productDetail.load}
            className="flex justify-center w-full h-auto border-b-[1px] border-solid border-[#F2F2F2] pb-3"
          >
            <div className="flex justify-center w-full">
              <img src={productDetail.data.image} alt="" />
            </div>
          </div>
          <div className="mt-[20px]">
            <Collapse
              expandIconPosition="end"
              className="border-none rounded-none boxDescribeDetail"
            >
              <Panel
                header="ĐẶC TÍNH NỔI BẬT"
                key="1"
                className="bg-[white] border-none rounded-none "
              >
                <div className="">{productDetail.data.description}</div>
              </Panel>
            </Collapse>
          </div>

          <div className="w-full">
            <ReviewProduct
              idProduct={id}
              title={productDetail.data.title}
              dataTotalReview={dataTotalReview}
            />
          </div>
        </div>

        <div className="sticky h-[90vh] top-[150px] right-0 ">
          <AddToCard
            productDetail={productDetail}
            dataTotalReview={dataTotalReview}
          />
        </div>
      </div>

      <p className="mt-4 w-full">GỢI Ý CHO BẠN</p>
      <Row gutter={[16, 16]} className="w-full">
        {renderListCart}
      </Row>
    </div>
  );
}

export default ProductDetail;
