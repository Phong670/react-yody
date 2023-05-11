import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { PRODUCT_LIMIT } from "../../constants/paging";

function* getReviewListSaga(action) {
  try {
    const { productId, page, sendReview, more } = action.payload;
    console.log(
      "🚀 ~ file: review.saga.js:9 ~ function*getReviewListSaga ~ unMount:",
      more
    );

    const result = yield axios.get("http://localhost:4000/reviews/", {
      params: {
        //relationships
        _expand: "user",
        //filer
        _sort: "id",
        _order: "desc",
        //getProductId
        productId: productId,
        _page: page,
        _limit: PRODUCT_LIMIT,
      },
    });
    console.log(
      "🚀 ~ file: review.saga.js:27 ~ function*getReviewListSaga ~ result:",
      result.data
    );

    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        data: result.data,
        page: page,
        sendReview: sendReview,
        total: parseInt(result.headers["x-total-count"]),
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

function* sendReviewSaga(action) {
  try {
    const { data, callback, callback2 } = action.payload;
    console.log(
      "🚀 ~ file: review.saga.js:40 ~ function*sendProductReviewSaga ~ data:",
      data
    );

    const result = yield axios.post("http://localhost:4000/reviews/", data);
    console.log(
      "🚀 ~ file: review.saga.js:52 ~ function*sendReviewSaga ~ result:",
      result
    );
    yield callback();
    yield callback2();

    yield put({
      type: SUCCESS(REVIEW_ACTION.SEND_REVIEW),
      // payload: {
      //   data: result.data,
      // },
    });
    // yield put({
    //   type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
    //   payload: {
    //     productId: data.productId,
    //   },
    // });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.SEND_REVIEW),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST), getReviewListSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.SEND_REVIEW), sendReviewSaga);
}
