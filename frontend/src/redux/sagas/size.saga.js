import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, SIZE_ACTION } from "../constants";

function* getSizeListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/sizes");

    yield put({
      type: SUCCESS(SIZE_ACTION.GET_SIZE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(SIZE_ACTION.GET_SIZE_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* sizeSaga() {
  yield takeEvery(REQUEST(SIZE_ACTION.GET_SIZE_LIST), getSizeListSaga);
}
