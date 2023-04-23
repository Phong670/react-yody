import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getSizeListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/sizes");

    yield put({
      type: "GET_SIZE_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_SIZE_LIST_FAIL",
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* sizeSaga() {
  yield takeEvery("GET_SIZE_LIST_REQUEST", getSizeListSaga);
}
