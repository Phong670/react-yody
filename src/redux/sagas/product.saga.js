import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga(action) {
  console.log(
    "🚀 ~ file: product.saga.js:5 ~ function*getProductListSaga ~ action:",
    action
  );
  try {
    const { page, limit, more, categoryId } = action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _page: page,
        _limit: limit,
        categoryId: categoryId,
      },
    });
    console.log(
      "🚀 ~ file: product.saga.js:14 ~ function*getProductListSaga ~ result:",
      result
    );
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
}
