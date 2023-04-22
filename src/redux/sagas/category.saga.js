import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/categories");
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery("GET_CATEGORY_LIST_REQUEST", getCategoryListSaga);
}
