import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Space, message } from "antd";
import { Rate, Form, Input, Modal, Select } from "antd";
import { ROUTES } from "../../../constants/routes";
import moment from "moment";
import "moment/locale/vi";
import { BsPersonCircle } from "react-icons/bs";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getReviewAction, sendReviewAction } from "../../../redux/actions";
import { FiFilter } from "react-icons/fi";

import * as S from "./styles";

function ReviewProduct({ idProduct, title, dataTotalReview }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [reviewForm] = Form.useForm();
  // const { id } = useParams();

  const dispatch = useDispatch();

  const { listReview } = useSelector((state) => state.review);

  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [filterComment, setFilterComment] = useState([1, 2, 3, 4, 5]);
  let filterCommentClone = filterComment;

  //ant
  const handleChangeFilter = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    filterCommentClone = value === 0 ? [1, 2, 3, 4, 5] : value;
    setFilterComment(value === 0 ? [1, 2, 3, 4, 5] : value);
    console.log("v", filterComment);
    setMore(false);
    setPage(1);
    dispatch(
      getReviewAction({
        productId: parseInt(idProduct),
        page: 1,
        sendReview: false,
        more: false,
        rate: filterCommentClone,
      })
    );
  };

  const callSageReview = getReviewAction({
    productId: parseInt(idProduct),
    page: page,
    sendReview: false,
    more: more,
    rate: filterComment,
  });
  useEffect(() => {
    console.log("lay data lan thu ");
    dispatch(callSageReview);
  }, [idProduct]);
  const totalRate = useMemo(
    () =>
      dataTotalReview.length
        ? dataTotalReview
            .map((item) => item.rate)
            .reduce((total, item) => total + item)
        : 0,
    [dataTotalReview]
  );

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
              rate: filterComment,
            })
          );
        },
      })
    );
  };
  const renderListReview = useMemo(() => {
    return listReview.data.map((item) => {
      console.log("aaaaaaaaaaaaaaaaa", item.createdAt);
      return (
        <div key={item.id} className="w-full mt-4 flex">
          <div className="max-w-[40px] h-[40px] flex item-center">
            <BsPersonCircle className="text-[30px]" />
          </div>
          <div className="ml-3">
            <div className="flex gap-2 items-center">
              <h5 className="text-[16px] text-[#030d78]">
                {item.user.fullName}
              </h5>
              <p className="text-[rgba(0,0,0,.54)] mb-[-2px] text-[12px]">
                {`${
                  moment() - moment(item.createdAt) > 604800000
                    ? moment(item.createdAt).format("L")
                    : moment(item.createdAt).fromNow()
                }
               ${
                 moment() - moment(item.createdAt) > 604800000
                   ? moment(item.createdAt).format("LT")
                   : ""
               }
              `}
              </p>
            </div>

            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
            <p className="text-[12px]">{item.comment}</p>
          </div>
        </div>
      );
    });
  }, [listReview.data]);

  const desc = ["1/5", "2/5", "3/5", "4/5", "5/5"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAlert, setIsModalOpenAlert] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalAlert = () => {
    setIsModalOpenAlert(true);
  };

  const handleCancelAlert = () => {
    setIsModalOpenAlert(false);
  };

  const reviewedAlert = () => {
    messageApi.open({
      type: "reviewedAlert",
      content: "Bạn đã đánh giá sản phẩm này",
    });
  };
  return (
    <div className="flex flex-wrap flex-col justify-between w-full">
      {contextHolder}
      <h6 className="my-4"> ĐÁNH GIÁ</h6>
      {listReview.data.length === 0 ? (
        <div className=" flex gap-4  justify-center flex-wrap bg-[#F2F2F2] p-3">
          <p className="w-full flex justify-center text-center text-[14px]">
            Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu
            tiên đánh giá cho sản phẩm này
          </p>
          <button
            className=" py-2 px-3 rounded-[2px] text-[14px] bg-[#030d78] text-[white]   "
            onClick={() => {
              userInfo.data.id
                ? isReview !== -1
                  ? reviewedAlert()
                  : showModal()
                : showModalAlert();
            }}
          >
            Đánh giá sản phẩm này
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <div className=" border-b-[1px] border-solid border-[#c4cdd5]">
            <div className="flex flex-wrap bg-[#F2F2F2] px-4 py-4 gap-4 justify-center">
              <div className=" md:w-[200px] xxs:w-full flex justify-center flex-wrap flex-col gap-2">
                <div className=" flex justify-center flex-wrap w-full gap-2">
                  <div className="w-full flex justify-center text-[30px]">
                    {`${(totalRate / dataTotalReview.length).toFixed(1)}/5 `}
                  </div>
                  <Rate
                    className="text-[30px]"
                    value={totalRate / dataTotalReview.length}
                    disabled
                  />
                  <div className="w-full flex justify-center">
                    ({dataTotalReview.length} đánh giá)
                  </div>
                </div>
                <div className="flex xxs:flex-wrap sm:flex-nowrap gap-2 ">
                  <button
                    className="md:w-full xxs:w-[100%] sm:w-[50%] p-2 bg-[#030d78] text-[white]   "
                    onClick={() => {
                      userInfo.data.id
                        ? isReview !== -1
                          ? reviewedAlert()
                          : showModal()
                        : showModalAlert();
                    }}
                  >
                    Đánh giá sản phẩm này
                  </button>
                  <div className="xxs:block md:hidden md:w-full xxs:w-[100%] sm:w-[50%] xxs:h-[40px] sm:h-auto ">
                    {/* <div>Bộ lọc</div> */}
                    <Select
                      className="filterCommentXxs "
                      labelInValue
                      defaultValue={{
                        value: 0,
                        label: (
                          <>
                            {" "}
                            <FiFilter className="justify-center xxs:h-[40px]  text-[30px] items-center sm:h-[100%] " />
                            Bộ lọc
                          </>
                        ),
                      }}
                      style={{
                        width: "100%",
                      }}
                      onChange={(value) => handleChangeFilter(value.value)}
                      options={[
                        {
                          value: 0,
                          label: "Tất cả",
                        },
                        {
                          value: 5,
                          label: "5 sao",
                        },
                        {
                          value: 4,
                          label: "4 sao",
                        },
                        {
                          value: 3,
                          label: "3 sao",
                        },
                        {
                          value: 2,
                          label: "2 sao",
                        },
                        {
                          value: 1,
                          label: "1 sao",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex xxs:hidden w-auto flex-wrap ">
                <div className="w-full flex justify-start items-center gap-2">
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment.length === 5
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(0);
                    }}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment === 5
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(5);
                    }}
                  >
                    5 sao
                  </button>
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment === 4
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(4);
                    }}
                  >
                    4 sao
                  </button>
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment === 3
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(3);
                    }}
                  >
                    3 sao
                  </button>
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment === 2
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(2);
                    }}
                  >
                    2 sao
                  </button>
                  <button
                    className={`p-2 rounded-sm bg-[white] border-[1px] border-solid  ${
                      filterComment === 1
                        ? "border-[#030d78]"
                        : " border-[#c4cdd5]"
                    }`}
                    onClick={() => {
                      handleChangeFilter(1);
                    }}
                  >
                    1 sao
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="px-4">{renderListReview}</div>
            {listReview.data.length < listReview.total ? (
              <button
                className="w-full p-2 border-b-[1px] border-solid border-[#c4cdd5] text-[14px] text-[#030d78] hover:text-[orange]"
                onClick={() => {
                  setMore(true);
                  setPage(page + 1);
                  dispatch(
                    getReviewAction({
                      productId: parseInt(idProduct),
                      page: page + 1,
                      sendReview: false,
                      more: true,
                      rate: filterCommentClone,
                    })
                  );
                }}
              >
                Xem thêm đánh giá
              </button>
            ) : listReview.data.length === 4 ? (
              <></>
            ) : (
              <>
                <button
                  className="w-full p-2 border-b-[1px] border-solid border-[#c4cdd5] text-[14px] text-[#030d78] hover:text-[orange]"
                  onClick={() => {
                    setMore(false);
                    setPage(1);
                    dispatch(
                      getReviewAction({
                        productId: parseInt(idProduct),
                        page: 1,
                        sendReview: false,
                        more: false,
                        rate: filterCommentClone,
                      })
                    );

                    console.log("pageaaaaaaaaa", page);
                  }}
                >
                  Thu gọn đánh giá
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Modal
        title=""
        open={isModalOpenAlert}
        onOk={() => navigate(ROUTES.USER.LOGIN)}
        onCancel={handleCancelAlert}
      >
        <p>Bạn cần phải đăng nhập để đánh giá</p>
      </Modal>
      <Modal
        // className="flex justify-center items-center"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={isModalOpen}
        onOk={() => navigate(ROUTES.USER.LOGIN)}
        onCancel={handleCancel}
      >
        <div className="w-full flex justify-center border-solid border-b-[1px] border-[#9f97a5444] p-2 mb-2">
          ĐÁNH GIÁ SẢN PHẨM
        </div>

        <div className="w-full flex justify-center font-bold mb-2 text-[18px]">
          {title}
        </div>
        <Form
          form={reviewForm}
          name="reviewForm"
          layout="vertical"
          onFinish={(values) => {
            handleReview(values);
            handleCancel();
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Chất lượng sản phẩm"
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
            label="Nội dung đánh giá"
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
      </Modal>
    </div>
  );
}

export default ReviewProduct;
