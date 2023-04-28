import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
function* getCategoryListSaga(action) {
  try {
    const { subCategoryId } = action.payload;

    const result = yield axios.get("http://localhost:4000/categories", {
      params: {
        subCategoryId: subCategoryId,
      },
    });

    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
}
