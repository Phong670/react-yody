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
import { Rate, Form, Input, Modal } from "antd";
import { ROUTES } from "../../../constants/routes";
import moment from "moment";
import { BsPersonCircle } from "react-icons/bs";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
  getSizeListAction,
  getReviewAction,
  sendReviewAction,
} from "../../../redux/actions";

import * as S from "./styles";

function ProductDetail() {
  const navigate = useNavigate();
  const [reviewForm] = Form.useForm();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { productList, productDetail } = useSelector((state) => state.product);
  const { sizeList } = useSelector((state) => state.size);
  const { listReview } = useSelector((state) => state.review);
  console.log(
    "🚀 ~ file: index.jsx:30 ~ ProductDetail ~ listReview:",
    listReview
  );
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    dispatch(
      getReviewAction({
        productId: parseInt(id),
        page: page,
        sendReview: false,
      })
    );
  }, []);
  let isReview = "";
  const checkReview = () => {
    isReview = listReview.data.findIndex(
      (item) => item.userId === userInfo.data.id
    );
    console.log("🚀 ~ file: index.jsx:61 ~ checkReview ~ isReview:", isReview);
  };
  checkReview();
  let login = "";
  const checkLogin = () => {};
  const renderSizeList = useMemo(() => {
    return sizeList.data.map((item) => {
      return (
        <button key={item.id} className="w-[56px] h-[40px] bg-[#dfe4e8] gap-2">
          {item.size}
        </button>
      );
    });
  }, [sizeList.data]);
  const { TextArea } = Input;
  const renderListCart = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <S.ItemList key={item.id}>
          <S.CustomLink
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          >
            <S.Image src={item.image} alt="" />
            <S.Infor>
              <h3 className="w-full h-[38px]">{item.title}</h3>
              <span className="">{item.price.toLocaleString()}đ</span>
            </S.Infor>
          </S.CustomLink>
        </S.ItemList>
      );
    });
  }, [productList.data]);

  const handleReview = (values) => {
    console.log(" handle view");
    setPage(1);
    dispatch(
      sendReviewAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => reviewForm.resetFields(),
        callback2: () => {
          dispatch(
            getReviewAction({
              productId: parseInt(id),
              page: 1,
              sendReview: true,
            })
          );
        },
      })
    );
  };
  const renderListReview = () => {
    return listReview.data.map((item) => {
      return (
        <div key={item.id} className="w-full mt-4 flex">
          <div className="w-[40px] h-[40px] flex item-center">
            <BsPersonCircle className="text-[40px]" />
          </div>
          <div className="ml-3">
            <h5 className="text-[20px]">{item.user.fullName}</h5>

            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
            <p className="text-[rgba(0,0,0,.54)] ">
              {moment(item.createdAt).fromNow()}
            </p>
            <p>{item.comment}</p>
          </div>
        </div>
      );
    });
    // console.log(" listReview?.data", listReview?.data);
    // return listReview?.data?.map((item) => {
    //   <h1>{item.id}</h1>;
    // });
  };
  console.log("aaaaaaaaaaaaaaaaaaa", userInfo.data.id);
  const desc = ["1/5", "2/5", "3/5", "4/5", "5/5"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-wrap flex-col justify-between w-[1200px]">
      <div>Tieeu ddeef</div>
      <div className="flex justify-between">
        <div className="w-[400px]">
          <Spin spinning={productDetail.load}>
            <div>
              <img src={productDetail.data.image} alt="" />
            </div>
          </Spin>
        </div>
        <div className="w-[400px]">
          <div>{productDetail.data.title}</div>
          <Rate allowHalf defaultValue={2.5} />
          <div>{productDetail.data.price?.toLocaleString()}</div>
          <div className="my-3">Kích thước:</div>
          <div className="w-full flex flex-wrap gap-3">{renderSizeList}</div>
          <div className="my-3">Số lượng:</div>
          <div className="w-full flex justify-between">
            <div className="flex justify-center">
              <button className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-2 border-[#e9ecef] rounded-l-sm text-[24px]">
                -
              </button>
              <div className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-2 border-[#e9ecef] flex justify-center items-center">
                2
              </div>
              <button className="w-[56px] h-[48px] bg-[#ffffff] order-solid border-2 border-[#e9ecef] rounded-r-sm text-[24px]">
                +
              </button>
            </div>
            <button className="w-[220px] h-[48px] bg-[#ffc107] text-[#fff] hover:bg-[#FEECC7] hover:text-[#fcaf17] rounded-md">
              Thêm vào giỏ hàng
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
      </div>
      <div className="mt-[20px]">ĐẶC TÍNH NỔI BẬT</div>
      <div className="mb-[200px]">{productDetail.data.description} </div>
      <div className="mt-5 pt-3 border-t-[3px]">
        ĐÁNH GIÁ SẢN PHẨM
        {/* <div className="w-full flex flex-wrap justify-end">
          <Form className="w-full" onFinish={handleReview}>
            <Form.Item name="rate" label="Rate">
              <Rate
                className="text-[28px]"
                tooltips={desc}
                onChange={setValue}
                value={value}
              />
              {value ? (
                <span className="ml-5 text-[24px]">{desc[value - 1]}</span>
              ) : (
                ""
              )}
            </Form.Item>
            <Form.Item>
              <TextArea
                className="text-[16px]"
                rows={4}
                placeholder="Nhập nội dung đánh giá của bạn về sản phẩm này"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="w-[120px] h-[48px] bg-[#ffc107] text-[#fff] hover:bg-[#FEECC7] hover:text-[#fcaf17] rounded-md mt-[10px]"
              >
                Gửi đánh giá
              </button>
            </Form.Item>
          </Form>
        </div> */}
        <div>
          {isReview === -1 ? (
            <>
              <Card title="Review" size="small">
                <Form
                  form={reviewForm}
                  name="reviewForm"
                  layout="vertical"
                  onFinish={(values) =>
                    userInfo.data.id ? handleReview(values) : showModal()
                  }
                  autoComplete="off"
                >
                  <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={() => navigate(ROUTES.USER.LOGIN)}
                    onCancel={handleCancel}
                  >
                    <p>Bạn chưa đăng nhập</p>
                  </Modal>

                  <Form.Item
                    label="Rate"
                    name="rate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your rate!",
                      },
                    ]}
                  >
                    <Rate />
                  </Form.Item>
                  <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[
                      {
                        required: true,
                        message: "Please input your comment!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      autoSize={{
                        minRows: 2,
                        maxRows: 4,
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="w-[120px] h-[48px] bg-[#ffc107] text-[#fff] hover:bg-[#FEECC7] hover:text-[#fcaf17] rounded-md mt-[10px]"
                  >
                    Submit
                  </Button>
                </Form>
              </Card>
            </>
          ) : (
            <div>Bạn đã đánh giá sản phẩm này</div>
          )}
        </div>
        <div className="mt-5 border-t-[3px]">
          {renderListReview()}
          {listReview.data.length < listReview.total ? (
            <Button
              onClick={() => {
                setPage(page + 1);
                dispatch(
                  getReviewAction({
                    productId: parseInt(id),
                    page: page + 1,
                    sendReview: false,
                  })
                );
                console.log("pageaaaaaaaaa", page);
              }}
            >
              Hiển thị thêm bình luận
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <p className="mt-4">GỢI Ý CHO BẠN</p>
      <Row gutter={[16, 16]} className="w-full">
        {renderListCart}
      </Row>
    </div>
  );
}

export default ProductDetail;
