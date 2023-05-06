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
import { Card, Button } from "antd";
import { Rate, Form, Input, Modal } from "antd";
import { ROUTES } from "../../../constants/routes";
import moment from "moment";
import { BsPersonCircle } from "react-icons/bs";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getReviewAction, sendReviewAction } from "../../../redux/actions";

import * as S from "./styles";

function ReviewProduct({ idProduct }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [reviewForm] = Form.useForm();
  // const { id } = useParams();

  const dispatch = useDispatch();

  const { listReview } = useSelector((state) => state.review);

  const [page, setPage] = useState(1);
  const callSageReview = getReviewAction({
    productId: parseInt(idProduct),
    page: page,
    sendReview: false,
  });
  useEffect(() => {
    console.log("lay data lan thu ");
    dispatch(callSageReview);
  }, [idProduct]);
  let isReview = "";
  const checkReview = () => {
    isReview = listReview.data.findIndex(
      (item) => item.userId === userInfo.data.id
    );
  };
  console.log(
    "🚀 ~ file: index.jsx:30 ~ ProductDetail ~ listReview:",
    listReview
  );
  checkReview();

  const handleReview = (values) => {
    console.log(" handle view");
    setPage(1);
    dispatch(
      sendReviewAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(idProduct),
        },
        callback: () => reviewForm.resetFields(),
        callback2: () => {
          dispatch(
            getReviewAction({
              productId: parseInt(idProduct),
              page: 1,
              sendReview: true,
            })
          );
        },
      })
    );
  };
  const renderListReview = useMemo(() => {
    return listReview.data.map((item) => {
      return (
        <div key={item.id} className="w-full mt-4 flex">
          <div className="max-w-[40px] h-[40px] flex item-center">
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
  }, [listReview.data]);

  const desc = ["1/5", "2/5", "3/5", "4/5", "5/5"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap flex-col justify-between w-full">
      <div className="mt-5 pt-3 border-t-[3px]">
        ĐÁNH GIÁ SẢN PHẨM
        <div>
          {isReview !== -1 ? (
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
          {renderListReview}
          {listReview.data.length < listReview.total ? (
            <Button
              onClick={() => {
                setPage(page + 1);
                dispatch(
                  getReviewAction({
                    productId: parseInt(idProduct),
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
    </div>
  );
}

export default ReviewProduct;
