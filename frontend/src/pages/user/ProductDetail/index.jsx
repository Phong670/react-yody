import { useEffect, useMemo, useState } from "react";
import { Link, useParams, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  getProductDetailAction,
  getSizeListAction,
} from "../../../redux/actions";

import { ROUTES } from "../../../constants/routes";
import AddToCard from "./addToCard";
import ReviewProduct from "./review";
import * as S from "./styles";

import { Input, Collapse } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);

  const { listReview } = useSelector((state) => state.review);
  const [dataAllReview, setDataAllReview] = useState([]);
  const [productListRecommend, setProductListRecommend] = useState([]);

  const { Panel } = Collapse;

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));

    dispatch(getSizeListAction());
  }, [id]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/reviews/", {
        params: { productId: id },
      })
      .then((res) => {
        setDataAllReview(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, [id, listReview]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products/?_page=1&_limit=10", {
        params: { subCategoryId: productDetail.data.subCategoryId },
      })
      .then((res) => {
        setProductListRecommend(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, [productDetail.data]);

  const renderCartList = useMemo(() => {
    return productListRecommend.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.WrapImg className="overflow-hidden">
              <S.Image src={item.image} alt="" />
            </S.WrapImg>
            <S.Info className="flex items-end">
              <S.Title>{item.title}</S.Title>
              <S.Price>{item.price.toLocaleString()}đ</S.Price>
            </S.Info>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  }, [productListRecommend]);

  const renderTitle = useMemo(() => {
    return (
      <div className="lg:flex gap-2  xxs:hidden text-[16px]  ">
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

  return (
    <div className="flex flex-wrap flex-col items-center justify-center xl:w-[1200px] lg:mt-[50px] xxs:mt-[-16px] relative p-3">
      <div className="w-full">{renderTitle}</div>
      <div className="flex my-4 h-auto   xxs:justify-center lg:justify-between xxs:flex-wrap  ">
        <div className="xl:w-[750px]  xxs:w-full mb-3">
          <div className="flex justify-center flex-wrap w-full h-auto border-b-[1px] border-solid border-[#F2F2F2] pb-[24px]">
            <div className="flex justify-center w-full">
              {!productDetail.load ? (
                <img src={productDetail.data.image} alt="" />
              ) : (
                <Skeleton height={480} width={360} />
              )}
            </div>
            <div className="xl:hidden xxs:block w-full mt-4 ">
              <AddToCard
                productDetail={productDetail}
                dataAllReview={dataAllReview}
              />
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
                <div
                  className="characteristic px-2 font-[Sans-serif] !font-[500] flex flex-wrap gap-[8px]"
                  dangerouslySetInnerHTML={{
                    __html: productDetail.data.characteristic,
                  }}
                ></div>
              </Panel>
            </Collapse>
          </div>

          <div className="mt-[20px]">
            <Collapse
              expandIconPosition="end"
              className="border-none rounded-none boxDescribeDetail"
            >
              <Panel
                header="CHI TIẾT SẢN PHẨM"
                key="2"
                className="bg-[white] border-none rounded-none "
              >
                <div
                  className="description px-2 font-[Sans-serif] !font-[500] flex flex-col justify-center"
                  dangerouslySetInnerHTML={{
                    __html: productDetail.data.description,
                  }}
                ></div>
              </Panel>
            </Collapse>
          </div>

          <div className="w-full">
            <ReviewProduct
              idProduct={id}
              title={productDetail.data.title}
              dataAllReview={dataAllReview}
            />
          </div>
        </div>

        <S.AddToCardDiv className="h-[90vh] xl:block xxs:hidden   ">
          <AddToCard
            productDetail={productDetail}
            dataAllReview={dataAllReview}
          />
        </S.AddToCardDiv>
      </div>

      <p className="mt-4 w-full">GỢI Ý CHO BẠN</p>
      <div className=" grid sm:w-full  justify-items-center xs:gap-[20px] xxs:gap-[10px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4  sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-2 xxs:mt-[16px] lg:mt-2">
        {renderCartList}
      </div>
    </div>
  );
}

export default ProductDetail;
