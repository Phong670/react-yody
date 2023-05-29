import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

import { useDispatch, useSelector } from "react-redux";
import { getReviewAction, sendReviewAction } from "../../../redux/actions";

import { REVIEW_LIMIT } from "../../../constants/paging";
import { ROUTES } from "../../../constants/routes";

import { BsPersonCircle } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import { Rate, Form, Input, Modal, Select, Button, message, Spin } from "antd";

function ReviewProduct({ idProduct, title, dataAllReview }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { listReview } = useSelector((state) => state.review);

  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [filterComment, setFilterComment] = useState([1, 2, 3, 4, 5]);
  //ant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAlert, setIsModalOpenAlert] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#ffc107" }} spin />
  );
  const [reviewForm] = Form.useForm();

  //valueClone
  let filterCommentClone = filterComment;
  let isReview = "";

  //KhoiTao
  useEffect(() => {
    dispatch(
      getReviewAction({
        productId: parseInt(idProduct),
        page: page,
        sendReview: false,
        more: more,
        rate: filterComment,
      })
    );
  }, [idProduct]);
  const totalRate = useMemo(
    () =>
      dataAllReview.length
        ? dataAllReview
            .map((item) => item.rate)
            .reduce((total, item) => total + item)
        : 0,
    [dataAllReview]
  );
  const checkReview = () => {
    isReview = dataAllReview.findIndex(
      (item) => item.userId === userInfo.data.id
    );
  };

  checkReview();

  //function
  const handleChangeFilter = (value) => {
    filterCommentClone = value === 0 ? [1, 2, 3, 4, 5] : value;
    setFilterComment(value === 0 ? [1, 2, 3, 4, 5] : value);

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

  const handleReview = (values) => {
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
      return (
        <div key={item.id} className="w-full mt-4 flex">
          <div className="max-w-[40px] h-[40px] flex item-center">
            <BsPersonCircle className="text-[30px]" />
          </div>
          <div className="ml-3">
            <div className="flex gap-2 items-center">
              <h5 className="text-[16px] text-[#030d78]">
                {item.user?.fullName}
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
            <p className="text-[14px]">{item.comment}</p>
          </div>
        </div>
      );
    });
  }, [listReview.data]);
  //antFunction
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalAlert = () => {
    setIsModalOpenAlert(true);
  };
  const cancelModalAlert = () => {
    setIsModalOpenAlert(false);
  };
  const reviewedAlert = () => {
    messageApi.open({
      type: "reviewedAlert",
      content: "Bạn đã đánh giá sản phẩm này",
    });
  };
  return (
    <div className="flex flex-wrap flex-col justify-between w-full border-[#c4cdd5] border-b-[0.8px] pb-[8px]">
      {contextHolder}
      <h6 className="my-4"> ĐÁNH GIÁ</h6>
      {dataAllReview.length === 0 ? (
        <div className=" flex gap-4  justify-center flex-wrap bg-[#F2F2F2] p-3 mb-[10px]">
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
                    {`${(totalRate / dataAllReview.length).toFixed(1)}/5 `}
                  </div>
                  <Rate
                    className="text-[30px]"
                    value={totalRate / dataAllReview.length}
                    disabled
                  />
                  <div className="w-full flex justify-center">
                    ({dataAllReview.length} đánh giá)
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
            {!more && listReview.load ? (
              <Spin
                indicator={antIcon}
                className="w-full flex justify-center"
              />
            ) : listReview.data.length === 0 ? (
              <div className="w-full flex justify-center">
                Không có đánh giá nào phù hợp!
              </div>
            ) : (
              <div className="xl:px-4 xxs:px-2">{renderListReview}</div>
            )}

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
            ) : listReview.data.length < REVIEW_LIMIT + 1 ? (
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
        title="Bạn cần phải đăng nhập để đánh giá"
        open={isModalOpenAlert}
        footer={null}
        closable={true}
        onCancel={cancelModalAlert}
      >
        <div className="w-full flex justify-center mt-3">
          <Button
            className="border-none hover:border-none hover:bg-[#fcb01798]"
            style={{
              background: "#fcaf17",
              color: "white",
            }}
            onClick={() => navigate(ROUTES.USER.LOGIN)}
          >
            Đăng nhập
          </Button>
        </div>
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
            className="w-[120px] h-[48px] bg-[#ffc311] text-[white] hover:!bg-[#ffc107] hover:text-[white] rounded-md mt-[10px]"
          >
            Gửi đánh giá
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ReviewProduct;
